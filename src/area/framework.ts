import { Chart, View } from '@antv/g2';
import { ShapeAttrs } from '@antv/g-base';
import { ChartConfig, ChartOptions, Legend, Legends, Shape, AdjustOtptionType } from '../interfaces';
import { handleLegendBehavior, renderChart, updateChart } from '../core/framework';
import { lineShape } from '../line/framework';
import { getShapeConfig } from '../utils/tools/configUtils';
import { getAreaShapeState } from '../utils/tools/shapeState';

export const areaShape = (chart: Chart | View, options: ChartOptions, shapeConfig: Shape) => {
  const { legends } = options;
  const area = chart.area({
    theme: {
      strokeWidth: 0,
    },
  });
  area.position(shapeConfig.position);
  area.color(shapeConfig.color);
  if (shapeConfig.adjust) {
    area.adjust.call(area, shapeConfig.adjust as AdjustOtptionType);
  }
  area.style(shapeConfig.color, (label: string) => {
    const legend = legends?.[label] || ({} as Legend);
    const style = {} as ShapeAttrs;
    style.fillOpacity = 0.8;
    // default width of line is 2px
    // style.lineWidth = 2;
    style.strokeOpacity = 0.4;
    if (legend.color) {
      style.fill = legend.color;
    }
    if (legend.opacity) {
      style.strokeOpacity = legend.opacity;
      style.fillOpacity = legend.opacity;
    }
    return style;
  });
  area.state(getAreaShapeState());
  return area;
};

export const areaChart = (options: ChartOptions, config: ChartConfig) => {
  const { id } = options;
  if (!id) {
    return {};
  }
  const chart = renderChart(options, config);
  try {
    const areaConfig = getShapeConfig(config, 'area');

    lineShape(chart, options, areaConfig);
    areaShape(chart, options, areaConfig);
    chart.interaction('element-highlight-by-color');
    chart.render();
  } catch (err) {}
  return { chart, update: updateChart };
};

export const handleLegend = <AreaConfig>(charts: (Chart | View)[], legends: Legends, config: AreaConfig) => {
  const lineConfig = getShapeConfig(config, 'area');
  if (lineConfig.color) {
    charts.forEach((chart: Chart | View) => handleLegendBehavior(chart, legends, lineConfig.color));
  }
};
