import { LooseObject } from '@antv/g-base';
import { Chart, View } from '@antv/g2';
import { intervalShape } from '../column/framework';
import { BaseChart, fetchTooltip, renderChart } from '../core/framework';
import { ChartConfig, ChartOptions, Legend, ChartType, Shape, AdjustOptionType } from '../interfaces';
import { getShapeConfig } from '../utils/tools/shapeConfig';
import { DEFAULT_RADIUS } from '../theme';

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
}
