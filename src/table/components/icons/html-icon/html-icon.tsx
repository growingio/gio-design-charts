import React from 'react';
import classNames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import { getIcon } from '@antv/s2';

import './index.less';

export interface HtmlIconProps {
  /**
   *  'globalAsc' | 'globalDesc' | 'groupAsc' | 'groupDesc' | 'none';
   */
  name: string;
  width?: number;
  height?: number;
  /**
  * 设置图标的样式名
  */
  className?: string;
  /**
   * 设置图标的样式
   */
  style?: React.CSSProperties;
}

export const HtmlIcon: React.FC<HtmlIconProps> = (props: HtmlIconProps) => {
  const { style = {}, width, height, className, name } = props;
  const prefixCls = usePrefixCls('html-icon');
  const svgIcon = () => getIcon(name);
  const newStyle = { ...style };
  // html-icon 和 gui-icon 的接口趋于一致，都有 width 和 height 的便携属性
  // 但在 html-icon 中，需要将 width 和 height 合入 style 中，且 width 比 style.width 优先级高
  if (width) {
    newStyle.width = `${width}px`;
  }
  if (height) {
    newStyle.height = `${height}px`;
  }
  const cls = classNames(prefixCls, className);
  return (
    <span
      style={newStyle}
      className={cls}
      dangerouslySetInnerHTML={{ __html: svgIcon() }} // svg icon 都要求是本地文件，所以暂不担心 xss 问题了
    />
  );

}
