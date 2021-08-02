import { Chart } from "@antv/g2";
import { IChartConfig, IChartOptions, ILegends } from "../interface";
import { colors } from "../theme";

const DEFAULT_AUTO_FIT = true;
const DEFAULT_HEIGHT = 200;

const generateChart = (chartConfig: any, id: HTMLElement) => {
  // Set defualt chart config
  const renderChart = new Chart({
    ...chartConfig,
    container: id as HTMLElement,
    autoFit:
      chartConfig.autoFit === undefined
        ? DEFAULT_AUTO_FIT
        : chartConfig.autoFit,
    height: chartConfig.height || DEFAULT_HEIGHT,
  });
  return renderChart;
};

export const renderChart = (options: IChartOptions, config: IChartConfig) => {
  const { id, data } = options;
  const basicConfig = config.chart || {};
  const chart = generateChart(basicConfig, id as HTMLElement);

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
  chart.tooltip({ ...tooltip });

  // Use array for axis config
  // See detail
  const axis = config.axis || [];
  chart.axis.apply(chart, axis);

  // We don't use default legend
  chart.legend(false);

  chart.interaction("active-region");

  // chart.interaction("element-highlight-by-x");

  // set default colors, althought we have set default color for each legend.
  // but it's still necessary to add default colors for theme
  chart.theme({
    styleSheet: {
      paletteQualitative10: colors,
    },
  });

  return chart;
};

export const handleLegendBehavior = (
  chart: Chart,
  legends: ILegends,
  color: string
) => {
  if (color) {
    chart.filter(color, (value: string) => {
      return !!(legends[value] || {}).active;
    });
    chart.render(true);
  }
};
