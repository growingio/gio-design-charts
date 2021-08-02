import { Chart, View } from "@antv/g2";
import { IChartConfig, IChartOptions, ILegends } from "../interface";
import { handleInterval } from "./columnChart";
import { handleLegendBehavior } from "./common";
import { getShapeConfig } from "./utils";

export const barChart = (options: IChartOptions, config: IChartConfig) => {
  const chart = handleInterval(options, config, "bar");
  chart.coordinate().transpose();
  chart.render();
  return { chart };
};

export const handleLegend = (
  charts: (Chart | View)[],
  legends: ILegends,
  config: any
) => {
  const barConfig = getShapeConfig(config, "bar");
  if (barConfig.color) {
    charts.map((chart: Chart | View) => {
      handleLegendBehavior(chart, legends, barConfig.color);
    });
  }
};
