import React from 'react';
import { ChartCanvasProps } from '../../core/core';

import './styles/index.less';
import LegendDirector from '../legend-director';
import { DEAULT_CHART_HEIGHT } from '../../../theme';
import { calculateBarHeight } from '../../../utils/calculate';

export interface ScrollYDirectorProps extends ChartCanvasProps {}

/**
 * 主要为了实现条形图的滚动效果
 * 需要做的事情：
 * - 重新计算chart的真实高度
 * - 使用外边框，来创造滚动效果
 * @param props {ScrollYDirectorProps}
 * @returns
 */
const ScrollDirector = (props: ScrollYDirectorProps) => {
  const { config, data } = props;

  const frameHeight = config?.chart?.height || DEAULT_CHART_HEIGHT;
  const chartHeight = calculateBarHeight(config, data);
  const newConfig = {
    ...config,
    chart: {
      ...(config.chart || {}),
      // 为了显示右侧文字数据
      appendPadding: frameHeight < chartHeight ? [0, 60, 0, 0] : [0, 50, 0, 0],
      height: chartHeight,
    },
  };
  return (
    <div className="gio-d-chart gio-scroll-y-director" data-testid="scroll-y-director" style={{ height: frameHeight }}>
      <LegendDirector {...props} config={newConfig} />
    </div>
  );
};

export default ScrollDirector;
