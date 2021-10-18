import React, { useCallback } from 'react';
import { ChartCanvasProps } from '../../core/core';
import { NumberSize, Resizable } from 're-resizable';

import ScrollYLayout from '../scroll/ScrollYLayout';
import useTunnel from '../../hooks/useTunnel';
import VerticalMenu from './VerticalMenu';
import './style/drag.less';
import VerticalContent from './VertivcalContent';
import { Direction } from 're-resizable/lib/resizer';

export interface DragLayoutProps extends ChartCanvasProps {
  title?: string;
  total?: number;
}

/**
 * 主要为了实现条形图的滚动效果
 * 需要做的事情：
 * - 重新计算chart的真实高度
 * - 使用外边框，来创造滚动效果
 * @param props {ChartCanvasProps}
 * @returns
 */
const DragLayout = (props: DragLayoutProps) => {
  const { title, total } = props;
  const [register, acceptor] = useTunnel();
  const [sizeRegister, sizeAcceptor] = useTunnel();

  return (
    <div className="gio-d-charts" data-testid="drag-layout">
      <div className="drag-layout">
        <Resizable
          className="drag-layout-resize"
          defaultSize={{ width: 120, height: 'auto' }}
          maxWidth="100%"
          minWidth="80px"
          onResize={(event: MouseEvent | TouchEvent, direction: Direction, elementRef: HTMLElement) => {
            sizeRegister({ width: elementRef.offsetWidth });
          }}
        >
          {title ? (
            <VerticalContent sizeAcceptor={sizeAcceptor} title={title} total={total} />
          ) : (
            <VerticalMenu acceptor={acceptor} sizeAcceptor={sizeAcceptor} />
          )}
        </Resizable>
        <div className="drag-layout-content">
          <ScrollYLayout {...props} isDrag={true} sizeRegister={sizeRegister} defaultOptions={{ report: register }} />
        </div>
      </div>
    </div>
  );
};

export default DragLayout;
