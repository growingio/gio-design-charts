import React from 'react';
import { LooseObject } from '@antv/g-base';
import { ChartCanvasProps } from '../../core/core';

import './styles/index.less';
import LegendLayout from '../legend';
import { DEAULT_CHART_HEIGHT } from '../../theme';
import { calculateBarHeight } from '../../utils/calculate';

/**
 * 主要为了实现条形图的滚动效果
 * 需要做的事情：
 * - 重新计算chart的真实高度
 * - 使用外边框，来创造滚动效果
 * @param props {ChartCanvasProps}
 * @returns
 */
const ScrollYLayout = (props: ChartCanvasProps) => {
  const { config, data, isDrag, sizeRegister } = props;

  const frameHeight = config?.chart?.height || DEAULT_CHART_HEIGHT;
  const chartHeight = calculateBarHeight(config, data as LooseObject[]);
  const newConfig = {
    ...config,
    chart: {
      ...(config?.chart || {}),
      // 为了显示右侧文字数据
      // appendPadding: frameHeight < chartHeight ? [0, 60, 0, 0] : [0, 50, 0, 0],
      height: chartHeight,
    },
    ...(isDrag ? { axis: false, axises: null, legend: false } : {}),
  };
  sizeRegister && sizeRegister({ height: chartHeight });
  return (
    <div className="gio-d-chart gio-scroll-y-layout" data-testid="scroll-y-layout" style={{ height: frameHeight }}>
      <LegendLayout {...props} config={newConfig} />
    </div>
  );
};

export default ScrollYLayout;
