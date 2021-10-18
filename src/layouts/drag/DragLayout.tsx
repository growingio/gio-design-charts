import React, { useCallback } from 'react';
import { ChartCanvasProps } from '../../core/core';
import { Resizable } from 're-resizable';

import ScrollYLayout from '../scroll/ScrollYLayout';
import useTunnel from '../../hooks/useTunnel';
import VerticalMenu from './VerticalMenu';
import './style/drag.less';

/**
 * 主要为了实现条形图的滚动效果
 * 需要做的事情：
 * - 重新计算chart的真实高度
 * - 使用外边框，来创造滚动效果
 * @param props {ChartCanvasProps}
 * @returns
 */
const DragLayout = (props: ChartCanvasProps) => {
  const [register, acceptor] = useTunnel();
  const [heightRegister, heightAcceptor] = useTunnel();
  return (
    <div className="gio-d-charts gio-scroll-y-layout" data-testid="scroll-y-layout">
      <div className="drag-layout">
        <Resizable
          className="drag-layout-resize"
          defaultSize={{ width: 60, height: 'auto' }}
          maxWidth="100%"
          minWidth="30px"
        >
          <VerticalMenu acceptor={acceptor} heightAcceptor={heightAcceptor} />
        </Resizable>
        <div className="drag-layout-content">
          <ScrollYLayout
            {...props}
            isDrag={true}
            heightRegister={heightRegister}
            defaultOptions={{ report: register }}
          />
        </div>
      </div>
    </div>
  );
};

export default DragLayout;
