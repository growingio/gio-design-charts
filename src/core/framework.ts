import { Chart, registerInteraction, View } from '@antv/g2';
import Interval from '@antv/g2/lib/geometry/interval';
import { AxisOption, Datum, ScaleOption } from '@antv/g2/lib/interface';
import { isEmpty } from 'lodash';
import { ChartConfig, ChartOptions, Legends } from '../interfaces';
import { DEFAULT_APPEND_PADDING } from '../theme';
import { getDefaultTheme } from '../utils/chart';

import '../utils/tools';

const DEFAULT_AUTO_FIT = true;
const DEFAULT_HEIGHT = 200;
const LEGEND_HEIGHT = 30;

registerInteraction('element-highlight-by-color', {
  start: [{ trigger: 'element:mouseenter', action: 'element-highlight-by-color:highlight' }],
  end: [{ trigger: 'element:mouseleave', action: 'element-highlight-by-color:reset' }],
});

export const generateChart = (options: ChartOptions, config: ChartConfig) => {
  const { id, theme, hasLegend, hasTitle } = options;
  const basicConfig = config.chart || {};
  const appendPaddingCfg = config.chart?.appendPadding || DEFAULT_APPEND_PADDING;
  // Set defualt chart config
  const chart = new Chart({
    ...basicConfig,
    container: id as HTMLElement,
    autoFit: basicConfig.autoFit === undefined ? DEFAULT_AUTO_FIT : basicConfig.autoFit,
    height: (basicConfig.height || DEFAULT_HEIGHT) - (hasLegend ? LEGEND_HEIGHT : 0) - (hasTitle ? LEGEND_HEIGHT : 0),
    padding: 'auto',
    appendPadding: config.size === 'tiny' ? 0 : appendPaddingCfg,
    theme: getDefaultTheme(theme, config),
    limitInPlot: true,
  });
  if (basicConfig.closeAnimate) {
    chart.animate(false);
  }
  chart.legend(false);
  return chart;
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
    const tooltip = config.tooltip;
    if (tooltip) {
      chart.tooltip.call(chart, { ...tooltip });
    } else {
      chart.tooltip(false);
    }
  } catch (err) {
    // handle hook tooltip error
  }
  return chart;
};

export const fetchIntervalLabel = (interval: Interval, config: ChartConfig, labelCallback?: any, labelConfig?: any) => {
  const shapeConfig = config[config.type] || {};
  const label = shapeConfig.label || {};
  if (typeof label === 'string') {
    label && interval.label(label, labelCallback, labelConfig);
  } else if (typeof label === 'object') {
    label.field && interval.label(label.field, label.callback || labelCallback, label.config || labelConfig);
  }
};

export const fetchConfig = (chart: Chart | View, options: ChartOptions, config: ChartConfig) => {
  const { data } = options;

  // Set Data
  if (!isEmpty(data) && Array.isArray(data)) {
    chart.data(data as Datum[]);
  }

  // Use array for scale config, in G2 API, we can use different way to call chart.scale()
  // 1. chart.scale({ sale: { min: 0, max: 100} });
  // 2. chart.scale('sale', { min: 0, max: 100});
  // 3. chart.scale({ sale: { min: 0, max: 100} }, { nice: true });
  // See detail https://g2.antv.vision/zh/docs/api/general/scale#scaleoptionmintickinterval
  const scale = config.scale;
  if (scale) {
    if (Array.isArray(scale)) {
      chart.scale.apply(chart, scale as [string, ScaleOption]);
    } else {
      chart.scale(scale);
    }
  }

  // tooltip config can be false to disable tooltip
  fetchTooltip(chart, config);
  // Use array for axis config
  // See detail
  const axis = config.axis;
  if (axis === false) {
    chart.axis(false);
  } else {
    if (axis) {
      chart.axis.apply(chart, axis);
    }
    const axises = config.axises;
    axises?.map((a: [string, AxisOption]) => chart.axis.apply(chart, a));
  }

  // We don't use default legend
  chart.legend(false);
  chart.interaction('element-active');

  return chart;
};

export const fetchChartConfig = (chart: Chart, options: ChartOptions, config: ChartConfig) => {
  return fetchConfig(chart, options, config) as Chart;
};

export const fetchViewConfig = (chart: View, options: ChartOptions, config: ChartConfig) => {
  return fetchConfig(chart, options, config) as View;
};

export const renderChart = (options: ChartOptions, config: ChartConfig) => {
  const chart = generateChart(options, config);
  return fetchChartConfig(chart, options, config);
};

export const updateChart = ({ chart }: { chart: Chart }, data: Datum[]) => {
  if (chart && data) {
    chart.changeData(data);
    chart.render(true);
  }
};

export const handleLegendBehavior = (chart: Chart | View, legends: Legends, color: string) => {
  if (color) {
    chart.filter(color, (value: string) => !!(legends?.[value] || {}).active);
    chart.render(true);
  }
};
