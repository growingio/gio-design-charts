import { Chart, View } from '@antv/g2';
import { ChartConfig, ChartOptions, Legend, Legends, ShapeStyle, CustomInfo, ChartType } from '../interfaces';
import { BAR_TEXTURE, COLUMN_TEXTURE, DEFAULT_RADIUS, DEFAULT_RADIUS_BAR } from '../theme';
import { BaseChart, renderChart } from '../core/framework';

import '../utils/tools/intervalShape';
import { setCustomInfo } from '../utils/tools/configUtils';
import Interval from '@antv/g2/lib/geometry/interval';
import { StyleCallback } from '@antv/g2/lib/interface';
import { getShapeState } from '../utils/tools/shapeState';
import { isSingleDodge } from '../utils/interval';
import _ from 'lodash';
import { getShapeConfig } from '../utils/tools/shapeConfig';

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
  const { dodgePadding, ...rest } = renderIntervalConfig;

  const interval: Interval = chart.interval({
    ...rest,
    ...(singleDodge ? {} : { dodgePadding }),
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
  const { legends = {}, hasDashed, defaultStyles = {} } = options;

  const radius = type === 'column' ? DEFAULT_RADIUS : DEFAULT_RADIUS_BAR;

  // 渲染出基本柱状图
  intervalShape(
    chart,
    options,
    config,
    { ...intervalConfig, customInfo: { chartType: type, useDash: false } },
    (label: string) => {
      const legend = legends[label] || ({} as Legend);
      return {
        fill: legend.color || defaultStyles.color,
        radius,
      };
    }
  );

  // 若有条纹柱子，需要再次绘制
  if (hasDashed) {
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
        const legend = legends[label] || ({} as Legend);
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

class CombineColumn extends BaseChart {
  render = (options: ChartOptions, config: ChartConfig = {}) => {
    const { id, legends } = options;
    if (!id) {
      return {};
    }
    const chart = renderChart(options, config);
    // 允许绘制点图 和 标志线
    const { point, annotation } = config;
    const { color = '', position = '', shape = 'circle', size = 1, adjust = [] } = point;
    const { line = {}, text = {} } = annotation;
    try {
      chart
        .point()
        .color(color)
        .position(position)
        .size(size)
        .shape(shape)
        .style(color, (val) => {
          const legend = (legends as any)?.[val];
          return {
            stroke: color,
            fill: legend?.pointColor || legend?.color,
          };
        })
        .adjust(adjust[0]);
      chart.annotation().line(line).text(text);
      handleInterval(chart, options, config, {
        styles: {
          maxColumnWidth: 200,
          minColumnWidth: 40,
        },
      });
      chart
        .point()
        .color(color)
        .position(position)
        .size(size)
        .shape(shape)
        .style(color, (val) => {
          const legend = (legends as any)?.[val];
          return {
            stroke: color,
            fill: legend?.pointColor || legend?.color,
          };
        })
        .adjust(adjust[0]);
      chart.interaction('element-active');
      chart.render();
      this.instance = chart;
    } catch (err) {}
    return { chart, update: this.update };
  };
}

// export const handleLegend = <ColumnConfig>(charts: (Chart | View)[], legends: Legends, config: ColumnConfig) => {
//   const barConfig = getShapeConfig(config as ChartConfig, 'column');
//   if (barConfig.color) {
//     charts.forEach((chart: Chart | View) => handleLegendBehavior(chart, legends, barConfig.color));
//   }
// };

export default CombineColumn;
