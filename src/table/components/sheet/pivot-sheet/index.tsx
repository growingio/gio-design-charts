import React from 'react';
import { SpreadSheet, customMerge } from '@antv/s2';
import { BaseSheet } from '../base-sheet';
import { SheetProps } from '../../../interfaces';
import { AnnotationDataCell } from './AnnotationDataCell'
export const PivotSheet: React.FC<SheetProps> = React.memo(
  (props) => {
    const { options, ...restProps } = props;
    const s2Ref = React.useRef<SpreadSheet>();
    const s2Options = React.useMemo(() => {
      return customMerge(options, {
        dataCell: AnnotationDataCell,
      });
    }, [options]);
    return <BaseSheet options={s2Options} {...restProps} ref={s2Ref} />;
  },
);

PivotSheet.displayName = 'PivotSheet';