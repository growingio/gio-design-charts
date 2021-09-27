import { Chart, View } from '@antv/g2';
import { ChartConfig, ChartOptions, Legend, Legends, Shape, AdjustOtptionType } from '../interfaces';
import { handleLegendBehavior, renderChart } from '../core/framework';
import { getShapeConfig } from '../utils/tools/configUtils';
import { LooseObject } from '@antv/g-base';

export const lineShape = (chart: Chart | View, options: ChartOptions, shapeConfig: Shape) => {
  const { legends } = options;
  const line = chart.line({
    theme: {
      strokeWidth: 2,
    },
  });

  if (shapeConfig.adjust) {
    line.adjust.call(line, shapeConfig.adjust as AdjustOtptionType);
  }
  line.position(shapeConfig.position);
  line.color(shapeConfig.color);
  line.style(shapeConfig.color, (label: string) => {
    const legend = legends?.[label] || ({} as Legend);
    const style = {} as LooseObject;
    if (legend.color) {
      style.stroke = legend.color;
    }
    if (legend.lineDash) {
      style.lineDash = legend.lineDash;
    }
    // default width of line is 2px
    style.lineWidth = 2;
    return style;
  });
  return line;
};

export const lineChart = (options: ChartOptions, config: ChartConfig = {}) => {
  const { id } = options;
  if (!id) {
    return {};
  }
  const chart = renderChart(options, config);
  try {
    const lineConfig = getShapeConfig(config, 'line');
    lineShape(chart, options, lineConfig);
    chart.render();
  } catch (err) {}
  return { chart };
};

export const handleLegend = <LineConfig>(charts: (Chart | View)[], legends: Legends, config: LineConfig) => {
  const lineConfig = getShapeConfig(config, 'line');
  if (lineConfig.color) {
    charts.forEach((chart: Chart | View) => handleLegendBehavior(chart, legends, lineConfig.color));
  }
};
