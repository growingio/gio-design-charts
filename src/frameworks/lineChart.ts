import { Chart, View } from '@antv/g2';
import { IChartConfig, IChartOptions, ILegend, ILegends } from '../interface';
import { handleLegendBehavior, renderChart } from './common';
import { getShapeConfig } from './utils';

export const lineChart = (options: IChartOptions, config: IChartConfig = {}) => {
  const { id } = options;
  if (!id) {
    return;
  }
  const { legends } = options;
  const chart = renderChart(options, config);
  const lineConfig = getShapeConfig(config, 'line');

  chart
    .line({
      theme: {
        strokeWidth: 2,
      },
    })
    .position(lineConfig.position)
    .color(lineConfig.color)
    .style(lineConfig.color, (label: string) => {
      const legend = legends?.[label] || ({} as ILegend);
      const style = {} as any;
      if(legend.color) {
        style.stroke = legend.color
      }
      if (legend.lineDash) {
        style.lineDash = legend.lineDash;
      }
      // default width of line is 2px
      style.lineWidth = 2;
      return style;
    });

  if (lineConfig.area) {
    chart.area().position(lineConfig.area).color(lineConfig.color); // style ?
  }

  chart.render();
  return { chart };
};

export const handleLegend = (charts: (Chart | View)[], legends: ILegends, config: any) => {
  const lineConfig = getShapeConfig(config, 'line');
  if (lineConfig.color) {
    charts.map((chart: Chart | View) => {
      handleLegendBehavior(chart, legends, lineConfig.color);
    });
  }
};
