import React from 'react';
import cx from 'classnames';
import { TooltipContentType } from '@antv/s2';
import { usePrefixCls } from '@gio-design/utils';

interface Props {
  content?: TooltipContentType;
  style?: React.CSSProperties;
  className?: string;
}
export const ReactElement: React.FC<Props> = (props: Props) => {
  const { style = {}, className, content } = props;
  const prefixCls = usePrefixCls('react-element');
  let htmlNode: string;
  if (typeof content !== 'string') {
    htmlNode = content?.innerHTML || '';
  } else {
    htmlNode = content;
  }
  return (
    <div
      style={style}
      className={cx(prefixCls, className)}
      dangerouslySetInnerHTML={{ __html: htmlNode }}
    />
  );


}
