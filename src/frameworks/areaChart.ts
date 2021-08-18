import { Chart, View } from '@antv/g2';
import { ChartConfig, ChartOptions, Legend, Legends } from '../interface';
import { handleLegendBehavior, renderChart } from './common';
import { lineShape } from './lineChart';
import { getShapeConfig } from './utils';

export const areaShape = (chart: Chart | View, options: ChartOptions, shapeConfig: any) => {
  const { legends } = options;
  const area = chart.area({
    theme: {
      strokeWidth: 0,
    },
  });
  area.position(shapeConfig.position);
  area.color(shapeConfig.color);
  if (shapeConfig.adjust) {
    area.adjust.apply(area, shapeConfig.adjust);
  }
  area.style(shapeConfig.color, (label: string) => {
    const legend = legends?.[label] || ({} as Legend);
    const style = {} as any;
    if (legend.color) {
      style.stroke = legend.color;
    }
    if (legend.lineDash) {
      style.lineDash = legend.lineDash;
    }
    // default width of line is 2px
    style.lineWidth = 0;
    return style;
  });
  return area;
};

export const areaChart = (options: ChartOptions, config: ChartConfig = {}) => {
  const { id } = options;
  if (!id) {
    return;
  }
  const chart = renderChart(options, config);
  try {
    const areaConfig = getShapeConfig(config, 'area');

    lineShape(chart, options, areaConfig);
    areaShape(chart, options, areaConfig);

    chart.render();
  } catch (err) {}
  return { chart };
};

export const handleLegend = (charts: (Chart | View)[], legends: Legends, config: any) => {
  const lineConfig = getShapeConfig(config, 'area');
  if (lineConfig.color) {
    charts.map((chart: Chart | View) => handleLegendBehavior(chart, legends, lineConfig.color));
  }
};
