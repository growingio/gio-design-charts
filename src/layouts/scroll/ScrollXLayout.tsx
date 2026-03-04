import React, { useRef, useEffect, useState } from 'react';
import { ChartCanvasProps } from '../../core/core';

import './styles/index.less';
import LegendLayout from '../legend';
import { calculateColumnWidth, DEFAULT_MIN_COLUMN_WIDTH, DEFAULT_MAX_COLUMN_WIDTH, DEFAULT_DODGE_PADDING, DEFAULT_INTERVAL_PADDING } from '../../utils/calculate';
import { ChartConfig, ChartRef, ChartType } from '../../interfaces';
import { LooseObject } from '@antv/g-base';

export interface ScrollXLayoutProps extends ChartCanvasProps {
  sourceData: LooseObject[];
}

interface ColumnWidthResult {
  needScroll: boolean;
  width: number;
  columnWidth: number;
  intervalPadding: number;
  dodgePadding: number;
}

const ScrollXLayout: React.ForwardRefRenderFunction<ChartRef, ScrollXLayoutProps> = (props, forwardRef) => {
  const { config, sourceData, title } = props;
  const xLayoutRef = useRef<HTMLDivElement | null>(null);

  const userMinColumnWidth = config?.customSizeConfig?.minColumnWidth;
  const userMaxColumnWidth = config?.customSizeConfig?.maxColumnWidth;
  const userDodgePadding = config?.customSizeConfig?.dodgePadding;

  const [resetConfig, setResetConfig] = useState<ChartConfig>(config);
  const [width, setWidth] = useState<number>(0);
  useEffect(() => {
    if (xLayoutRef.current) {
      const offsetWidth = xLayoutRef.current.offsetWidth;
      const columnWidthResult: ColumnWidthResult = calculateColumnWidth(config, sourceData, offsetWidth);
      const widthObj = columnWidthResult.needScroll
        ? { autoFit: false, width: columnWidthResult.width }
        : { autoFit: false, width: offsetWidth };

      const minColumnWidth = userMinColumnWidth ?? DEFAULT_MIN_COLUMN_WIDTH;
      const maxColumnWidth = userMaxColumnWidth ?? DEFAULT_MAX_COLUMN_WIDTH;
      const dodgePadding = userDodgePadding ?? DEFAULT_DODGE_PADDING;

      const isFunnel = config?.type === ChartType.FUNNEL;
      const needIntervalPadding = !isFunnel && columnWidthResult.needScroll;

      const newConfig: ChartConfig = {
        ...config,
        chart: {
          ...(config?.chart || {}),
          ...widthObj,
        },
        column: {
          ...(config?.column || {}),
          interval: {
            ...((config?.column as any)?.interval || {}),
            minColumnWidth: columnWidthResult.needScroll ? columnWidthResult.columnWidth : minColumnWidth,
            maxColumnWidth: columnWidthResult.needScroll ? columnWidthResult.columnWidth : maxColumnWidth,
            dodgePadding: dodgePadding,
            ...(needIntervalPadding ? { intervalPadding: columnWidthResult.intervalPadding } : {}),
          },
        },
        bar: {
          ...(config?.bar || {}),
          interval: {
            ...((config?.bar as any)?.interval || {}),
            minColumnWidth: columnWidthResult.needScroll ? columnWidthResult.columnWidth : minColumnWidth,
            maxColumnWidth: columnWidthResult.needScroll ? columnWidthResult.columnWidth : maxColumnWidth,
            dodgePadding: dodgePadding,
            ...(needIntervalPadding ? { intervalPadding: columnWidthResult.intervalPadding } : {}),
          },
        },
      };
      setWidth(columnWidthResult.needScroll ? columnWidthResult.width : offsetWidth);
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
