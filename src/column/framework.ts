import { Chart, View } from '@antv/g2';
import { ChartConfig, ChartOptions, Legend, ShapeStyle, CustomInfo, ChartType } from '../interfaces';
import { BAR_TEXTURE, COLUMN_TEXTURE, DEFAULT_RADIUS, DEFAULT_RADIUS_BAR } from '../theme';
import { BaseChart, renderChart } from '../core/framework';

import '../utils/tools/intervalShape';
import { getShapeConfig } from '../utils/tools/shapeConfig';
import { setCustomInfo } from '../utils/tools/configUtils';
import Interval from '@antv/g2/lib/geometry/interval';
import { StyleCallback } from '@antv/g2/lib/interface';
import { getShapeState } from '../utils/tools/shapeState';
import { isSingleDodge } from '../utils/interval';
import { DEFAULT_MIN_COLUMN_WIDTH, DEFAULT_MAX_COLUMN_WIDTH } from '../utils/calculate';

export interface IntervalConfig {
  styles?: ShapeStyle;
  customInfo?: CustomInfo;
  isBack?: boolean;
}

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
  intervalConfig: IntervalConfig,
  styleCallback?: StyleCallback
) => {
  const barConfig = getShapeConfig(config);
  const customInfo = intervalConfig.customInfo || {};
  const intervalStyles = intervalConfig.styles || {};
  const shapeConfig = barConfig.interval || {};
  const hideLabel = options.control?.hideLabel;

  const singleDodge = isSingleDodge(options, barConfig);

  const renderIntervalConfig = { ...shapeConfig, ...intervalStyles };
  const { dodgePadding, intervalPadding, ...rest } = renderIntervalConfig;

  const interval: Interval = chart.interval({
    ...rest,
    ...(singleDodge ? {} : { dodgePadding }),
    ...(intervalPadding !== undefined ? { intervalPadding } : {}),
  });

  if (barConfig.position) {
    interval.position(barConfig.position);
  }
  if (barConfig.color) {
    interval.color(barConfig.color);
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
  if (barConfig.label && !hideLabel && !intervalConfig.isBack) {
    interval.label.apply(interval, barConfig.label);
  }
  interval.state(getShapeState(options));
  interval.customInfo(setCustomInfo(options, config, customInfo));

  return interval;
};

export const handleInterval = (
  chart: Chart | View,
  options: ChartOptions,
  config: ChartConfig,
  intervalConfig: IntervalConfig = {},
  type = 'column'
) => {
  const { legendObject, defaultStyles = {} } = options;

  const radius = type === 'column' ? DEFAULT_RADIUS : DEFAULT_RADIUS_BAR;

  // 渲染出基本柱状图
  intervalShape(
    chart,
    options,
    config,
    { ...intervalConfig, customInfo: { chartType: type, useDash: false } },
    (label: string) => {
      const legend = legendObject?.getLegend(label) || ({} as Legend);
      return {
        fill: legend.color || defaultStyles.color,
        radius,
      };
    }
  );

  // 若有条纹柱子，需要再次绘制
  if (legendObject?.hasDashed) {
    intervalShape(
      chart,
      options,
      config,
      {
        ...intervalConfig,
        customInfo: {
          chartType: type,
          useDash: true,
        },
      },
      (label: string) => {
        const legend = legendObject?.getLegend(label) || ({} as Legend);
        if (legend.dashed) {
          return {
            fill: `p(a)${type === ChartType.COLUMN ? COLUMN_TEXTURE : BAR_TEXTURE}`,
            radius,
          };
        }

        return { fill: legend.color, radius };
      }
    );
  }
  return chart;
};

export class Column extends BaseChart {
  render = (options: ChartOptions, config: ChartConfig = {}) => {
    this.options = options;
    this.config = config;

    const { id } = options;
    if (!id) {
      return {};
    }
    this.instance = renderChart(options, config);
    try {
      const columnIntervalConfig = config?.column?.interval || {};
      const minColumnWidth = columnIntervalConfig.minColumnWidth ?? DEFAULT_MIN_COLUMN_WIDTH;
      const maxColumnWidth = columnIntervalConfig.maxColumnWidth ?? DEFAULT_MAX_COLUMN_WIDTH;
      const dodgePadding = columnIntervalConfig.dodgePadding;
      const intervalPadding = columnIntervalConfig.intervalPadding;
      handleInterval(this.instance, options, config, {
        styles: {
          maxColumnWidth,
          minColumnWidth,
          dodgePadding,
          intervalPadding,
        },
      });
      // this.instance.interval('column', config);
      // this.instance.interaction('element-active');
      this.instance.legend(false);
      this.instance.render();
    } catch (err) {}
  };
}
