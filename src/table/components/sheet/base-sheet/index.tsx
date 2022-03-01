import React, { useEffect, useRef } from 'react';
import {
  S2Options,
  SpreadSheet,
  getSafetyDataConfig
} from '@antv/s2';
import { SheetProps } from '../../../interfaces';
import { useSpreadSheet } from '../../../hooks';
import { usePrefixCls } from '@gio-design/utils'
import './index.less';
import { Loading } from '../../../../boundary/Loading';
import { getSheetComponentOptions } from '../../../utils';
import { Header } from '../../header'
export const BaseSheet = React.forwardRef(
  (props: SheetProps, ref: React.ForwardedRef<SpreadSheet | undefined>) => {
    const { dataConfig, options = {}, type: sheetType = 'pivot', prefixCls: customizePrefixCls, header = { legendConfig: { open: true } } } = props;
    const prefixCls = usePrefixCls('d-table', customizePrefixCls);
    const dataCfg = getSafetyDataConfig(dataConfig);
    const s2Options = getSheetComponentOptions(options)
    const { s2Ref, loading, containerRef, wrapRef } = useSpreadSheet(props, {
      sheetType,
      // containerRef: containerRef
    });
    // console.log('base-sheet loading', loading)
    React.useImperativeHandle<SpreadSheet | undefined, SpreadSheet | undefined>(ref, () => s2Ref.current, [s2Ref]);
    if (loading) {
      return <Loading height={s2Options.height} />;
    }
    // if (!dataCfg.data?.length) {
    //   return empty ? empty() : <NoData height={s2Options.height} />;
    // }
    return (
      <React.StrictMode>
        <div ref={wrapRef as React.RefObject<HTMLDivElement>} className={`${prefixCls}-wrapper`}>
          {header && (
            <Header
              {...header}
              sheet={s2Ref.current as SpreadSheet}
              width={containerRef?.current?.getBoundingClientRect()?.width || s2Options.width}
              dataCfg={getSafetyDataConfig(dataCfg)}
              options={getSheetComponentOptions(options)}
            />
          )}
          <div ref={containerRef as React.RefObject<HTMLDivElement>} className={`${prefixCls}-container`} />
        </div>
      </React.StrictMode>
    );
  },
);

