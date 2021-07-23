import { Chart } from "@antv/g2";
import { ILegends } from "../interface";

const DEFAULT_AUTO_FIT = true;
const DEFAULT_HEIGHT = 200;

export const renderChart = (
  id: HTMLElement | null,
  data: any,
  legends: ILegends,
  config: any
) => {
  const chartConfig = config.chart || {};
  // Set defualt chart config
  const chart = new Chart({
    ...chartConfig,
    container: id as HTMLElement,
    autoFit:
      chartConfig.autoFit === undefined
        ? DEFAULT_AUTO_FIT
        : chartConfig.autoFit,
    height: chartConfig.height || DEFAULT_HEIGHT,
  });

  // Set Data
  chart.data(data);

  // Use array for scale config, in G2 API, we can use different way to call chart.scale()
  // 1. chart.scale({ sale: { min: 0, max: 100} });
  // 2. chart.scale('sale', { min: 0, max: 100});
  // 3. chart.scale({ sale: { min: 0, max: 100} }, { nice: true });
  // See detail https://g2.antv.vision/zh/docs/api/general/scale#scaleoptionmintickinterval
  const scale = config.scale || [];
  chart.scale.apply(chart, scale);

  // tooltip config can be false to disable tooltip
  const tooltip = config.tooltip ?? {};
  chart.tooltip(tooltip);

  // Use array for axis config
  // See detail
  const axis = config.axis || [];
  chart.axis.apply(chart, axis);

  // We don't use default legend
  chart.legend(false);

  // chart.interaction("element-highlight-by-x");

  return chart;
};
