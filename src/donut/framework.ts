import { LooseObject } from '@antv/g-base';
import { Chart, View } from '@antv/g2';
import { Datum, MappingDatum } from '@antv/g2/lib/interface';
import { intervalShape } from '../column/framework';
import { BaseChart, fetchConfig, fetchTooltip, generateChart } from '../core/framework';
import { ChartConfig, ChartOptions, Legend, Legends, ChartType, Shape } from '../interfaces';
import { getShapeConfig } from '../utils/tools/shapeConfig';
import { donutText } from '../utils/frameworks/text';
import { formatNumber, formatPercent } from '../utils/formatNumber';
import { bindDonutCoordination } from '../utils/frameworks/coordinate';

export class Donut extends BaseChart {
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
    textView?.clear();
    this.addText(textView, data, config);
    textView?.render(true);
    textView?.render(true);
  };

  update = (data: Datum[]) => {
    const [donutView, textView] = this.views;
    if (Array.isArray(data)) {
      donutView?.changeData(data);
    }
    donutView?.render(true);
    this.updateText(textView, data, this.config as ChartConfig);
    this.instance?.forceFit();
    this.instance?.render(true);
    this.instance?.render(true);
  };

  render = (options: ChartOptions, config: ChartConfig) => {
    const { id, legendObject, defaultStyles = {}, data } = options;
    if (!id) {
      /* istanbul ignore next */
      return {};
    }

    this.config = config;

    const donutCfg = getShapeConfig(config, ChartType.DONUT);
    this.setTotal(data as LooseObject[], donutCfg);

    this.instance = generateChart(options, config);
    const donutView = this.instance.createView();
    fetchConfig(donutView, options, config);
    bindDonutCoordination(donutView);

    const interval = intervalShape(donutView, options, config, {}, (label: string) => {
      const legend = legendObject?.getLegend(label) || ({} as Legend);
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
            /* istanbul ignore next */
            return `${dataItem[donutCfg.color || 'name']}: ${formatPercent(dataItem['count'] / this.totalCount)}`;
          },
        };
      },
      labelStyles
    );

    const textView = this.instance.createView();
    bindDonutCoordination(textView);
    fetchConfig(textView, options, config);
    this.addText(textView, data as LooseObject[], config);
    textView.render();

    fetchTooltip(this.instance, config);
    this.instance.legend(false);
    this.instance.render();
    this.instance.render(true);

    this.donutView = donutView;
    this.textView = textView;
    this.views.push(donutView);
    this.views.push(textView);
    this.options = options;
  };
  setTotal = (data: LooseObject[], donutCfg: Shape) => {
    this.totalCount = data.reduce((total: number, item: LooseObject) => {
      return total + item[(donutCfg as any)?.position];
    }, 0);
  };

  legend = (legends: Legends) => {
    const donut = getShapeConfig(this.config, 'donut');
    if (donut.color) {
      const filteredData = this.options?.data?.filter((item: LooseObject) => legends[item[donut.color]].active);
      this.setTotal(filteredData, donut);
      this.updateText(this.textView as View, filteredData, this.config as ChartConfig);
      this.defaultLegendBehavior(legends);
      this.instance?.render(true);
    }
  };
}
