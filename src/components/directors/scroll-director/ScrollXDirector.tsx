import React, { LegacyRef, useEffect, useRef, useState } from 'react';
import { ChartCanvasProps } from '../../base/core';

import './styles/index.less';
import LegendDirector from '../legend-director';
import { calculateColumnWidth } from '../../../utils/calculate';
import { ChartConfig } from '../../../interface';

export interface ScrollXDirectorProps extends ChartCanvasProps {
  sourceData: any;
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
  const { config, sourceData } = props;
  const xDirectorRef: LegacyRef<HTMLDivElement> = React.createRef();

  const [resetConfig, setResetConfig] = useState<ChartConfig>(config);
  const [width, setWidth] = useState<number>(0);
  useEffect(() => {
    if (xDirectorRef.current) {
      const calculateWidth = calculateColumnWidth(config, sourceData);
      const offsetWidth = xDirectorRef.current.offsetWidth;
      const widthObj = width > offsetWidth + 100 ? { autoFit: false, width } : { autoFit: true };
      const newConfig: ChartConfig = {
        ...config,
        chart: {
          ...(config.chart || {}),
          ...widthObj,
        },
      };
      setWidth(calculateWidth);
      setResetConfig(newConfig);
    }
  }, [config, width]);
  return (
    <div className="gio-d-chart gio-scroll-x-director" ref={xDirectorRef}>
      <LegendDirector {...props} config={resetConfig} width={width} />
    </div>
  );
};

export default ScrollDirector;
