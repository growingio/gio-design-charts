import React from 'react';
import { ChartCanvasProps } from '../../core/core';
import { Resizable } from 're-resizable';

import ScrollYLayout from '../scroll/ScrollYLayout';
import useTunnel from '../../hooks/useTunnel';
import VerticalMenu from './VerticalMenu';
import './style/drag.less';
import VerticalContent from './VertivcalContent';
import { Direction } from 're-resizable/lib/resizer';
import { ContentMenu } from '../../bar/Bar';
import { getThemeColor } from '../../utils/styles';
import { LegendLayout } from '../legend';
import { getTextFormatter } from '../../utils/frameworks/axis';

export interface DragLayoutProps extends ChartCanvasProps {
  title?: string;
  total?: number;
  content?: ContentMenu;
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
  const { title, content: { title: subTitle, total } = {}, config } = props;
  const [register, acceptor] = useTunnel();
  const [sizeRegister, sizeAcceptor] = useTunnel();
  const color = getThemeColor(config);
  const textFormatter = getTextFormatter(config);

  /* istanbul ignore next */
  const onResize = (event: MouseEvent | TouchEvent, direction: Direction, elementRef: HTMLElement) => {
    sizeRegister({ width: elementRef.offsetWidth });
  };

  return (
    <div className="gio-d-charts" data-testid="drag-layout">
      {title && (
        <div className="gio-d-charts__title" title={title} style={{ color }}>
          {title}
        </div>
      )}
      <ScrollYLayout
        {...props}
        isDrag={true}
        title={''} // title will set in outside
        sizeRegister={sizeRegister}
        hasOutTitle={!!title}
        renderChildren={(childPorps: ChartCanvasProps) => (
          <div className="drag-layout">
            <Resizable
              className="drag-layout-resize"
              defaultSize={{ width: 120, height: 'auto' }}
              maxWidth="100%"
              minWidth="80px"
              onResize={onResize}
            >
              {subTitle ? (
                <VerticalContent sizeAcceptor={sizeAcceptor} title={subTitle} total={total} color={color} />
              ) : (
                <VerticalMenu acceptor={acceptor} sizeAcceptor={sizeAcceptor} formatter={textFormatter} color={color} />
              )}
            </Resizable>
            <div className="drag-layout-content">
              <LegendLayout {...childPorps} defaultOptions={{ report: register }} />
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default DragLayout;
