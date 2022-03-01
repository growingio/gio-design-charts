import * as React from 'react';
import classNames from 'classnames';
import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined';
import ArrowRightOutlined from '@ant-design/icons/ArrowRightOutlined';
import ResizeObserver from 'rc-resize-observer';
import { ConfigConsumer, ConfigConsumerProps, DirectionType } from '../config-provider';
import { TagType } from '../tag';
import Breadcrumb, { BreadcrumbProps } from '../breadcrumb';
import Avatar, { AvatarProps } from '../avatar';
import TransButton from '../_util/transButton';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import useDestroyed from '../_util/hooks/useDestroyed';
import { usePrefixCls } from '@gio-design/utils';

export interface DataTableHeaderProps {
  backIcon?: React.ReactNode;
  prefixCls?: string;
  title?: React.ReactNode;
  style?: React.CSSProperties;
  extra?: React.ReactNode;
  className?: string;
}


const renderTitle = (
  props: DataTableHeaderProps,
  prefixCls?: string,
) => {
  const { title, extra } = props;
  const headingPrefixCls = `${prefixCls}-heading`;
  const hasHeading = title || extra;
  // If there is nothing, return a null
  if (!hasHeading) {
    return null;
  }
  const hasTitle = hasHeading;
  return (
    <div className={headingPrefixCls}>
      {hasTitle && (
        <div className={`${headingPrefixCls}-left`}>
          {title && (
            <span
              className={`${headingPrefixCls}-title`}
              title={typeof title === 'string' ? title : undefined}
            >
              {title}
            </span>
          )}
        </div>
      )}
      {extra && <span className={`${headingPrefixCls}-extra`}>{extra}</span>}
    </div>
  );
};

const renderChildren = (prefixCls: string, children: React.ReactNode) => (
  <div className={`${prefixCls}-content`}>{children}</div>
);

const DataTableHeader: React.FC<DataTableHeaderProps> = props => {
  const {
    prefixCls: customizePrefixCls,
    style,
    children,
    className: customizeClassName,
  } = props;
  const prefixCls = usePrefixCls('d-table-header', customizePrefixCls);
  const className = classNames(prefixCls, customizeClassName);
  return (
    <div className={className} style={style}>
      {renderTitle(props, prefixCls)}
      {children && renderChildren(prefixCls || '', children)}
    </div>
  );

};

export default DataTableHeader;