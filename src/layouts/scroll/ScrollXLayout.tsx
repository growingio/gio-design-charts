import React, { LegacyRef, useEffect, useState } from 'react';
import { ChartCanvasProps } from '../../core/core';

import './styles/index.less';
import LegendLayout from '../legend';
import { calculateColumnWidth } from '../../utils/calculate';
import { ChartConfig } from '../../interfaces';

export interface ScrollXLayoutProps extends ChartCanvasProps {
  sourceData: any;
}

/**
 * 主要为了实现柱状图左右滚动效果
 * 需要做的事情：
 * - 重新计算chart的真实宽度
 * - 使用外边框，来创造滚动效果
 * @param props {ScrollXLayoutProps}
 * @returns
 */
const ScrollXLayout = (props: ScrollXLayoutProps) => {
  const { config, sourceData } = props;
  const xLayoutRef: LegacyRef<HTMLDivElement> = React.createRef();

  const [resetConfig, setResetConfig] = useState<ChartConfig>(config);
  const [width, setWidth] = useState<number>(0);
  useEffect(() => {
    if (xLayoutRef.current) {
      const calculateWidth = calculateColumnWidth(config, sourceData);
      const offsetWidth = xLayoutRef.current.offsetWidth;
      const widthObj = width > offsetWidth + 100 ? { autoFit: false, width } : { autoFit: true };
      const newConfig: ChartConfig = {
        ...config,
        chart: {
          ...(config?.chart || {}),
          ...widthObj,
        },
      };
      setWidth(calculateWidth);
      setResetConfig(newConfig);
    }
  }, [config, width]);
  return (
    <div className="gio-d-chart gio-scroll-x-layout" data-testid="scroll-x-layout" ref={xLayoutRef}>
      <LegendLayout {...props} config={resetConfig} width={width} />
    </div>
  );
};

export default ScrollXLayout;
