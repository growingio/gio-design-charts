import { Chart } from "@antv/g2";
import { IChartConfig, IChartOptions, ILegends } from "../interface";
import { handleInterval } from "./columnChart";
import { handleLegendBehavior } from "./common";
import { getShapeConfig } from "./utils";

export const barChart = (options: IChartOptions, config: IChartConfig) => {
  const chart = handleInterval(options, config, "bar");
  chart.coordinate().transpose();
  chart.axis("value", {
    label: null,
    title: {
      offset: 30,
      style: {
        fontSize: 12,
        fontWeight: 300,
      },
    },
  });
  chart.axis("type", {
    title: null,
    tickLine: null,
    line: null,
  });
  chart.render();
  return chart;
};

export const handleLegend = (chart: Chart, legends: ILegends, config: any) => {
  const barConfig = getShapeConfig(config, "bar");
  if (barConfig.color) {
    handleLegendBehavior(chart, legends, barConfig.color);
  }
};
