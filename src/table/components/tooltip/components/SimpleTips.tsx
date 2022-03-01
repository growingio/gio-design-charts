import React from 'react';
import { TooltipNameTipsOptions } from '@antv/s2';
import { TOOLTIP_PREFIX_CLS } from '../../../common'
import { usePrefixCls } from '@gio-design/utils';
export const SimpleTips = (props: TooltipNameTipsOptions) => {
  const { tips = '', name = '' } = props;
  const prefixCls = usePrefixCls(TOOLTIP_PREFIX_CLS)
  return (
    <>
      {name && <div className={`${prefixCls}-name`}>{name}</div>}
      {tips && <div className={`${prefixCls}-tips`}>{tips}</div>}
    </>
  );
};
