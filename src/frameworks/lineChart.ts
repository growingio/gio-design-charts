import { Chart } from "@antv/g2";
import { IChartConfig, IChartOptions, ILegends } from "../interface";
import { handleLegendBehavior, renderChart } from "./common";

export const lineChart = (
  options: IChartOptions,
  config: IChartConfig = {}
) => {
  const { legends } = options;
  const chart = renderChart(options, config);
  const lineConfig = config.line || {};

  chart
    .line({
      theme: {
        strokeWidth: 2,
      },
    })
    .position(lineConfig.position)
    .color(lineConfig.color)
    .style(lineConfig.color, (label: string) => {
      const legend = legends[label] || {};
      const style = { stroke: legend.color } as any;
      if (legend.lineDash) {
        style.lineDash = legend.lineDash;
      }
      // default width of line is 2px
      style.lineWidth = 2;
      return style;
    });
  chart.render();
  return chart;
};

export const handleLegend = (chart: Chart, legends: ILegends, config: any) => {
  const lineConfig = config.line;
  if (lineConfig.color) {
    handleLegendBehavior(chart, legends, lineConfig.color);
  }
};
