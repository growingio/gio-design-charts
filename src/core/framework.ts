import { Chart, registerTheme, View } from '@antv/g2';
import { AxisOption, ScaleOption } from '@antv/g2/lib/interface';
import { isEmpty } from 'lodash';
import { ChartConfig, ChartOptions, Legends } from '../interfaces';
import { gioTheme } from '../theme/chart';

import '../utils/tools';

const DEFAULT_AUTO_FIT = true;
const DEFAULT_HEIGHT = 200;

registerTheme('gio-theme', gioTheme);

export const generateChart = (options: ChartOptions, config: ChartConfig) => {
  const { id } = options;
  const basicConfig = config.chart || {};
  // Set defualt chart config
  return new Chart({
    ...basicConfig,
    container: id as HTMLElement,
    autoFit: basicConfig.autoFit === undefined ? DEFAULT_AUTO_FIT : basicConfig.autoFit,
    height: basicConfig.height || DEFAULT_HEIGHT,
    theme: 'gio-theme',
  });
};

/**
 * It seems the tooltip is invalid when it's set on View.
 * It should be set in Chart instance and it should be called behind create view.
 * @param chart
 * @param config
 * @returns
 */
export const fetchTooltip = (chart: Chart | View, config: ChartConfig) => {
  try {
    const tooltip = config.tooltip ?? {};
    chart.tooltip.call(chart, { ...tooltip });
  } catch (err) {
    // handle hook tooltip error
  }
  return chart;
};

export const fetchChartConfig = (chart: Chart | View, options: ChartConfig, config: ChartConfig) => {
  const { data } = options;

  // Set Data
  if (!isEmpty(data)) {
    chart.data(data);
  }

  // Use array for scale config, in G2 API, we can use different way to call chart.scale()
  // 1. chart.scale({ sale: { min: 0, max: 100} });
  // 2. chart.scale('sale', { min: 0, max: 100});
  // 3. chart.scale({ sale: { min: 0, max: 100} }, { nice: true });
  // See detail https://g2.antv.vision/zh/docs/api/general/scale#scaleoptionmintickinterval
  const scale = config.scale;
  if (scale) {
    chart.scale.apply(chart, scale);
  }
  const scales = config.scales;
  scales?.forEach((sc: [string, ScaleOption]) => {
    chart.scale.apply(chart, sc);
  });

  // tooltip config can be false to disable tooltip
  fetchTooltip(chart, config);
  // Use array for axis config
  // See detail
  const axis = config.axis;
  if (axis) {
    chart.axis.apply(chart, axis);
  }
  // Support multi axis config
  const axises = config.axises;
  axises?.map((a: [string, AxisOption]) => chart.axis.apply(chart, a));

  // We don't use default legend
  chart.legend(false);
  chart.interaction('element-active');

  return chart;
};

export const renderChart = (options: ChartOptions, config: ChartConfig) => {
  const chart = generateChart(options, config);
  return fetchChartConfig(chart, options, config);
};

export const handleLegendBehavior = (chart: Chart | View, legends: Legends, color: string) => {
  if (color) {
    chart.filter(color, (value: string) => !!(legends?.[value] || {}).active);
    chart.render(true);
  }
};
