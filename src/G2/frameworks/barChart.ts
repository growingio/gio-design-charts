import { Chart } from "@antv/g2";
import { ILegends } from "../interface";
import { renderChart } from "./common";

export const barChart = (
  id: HTMLElement | null,
  data: any,
  legends: ILegends,
  config: any
) => {
  const chart = renderChart(id, data, config);

  const barConfig = config.bar || {};
  chart
    .interval()
    .position(barConfig.position)
    .color(barConfig.color)
    .adjust([
      {
        type: "dodge",
        marginRatio: 0,
      },
    ])
    .style(barConfig.color, (label: string) => {
      const legend = legends[label] || {};
      // if (label === "Apple") {
      //   return {
      //     fill: legend.color,
      //     //   fillStyle: 'p(a)http://localhost:6006/333.png',
      //   };
      // }
      return { fill: legend.color };
    });
  chart.render();

  return chart;
};

export const handleLegend = (chart: Chart, legends: ILegends, config: any) => {
  const barConfig = config.bar || {};
  chart.filter(barConfig.color, (value: string) => {
    return !!(legends[value] || {}).active;
  });
  chart.render(true);
};
