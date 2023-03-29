import React, { useRef, useEffect, useState } from 'react';
import { ChartCanvasProps } from '../../core/core';

import './styles/index.less';
import LegendLayout from '../legend';
import { calculateColumnWidth } from '../../utils/calculate';
import { ChartConfig, ChartRef } from '../../interfaces';
import { LooseObject } from '@antv/g-base';

export interface ScrollXLayoutProps extends ChartCanvasProps {
  sourceData: LooseObject[];
}

/**
 * 主要为了实现柱状图左右滚动效果
 * 需要做的事情：
 * - 重新计算chart的真实宽度
 * - 使用外边框，来创造滚动效果
 * @param props {ScrollXLayoutProps}
 * @returns
 */
const ScrollXLayout: React.ForwardRefRenderFunction<ChartRef, ScrollXLayoutProps> = (props, forwardRef) => {
  const { config, sourceData, title } = props;
  const xLayoutRef = useRef<HTMLDivElement | null>(null);

  const [resetConfig, setResetConfig] = useState<ChartConfig>(config);
  const [width, setWidth] = useState<number>(0);
  useEffect(() => {
    if (xLayoutRef.current) {
      const calculateWidth = calculateColumnWidth(config, sourceData);
      const offsetWidth = xLayoutRef.current.offsetWidth;
      const widthObj =
        calculateWidth > offsetWidth + 40
          ? { autoFit: false, width: calculateWidth }
          : { autoFit: false, width: offsetWidth };
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
  }, [config, width, sourceData]);
  return (
    <div className="gio-d-charts gio-scroll-x-layout" data-testid="scroll-x-layout" ref={xLayoutRef}>
      <LegendLayout {...props} config={resetConfig} title={title} width={width} ref={forwardRef} />
    </div>
  );
};

export default React.forwardRef(ScrollXLayout);
