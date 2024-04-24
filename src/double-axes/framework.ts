import { LooseObject } from '@antv/g-base';
import { Chart, Element, View } from '@antv/g2';
import { Datum } from '@antv/g2/lib/interface';
import { intervalShape } from '../column/framework';
import { BaseChart, fetchTooltip, renderChart } from '../core/framework';
import { ChartConfig, ChartOptions, Legend, Legends, ChartType, Shape, AdjustOptionType } from '../interfaces';
import { getShapeConfig } from '../utils/tools/shapeConfig';
import { donutText } from '../utils/frameworks/text';
import { formatNumber } from '../utils/formatNumber';
import { DEFAULT_RADIUS } from '../theme';
import { first } from 'lodash';

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
    line.position((shapeConfig as any).position);
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
      { ...columnCfg, customInfo: { chartType: ChartType.COLUMN, useDash: false } },
      (label: string) => {
        const legend = legendObject?.getLegend(label) || ({} as Legend);
        return {
          fill: legend.color || defaultStyles.color,
          radius: DEFAULT_RADIUS,
        };
      }
    );

    const lineCfg = getShapeConfig(config, ChartType.LINE);
    this.lineShape(this.instance, options, lineCfg);

    fetchTooltip(this.instance, config);
    this.instance.legend(false);
    this.instance.render();
    this.instance.render(true);

    this.options = options;
  };
  setTotal = (data: LooseObject[], donutCfg: Shape) => {
    this.totalCount = data.reduce((total: number, item: LooseObject) => {
      return total + item[(donutCfg as any)?.position];
    }, 0);
  };

  getColor = (type: ChartType) => {
    const shapeCfg = getShapeConfig(this.config, type);
    return shapeCfg?.color || '';
  };

  legend = (legends: Legends) => {
    const lineColor = this.getColor(ChartType.LINE);
    const columnColor = this.getColor(ChartType.COLUMN);
    this.instance?.geometries?.[0]?.getElementsBy?.((element: Element) => {
      const colorData = element?.getData()?.[columnColor];
      element.changeVisible(!!legends[colorData]?.active);
      return true;
    });
    this.instance?.geometries?.[1]?.getElementsBy?.((element: Element) => {
      const colorData = first(element?.getData() as Datum[])?.[lineColor];
      element.changeVisible(!!legends[colorData]?.active);
      return true;
    });
  };
}
