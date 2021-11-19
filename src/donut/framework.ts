import { LooseObject } from '@antv/g-base';
import { Chart, View } from '@antv/g2';
import { Datum, MappingDatum } from '@antv/g2/lib/interface';
import { intervalShape } from '../column/framework';
import { fetchConfig, fetchTooltip, generateChart, handleLegendBehavior } from '../core/framework';
import { ChartConfig, ChartOptions, Legend, Legends, ChartType, Shape } from '../interfaces';
import { getShapeConfig } from '../utils/tools/configUtils';
import { donutText } from '../utils/frameworks/text';
import { formatNumber, formatPercent } from '../utils/formatNumber';
import { bindDonutCoordination } from '../utils/frameworks/coordinate';

export class Donut {
  chart: Chart | undefined = undefined;
  donutView: View | undefined = undefined;
  textView: View | undefined = undefined;
  options: ChartOptions | undefined = undefined;
  config: ChartConfig | undefined = undefined;
  totalCount = 0;

  addText = (chart: Chart | View, data: LooseObject[], config: ChartConfig) => {
    const donutCfg = getShapeConfig(config, ChartType.DONUT);
    const { title, subTitle } = donutCfg;
    donutText(title, subTitle ? subTitle : formatNumber(this.totalCount), chart, config);
  };

  updateText = (textView: View, data: LooseObject[], config: ChartConfig) => {
    textView.clear();
    this.addText(textView, data, config);
    textView?.render(true);
  };

  update = ({ chart, views = [] }: { chart: Chart; views?: View[] }, data: Datum[], config: ChartConfig) => {
    const [donutView, textView] = views;
    if (Array.isArray(data)) {
      donutView?.changeData(data);
    }
    donutView?.render(true);
    this.updateText(textView, data, config);
    chart.render(true);
    chart.forceFit();
  };

  render = (options: ChartOptions, config: ChartConfig) => {
    const { id, legends = {}, defaultStyles = {}, data } = options;
    if (!id) {
      return {};
    }

    const donutCfg = getShapeConfig(config, ChartType.DONUT);
    this.setTotal(data as LooseObject[], donutCfg);

    const chart = generateChart(options, config);
    const donutView = chart.createView();
    fetchConfig(donutView, options, config);
    bindDonutCoordination(donutView);

    const interval = intervalShape(donutView, options, config, {}, (label: string) => {
      const legend = legends[label] || ({} as Legend);
      return {
        stroke: '#fff',
        lineWidth: 2,
        fill: legend.color || defaultStyles.color,
      };
    });
    interval.adjust('stack');
    interval.shape('slice-shape');

    const labelStyles = {
      style: { fontSize: 12 },
      layout: { type: 'pie-outer' },
    };
    interval.label(
      donutCfg.position,
      () => {
        return {
          labelEmit: false,
          content: (dataItem: LooseObject, mappingData: MappingDatum, index: number) => {
            const formatter = donutCfg.label?.formatter;
            if (formatter) {
              // the undefined which get from formatter return, that means not display label
              return formatter(dataItem, this.totalCount, index);
            }
            return `${dataItem[donutCfg.color || 'name']}: ${formatPercent(dataItem['count'] / this.totalCount)}`;
          },
        };
      },
      labelStyles
    );

    const textView = chart.createView();
    bindDonutCoordination(textView);
    fetchConfig(textView, options, config);
    this.addText(textView, data as LooseObject[], config);
    textView.render();

    fetchTooltip(chart, config);
    chart.render();

    this.chart = chart;
    this.donutView = donutView;
    this.textView = textView;
    this.options = options;
    this.config = config;
    return { chart, views: [donutView, textView], update: this.update };
  };
  setTotal = (data: LooseObject[], donutCfg: Shape) => {
    this.totalCount = data.reduce((total: number, item: LooseObject) => {
      return total + item[donutCfg?.position];
    }, 0);
  };

  legend = <DonutConfig>(charts: (Chart | View)[], legends: Legends, config: DonutConfig) => {
    const donut = getShapeConfig(config, 'donut');
    if (donut.color) {
      const filteredData = this.options?.data?.filter((item: LooseObject) => {
        return legends[item[donut.color]].active;
      });
      this.setTotal(filteredData, donut);
      charts.forEach((chart: Chart | View) => handleLegendBehavior(chart, legends, donut.color));
      this.updateText(this.textView as View, filteredData, config);
    }
  };
}
