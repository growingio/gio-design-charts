import React, { LegacyRef, useEffect, useRef, useState } from 'react';
import { ChartCanvasProps } from '../../base/core';

import './styles/index.less';
import LegendDirector from '../legend-director';
import useOffset from '../../hooks/useOffset';

export interface ScrollXDirectorProps extends ChartCanvasProps {
  width: number;
}

/**
 * 主要为了实现柱状图左右滚动效果
 * 需要做的事情：
 * - 重新计算chart的真实宽度
 * - 使用外边框，来创造滚动效果
 * @param props {ScrollXDirectorProps}
 * @returns
 */
const ScrollDirector = (props: ScrollXDirectorProps) => {
  const { width, config } = props;
  const xDirectorRef: LegacyRef<HTMLDivElement> = React.createRef();
  const offset = useOffset(xDirectorRef);

  const widthObj = width > offset.width + 100 ? { autoFit: false, width } : { autoFit: true };
  config.chart = { ...(config.chart || {}), ...widthObj };

  return (
    <div className="gio-d-chart gio-scroll-x-director" ref={xDirectorRef}>
      <LegendDirector {...props} />
    </div>
  );
};

export default ScrollDirector;
