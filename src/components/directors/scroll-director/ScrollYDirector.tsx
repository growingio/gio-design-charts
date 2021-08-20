import React from 'react';
import { ChartCanvasProps } from '../../base/core';

import './styles/index.less';
import LegendDirector from '../legend-director';

export interface ScrollYDirectorProps extends ChartCanvasProps {
  height: number;
}

/**
 * 主要为了实现条形图的滚动效果
 * 需要做的事情：
 * - 重新计算chart的真实高度
 * - 使用外边框，来创造滚动效果
 * @param props {ScrollYDirectorProps}
 * @returns
 */
const ScrollDirector = (props: ScrollYDirectorProps) => {
  const { height } = props;
  return (
    <div className="gio-d-chart gio-scroll-y-director" style={{ height }}>
      <LegendDirector {...props} />
    </div>
  );
};

export default ScrollDirector;
