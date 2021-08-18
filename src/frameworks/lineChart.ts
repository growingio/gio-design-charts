import { Chart, View } from '@antv/g2';
import { ChartConfig, ChartOptions, Legend, Legends } from '../interface';
import { handleLegendBehavior, renderChart } from './common';
import { getShapeConfig } from './utils';

export const lineShape = (chart: Chart | View, options: ChartOptions, shapeConfig: any) => {
  const { legends } = options;
  const line = chart.line({
    theme: {
      strokeWidth: 2,
    },
  });

  if (shapeConfig.adjust) {
    line.adjust.apply(line, shapeConfig.adjust);
  }
  line.position(shapeConfig.position);
  line.color(shapeConfig.color);
  line.style(shapeConfig.color, (label: string) => {
    const legend = legends?.[label] || ({} as Legend);
    const style = {} as any;
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
    return;
  }
  const chart = renderChart(options, config);
  try {
    const lineConfig = getShapeConfig(config, 'line');
    lineShape(chart, options, lineConfig);
    chart.render();
  } catch (err) {}
  return { chart };
};

export const handleLegend = (charts: (Chart | View)[], legends: Legends, config: any) => {
  const lineConfig = getShapeConfig(config, 'line');
  if (lineConfig.color) {
    charts.map((chart: Chart | View) => handleLegendBehavior(chart, legends, lineConfig.color));
  }
};
