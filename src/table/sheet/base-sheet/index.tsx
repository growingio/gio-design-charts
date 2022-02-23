import React, { useEffect, useRef } from 'react';
import {
  S2Options,
  SpreadSheet,
  getSafetyDataConfig
} from '@antv/s2';
import { SheetProps } from '../../interfaces';
import { useSpreadSheet } from '../../hooks';
import { usePrefixCls } from '@gio-design/utils'
import './index.less';
import { Loading } from '../../../boundary/Loading';
import NoData from '../../../boundary/NoData';
import { getSheetComponentOptions } from '../../utils';
import { themeDefault } from '../../theme'
export const BaseSheet = React.forwardRef(
  (props: SheetProps, ref: React.ForwardedRef<SpreadSheet | undefined>) => {
    const { dataConfig, options = {}, type: sheetType = 'pivot', prefixCls: customizePrefixCls } = props;
    const prefixCls = usePrefixCls('d-table', customizePrefixCls);
    const dataCfg = getSafetyDataConfig(dataConfig);
    const s2Options = getSheetComponentOptions(options)
    const { s2Ref, loading, containerRef } = useSpreadSheet(props, {
      sheetType,
      // containerRef: containerRef
    });
    console.log('base-sheet loading', loading)
    React.useImperativeHandle<SpreadSheet | undefined, SpreadSheet | undefined>(ref, () => s2Ref.current, [s2Ref]);
    if (loading) {
      return <Loading height={s2Options.height} />;
    }
    // if (!dataCfg.data?.length) {
    //   return empty ? empty() : <NoData height={s2Options.height} />;
    // }
    return (
      // <React.StrictMode>
        <div ref={containerRef as React.RefObject<HTMLDivElement>} className={`${prefixCls}-container`} />
      // </React.StrictMode>
    );
  },
);

