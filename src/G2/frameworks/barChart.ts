import { Chart } from "@antv/g2";
import { ILegends } from "../interface";
import { handleLegendBehavior, renderChart } from "./common";

export const barChart = (
  id: HTMLElement | null,
  data: any,
  legends: ILegends,
  config: any
) => {
  const chart = renderChart(id, data, config);

  const barConfig = config.bar || {};
  console.log("barConfig", barConfig);
  let interval: any = chart.interval();
  if (barConfig.position) {
    interval = interval.position(barConfig.position);
  }
  if (barConfig.color) {
    interval = interval.color(barConfig.color);
  }
  interval.adjust([
    {
      type: "dodge",
      marginRatio: 0,
    },
  ]);
  if (barConfig.color) {
    interval.style(barConfig.color, (label: string) => {
      const legend = legends[label] || {};
      // if (label === "Apple") {
      //   return {
      //     fill: legend.color,
      //     //   fillStyle: 'p(a)http://localhost:6006/333.png',
      //   };
      // }
      return { fill: legend.color };
    });
  }

  chart.render();

  return chart;
};

export const handleLegend = (chart: Chart, legends: ILegends, config: any) => {
  const barConfig = config.bar || {};
  if (barConfig.color) {
    handleLegendBehavior(chart, legends, barConfig.color);
  }
};
