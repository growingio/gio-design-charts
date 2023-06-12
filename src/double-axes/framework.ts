import { LooseObject } from '@antv/g-base';
import { Chart, Element, View } from '@antv/g2';
import { Datum, MappingDatum } from '@antv/g2/lib/interface';
import { intervalShape } from '../column/framework';
import { BaseChart, fetchConfig, fetchTooltip, generateChart, renderChart } from '../core/framework';
import { ChartConfig, ChartOptions, Legend, Legends, ChartType, Shape, AdjustOptionType } from '../interfaces';
import { getShapeConfig } from '../utils/tools/shapeConfig';
import { donutText } from '../utils/frameworks/text';
import { formatNumber, formatPercent } from '../utils/formatNumber';
import { bindDonutCoordination } from '../utils/frameworks/coordinate';

export class DoubleAxes extends BaseChart {
  donutView: View | undefined = undefined;
  textView: View | undefined = undefined;
  options: ChartOptions | undefined = undefined;
  config: ChartConfig | undefined = undefined;
  totalCount = 0;

  lineShape = (chart: Chart | View, options: ChartOptions, shapeConfig: Shape) => {
    const { legendObject } = options;
    const line = chart.line({
      theme: {
        strokeWidth: 2,
      },
    });

    if (shapeConfig.adjust) {
      line.adjust.call(line, shapeConfig.adjust as AdjustOptionType);
    }
    line.position(shapeConfig.position);
    if (shapeConfig?.shape) {
      line.shape('split-line');
    }
    if (shapeConfig.color) {
      line.color(shapeConfig.color);
      line.style(shapeConfig.color, (label: string) => {
        const legend = legendObject?.getLegend(label) || ({} as Legend);
        const style = {} as LooseObject;
        style.stroke = legend?.color || '#5F87FF';
        if (legend.lineDash) {
          style.lineDash = legend.lineDash;
        }
        // default width of line is 2px
        style.lineWidth = 2;
        return style;
      });
    }
    return line;
  };

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
    console.log(data);
    if (Array.isArray(data)) {
      this.instance?.changeData(data);
    }
    donutView?.render(true);
    this.updateText(textView, data, this.config as ChartConfig);
    this.instance?.forceFit();
    this.instance?.render(true);
    this.instance?.render(true);
  };

  render = (options: ChartOptions, config: ChartConfig) => {
    const { id, legendObject, defaultStyles = {} } = options;
    if (!id) {
      /* istanbul ignore next */
      return {};
    }

    this.config = config;

    this.instance = renderChart(options, config);

    const columnCfg = getShapeConfig(config, ChartType.COLUMN);
    // 渲染出基本柱状图
    intervalShape(
      this.instance,
      options,
      config,
      { ...columnCfg, customInfo: { chartType: ChartType.DoubleAxes, useDash: false } },
      (label: string) => {
        const legend = legendObject?.getLegend(label) || ({} as Legend);
        return {
          fill: legend.color || defaultStyles.color,
        };
      }
    );

    const lineCfg = getShapeConfig(config, ChartType.LINE);
    this.lineShape(this.instance, options, lineCfg);

    fetchTooltip(this.instance, config);
    this.instance.render();
    this.instance.render(true);

    this.options = options;
  };
  setTotal = (data: LooseObject[], donutCfg: Shape) => {
    this.totalCount = data.reduce((total: number, item: LooseObject) => {
      return total + item[donutCfg?.position];
    }, 0);
  };

  legend = (legends: Legends) => {
    console.log(this.instance?.geometries);
    this.instance?.geometries?.[0]?.getElementsBy?.((element: Element) => {
      console.log(element);
      return true;
    });
    const filter = (chartType: ChartType) => {
      const shapeCfg = getShapeConfig(this.config, chartType);
      if (shapeCfg.color) {
        const filteredData = this.options?.data?.filter((item: LooseObject) => legends[item[shapeCfg.color]].active);
        this.setTotal(filteredData, shapeCfg);
        this.updateText(this.textView as View, filteredData, this.config as ChartConfig);
        this.defaultLegendBehavior(legends);
        this.instance?.render(true);
      }
    };
    filter(ChartType.COLUMN);
    filter(ChartType.LINE);
  };
}
