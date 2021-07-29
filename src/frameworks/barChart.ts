import { Chart } from "@antv/g2";
import { ILegends } from "../interface";
import { handleLegendBehavior, renderChart } from "./common";

const interval = (chart: Chart, config: any, styleCallback?: any) => {
  const barConfig = config.bar || {};
  let interval: any = chart.interval();
  if (barConfig.position) {
    interval = interval.position(barConfig.position);
  }
  if (barConfig.color) {
    interval = interval.color(barConfig.color);
  }
  if (barConfig.adjust) {
    interval.adjust(barConfig.adjust);
  }
  // interval.adjust([
  //   {
  //     type: "dodge",
  //     marginRatio: 0,
  //   },
  // ]);
  if (barConfig.color && styleCallback) {
    interval.style(barConfig.color, styleCallback);
  }
};

export const barChart = (
  id: HTMLElement | null,
  data: any,
  legends: ILegends,
  config: any
) => {
  const chart = renderChart(id, data, config);

  interval(chart, config, (label: string) => {
    const legend = legends[label] || {};
    return { fill: legend.color };
  });

  interval(chart, config, (label: string) => {
    const legend = legends[label] || {};
    if (label === "Apple") {
      return {
        fill: "p(n)http://localhost:6006/acorn_PNG37019.png",
      };
    }
    return { fill: legend.color, height: 300 };
  });

  chart.render();

  return chart;
};

export const handleLegend = (chart: Chart, legends: ILegends, config: any) => {
  const barConfig = config.bar || {};
  if (barConfig.color) {
    handleLegendBehavior(chart, legends, barConfig.color);
  }
};
