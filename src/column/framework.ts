import { Chart, View } from '@antv/g2';
import { ChartConfig, ChartOptions, Legend, Shape, ShapeStyle, CustomInfo, ChartType } from '../interfaces';
import { BAR_TEXTURE, COLUMN_TEXTURE, DEFAULT_MIN_HEIGHT, DEFAULT_RADIUS, DEFAULT_RADIUS_BAR } from '../theme';
import { BaseChart, renderChart } from '../core/framework';

import '../utils/tools/intervalShape';
import { getShapeConfig } from '../utils/tools/shapeConfig';
import { setCustomInfo } from '../utils/tools/configUtils';
import Interval from '@antv/g2/lib/geometry/interval';
import { StyleCallback } from '@antv/g2/lib/interface';
import { getShapeState } from '../utils/tools/shapeState';
import { isSingleDodge } from '../utils/interval';
import { getAxisFields } from '../utils/frameworks/axis';
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

/**
 * 渲染双 y 轴柱状图：通过 config.column2 配置第二组柱。
 * 第二组柱与主柱渲染在同一个 view 上（共享 x 带），并设置其 y 轴位于右侧，形成双 y 轴。
 * 为了让左右轴柱子分组对齐而非重叠，主柱与第二组柱必须使用相同的 dodge 分组字段
 * （即两者的 color 字段一致，如 'series'），G2 会按相同的分组数排布，使柱子相邻。
 * @param chart
 * @param options
 * @param config
 * @param intervalConfig
 * @returns
 */
export const handleColumn2 = (
  chart: Chart | View,
  options: ChartOptions,
  config: ChartConfig,
  intervalConfig: IntervalConfig = {}
) => {
  const column2Cfg = ((config as ChartConfig & { column2?: Shape }) || { column2: undefined }).column2;
  if (!column2Cfg) {
    return chart;
  }

  // 将第二组柱对应的 y 轴放到右侧，形成双 y 轴
  const [, yField2] = getAxisFields(column2Cfg.position as string);
  if (yField2) {
    chart.axis(yField2, { position: 'right', grid: null });
  }

  // 复用主柱渲染逻辑，基于 column2 配置渲染第二组柱
  handleInterval(chart, options, { ...config, column: column2Cfg }, intervalConfig, 'column');

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
      const barConfig = getShapeConfig(config);
      const columnIntervalConfig = config?.column?.interval || {};
      const minColumnWidth = columnIntervalConfig.minColumnWidth ?? DEFAULT_MIN_COLUMN_WIDTH;
      const maxColumnWidth = columnIntervalConfig.maxColumnWidth ?? DEFAULT_MAX_COLUMN_WIDTH;
      const dodgePadding = columnIntervalConfig.dodgePadding;
      const intervalPadding = columnIntervalConfig.intervalPadding;
      if (barConfig.adjust !== 'stack') {
        const minHeight = columnIntervalConfig.minHeight ?? DEFAULT_MIN_HEIGHT;
        options.defaultStyles = {
          ...options.defaultStyles,
          minHeight,
        };
      }
      handleInterval(this.instance, options, config, {
        styles: {
          maxColumnWidth,
          minColumnWidth,
          dodgePadding,
          intervalPadding,
        },
      });
      // 若配置了 column2，额外渲染第二组柱以支持双 y 轴
      handleColumn2(this.instance, options, config, {
        styles: {
          maxColumnWidth,
          minColumnWidth,
        },
      });
      // this.instance.interval('column', config);
      // this.instance.interaction('element-active');
      this.instance.legend(false);
      this.instance.render();
    } catch (err) {}
  };
}
