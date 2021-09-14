import { Chart, Element, View } from '@antv/g2';
import { ChartConfig, ChartOptions, Legend, Legends } from '../interface';
import { BAR_TEXTURE, DEFAULT_REDIUS, DEFAULT_REDIUS_BAR } from '../theme';
import { handleLegendBehavior, renderChart } from './common';

import './tools/intervalShape';
import { getShapeConfig, setCustomInfo } from './utils';

/**
 *
 * @param chart
 * @param options
 * @param config
 * @param intervalConfig
 * @param styleCallback
 * @returns
 */
export const intervalShape = (
  chart: Chart | View,
  options: ChartOptions,
  config: ChartConfig,
  intervalConfig: any,
  styleCallback?: any
) => {
  const barConfig = getShapeConfig(config);
  const customInfo = intervalConfig.customInfo || {};
  const intervalStyles = intervalConfig.intervalStyles || {};
  const shapeConfig = barConfig.interval || {};
  const hideLabel = options.control?.hideLabel;

  let interval: any = chart.interval({
    ...shapeConfig,
    ...intervalStyles,
    // dodgePadding: 8,
    // intervalPadding: 40,
    // maxColumnWidth: 40,
    // minColumnWidth: 40,
  });
  if (barConfig.position) {
    interval = interval.position(barConfig.position);
  }
  if (barConfig.color) {
    interval = interval.color(barConfig.color);
    interval.shape(barConfig.color, [`${customInfo.chartType || 'column'}-element`]);
  }
  if (barConfig.adjust) {
    interval.adjust(barConfig.adjust);
    if (barConfig.adjust === 'stack') {
      customInfo.isStack = true;
    }
  }
  if (barConfig.color && styleCallback) {
    interval.style(barConfig.color, styleCallback);
  }

  if (barConfig.label && !hideLabel) {
    interval.label.apply(interval, barConfig.label);
  }
  interval.state({
    active: {
      style: (element: Element) => {
        // 因为Element.model中的颜色为G2根据theme自动设置的颜色，和根据业务需求设定的颜色会不同
        // 在element.stateStyle.default中设置的颜色为最真实的颜色，但stateStyle是私有方法，无法直接获取
        // 在这里采取Element中设置stateStyle的方法，获取stateStyle，并获取其中的fill颜色

        const defaultColor = options?.defaultStyles?.color;
        const modelFill = element?.getModel()?.style?.fill;
        const modelColor = element?.getModel()?.color;
        return {
          lineWidth: 2,
          stroke: defaultColor || modelFill || modelColor || '#000',
          strokeOpacity: 0.5,
        };
      },
    },
  });
  interval.customInfo(setCustomInfo(options, config, customInfo));
  return interval;
};

export const handleInterval = (chart: Chart | View, options: ChartOptions, config: ChartConfig, type = 'column') => {
  const { legends = {}, hasDashed, defaultStyles = {} } = options;

  const radius = type === 'column' ? DEFAULT_REDIUS : DEFAULT_REDIUS_BAR;

  // 渲染出基本柱状图
  intervalShape(chart, options, config, { customInfo: { chartType: type, useDash: false } }, (label: string) => {
    const legend = legends[label] || ({} as Legend);
    return {
      // stroke: '#fff',
      // strokeWidth: 1,
      fill: legend.color || defaultStyles.color,
      radius,
    };
  });

  // 若有条纹柱子，需要再次绘制
  if (hasDashed) {
    intervalShape(
      chart,
      options,
      config,
      {
        customInfo: {
          chartType: type,
          useDash: true,
        },
      },
      (label: string) => {
        const legend = legends[label] || ({} as Legend);
        if (legend.dashed) {
          return {
            fill: `p(a)${BAR_TEXTURE}`,
            radius,
          };
        }
        return { fill: legend.color, radius };
      }
    );
  }
  return chart;
};

export const columnChart = (options: ChartOptions, config: ChartConfig = {}) => {
  const { id } = options;
  if (!id) {
    return {};
  }
  const chart = renderChart(options, config);
  try {
    handleInterval(chart, options, config);
    chart.interaction('element-active');
    chart.render();
  } catch (err) {}
  return { chart };
};

export const handleLegend = (charts: (Chart | View)[], legends: Legends, config: any) => {
  const barConfig = getShapeConfig(config, 'column');
  if (barConfig.color) {
    charts.forEach((chart: Chart | View) => handleLegendBehavior(chart, legends, barConfig.color));
  }
};
