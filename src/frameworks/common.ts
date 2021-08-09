import { Chart, View } from '@antv/g2';
import { IChartConfig, IChartOptions, ILegends } from '../interface';
import { colors } from '../theme';

const DEFAULT_AUTO_FIT = true;
const DEFAULT_HEIGHT = 200;

export const generateChart = (options: IChartOptions, config: IChartConfig) => {
  const { id } = options;
  const basicConfig = config.chart || {};
  // Set defualt chart config
  const renderChart = new Chart({
    ...basicConfig,
    container: id as HTMLElement,
    autoFit: basicConfig.autoFit === undefined ? DEFAULT_AUTO_FIT : basicConfig.autoFit,
    height: basicConfig.height || DEFAULT_HEIGHT,
  });
  return renderChart;
};

export const fetchChartConfig = (chart: Chart | View, options: IChartConfig, config: IChartConfig) => {
  const { data = [] } = options;

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
  try {
    const tooltip = config.tooltip ?? {};
    chart.tooltip.call(chart, { ...tooltip });
  } catch (err) {
    console.log(err);
  }
  // Use array for axis config
  // See detail
  const axis = config.axis || [];
  chart.axis.apply(chart, axis);
  // Support multi axis config
  const axises = config.axises || [];
  axises.map((a: any) => {
    chart.axis.apply(chart, a);
  });

  // We don't use default legend
  chart.legend(false);

  chart.interaction('active-region');

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

export const renderChart = (options: IChartOptions, config: IChartConfig) => {
  const chart = generateChart(options, config);
  return fetchChartConfig(chart, options, config);
};

export const handleLegendBehavior = (chart: Chart | View, legends: ILegends, color: string) => {
  if (color) {
    chart.filter(color, (value: string) => {
      return !!(legends?.[value] || {}).active;
    });
    chart.render(true);
  }
};
