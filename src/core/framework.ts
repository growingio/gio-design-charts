import { Chart, registerAction, registerInteraction, View } from '@antv/g2';
import { AxisOption, Datum, ScaleOption } from '@antv/g2/lib/interface';
import CursorAction from '@antv/g2/lib/interaction/action/cursor';
import { isEmpty } from 'lodash';
import { Actions, Annotation, ChartConfig, ChartOptions, Legends } from '../interfaces';
import { DEFAULT_APPEND_PADDING, DEFAULT_AUTO_FIT, DEFAULT_TINY_APPEND_PADDING } from '../theme';
import { fixedHeight, getDefaultTheme } from '../utils/chart';

import '../utils/tools';
import { getShapeConfig } from '../utils/tools/shapeConfig';
import { getAxisFields } from '../utils/frameworks/axis';

registerInteraction('element-highlight-by-color', {
  start: [{ trigger: 'element:mouseenter', action: 'element-highlight-by-color:highlight' }],
  end: [{ trigger: 'element:mouseleave', action: 'element-highlight-by-color:reset' }],
});

registerAction('cursor', CursorAction);

export const generateChart = (options: ChartOptions, config: ChartConfig) => {
  const { id, theme } = options;
  const basicConfig = config.chart || {};
  const appendPaddingCfg = config.chart?.appendPadding || DEFAULT_APPEND_PADDING;
  // Set defualt chart config
  const chart = new Chart({
    ...basicConfig,
    container: id as HTMLElement,
    autoFit: basicConfig.autoFit === undefined ? DEFAULT_AUTO_FIT : basicConfig.autoFit,
    height: fixedHeight(options, config),
    padding: 'auto',
    appendPadding: config.size === 'tiny' ? DEFAULT_TINY_APPEND_PADDING : appendPaddingCfg,
    theme: getDefaultTheme(theme, config),
    // limitInPlot: true,
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
  if (config.legend) {
    chart.legend(config.legend);
  } else {
    chart.legend(false);
  }
  chart.interaction('element-active', {
    start: [{ trigger: 'element:mouseenter', action: 'cursor:pointer' }],
    end: [{ trigger: 'element:mouseleave', action: 'cursor:pointer' }],
  });
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

export class BaseChart implements Actions {
  instance: Chart | undefined = undefined;
  views: View[] = [];

  options: ChartOptions | undefined = undefined;
  config: ChartConfig | undefined = undefined;

  getAxisFields = () => {
    const shapeConfig = getShapeConfig(this.config);
    return getAxisFields(shapeConfig?.position || '');
  };

  render: (options: ChartOptions, config: ChartConfig) => void = () => {
    // this is parent render function
    // each child needs realize this function
  };

  defaultLegendBehavior = (legends: Legends) => {
    const shapeConfig = getShapeConfig(this.config, this.config?.type);
    if (this.instance && shapeConfig.color) {
      [this.instance, ...this.views]?.forEach((content: Chart | View) => {
        content.filter(shapeConfig.color, (value: string) => !!(legends?.[value] || {}).active);
        content.render(true);
      });
    }
  };

  legend = this.defaultLegendBehavior;

  update = (data: Datum[]) => {
    if (this.instance && data) {
      this.annotations();
      this.instance.changeData(data);
      this.instance.render(true);
    }
  };

  clear = () => {
    this.instance?.destroy();
    this.instance = undefined;
    this.views = [];
  };

  annotations = () => {
    const annotations = this.config?.annotations;
    if (!annotations) {
      return;
    }
    this.instance?.annotation().clear();
    const annotationController = this.instance?.annotation?.();
    for (const annotation of annotations) {
      if (annotation?.type) {
        annotationController?.annotation?.(annotation);
      }
    }
  };
}
