import { usePrefixCls } from '@gio-design/utils';
import React from 'react';
import { TOOLTIP_PREFIX_CLS } from '../../../common';

export const Divider = () => {
  const tooltipPrefixCls = usePrefixCls(TOOLTIP_PREFIX_CLS);
  return <div className={`${tooltipPrefixCls}-divider`} />;
};
