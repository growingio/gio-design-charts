import React from 'react';
import { LooseObject } from '@antv/g-base';
import { ChartCanvasProps } from '../../core/core';

import './styles/index.less';
import LegendLayout from '../legend';
import { DEFAULT_CHART_HEIGHT, LEGEND_HEIGHT } from '../../theme';
import { calculateBarHeight } from '../../utils/calculate';
import { ChartConfig, ChartRef } from '../../interfaces';

export interface ScrollYLayoutProps extends ChartCanvasProps {
  renderChildren?: (props: ChartCanvasProps) => React.ReactNode;
  hasOutTitle?: boolean;
}

/**
 * 主要为了实现条形图的滚动效果
 * 需要做的事情：
 * - 重新计算chart的真实高度
 * - 使用外边框，来创造滚动效果
 * @param props {ChartCanvasProps}
 * @returns
 */
const ScrollYLayout: React.ForwardRefRenderFunction<ChartRef, ScrollYLayoutProps> = (props, forwardRef) => {
  const { config, data, isDrag, sizeRegister, renderChildren, hasOutTitle, fullHeight } = props;

  const frameHeight = config?.chart?.height || DEFAULT_CHART_HEIGHT;
  const chartHeight = calculateBarHeight(config, data as LooseObject[]) - 10;
  const fixedChartHeight = fullHeight ? chartHeight : chartHeight - LEGEND_HEIGHT;
  const newConfig = {
    ...config,
    chart: {
      ...(config?.chart || {}),
      // 为了显示右侧文字数据
      // appendPadding: frameHeight < chartHeight ? [0, 60, 0, 0] : [0, 50, 0, 0],
      height: fixedChartHeight,
    },
    ...(isDrag ? { axis: false, axises: null, legend: false } : {}),
  } as ChartConfig;
  sizeRegister && sizeRegister({ height: fixedChartHeight });

  const titleHeight = hasOutTitle ? 30 : 0;
  const showHeight = fullHeight ? fixedChartHeight : frameHeight - titleHeight;
  return (
    <div className="gio-d-charts gio-scroll-y-layout" data-testid="scroll-y-layout" style={{ height: showHeight }}>
      {renderChildren ? (
        renderChildren({ ...props, config: newConfig })
      ) : (
        <LegendLayout {...props} config={newConfig} ref={forwardRef} />
      )}
    </div>
  );
};

export default React.forwardRef(ScrollYLayout);
