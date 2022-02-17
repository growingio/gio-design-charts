import React from 'react';
import { SpreadSheet } from '@antv/s2';
import { BaseSheet } from '../base-sheet';
import { SheetProps } from '../../interfaces';

export const PivotSheet: React.FC<SheetProps> = React.memo(
  (props) => {

    const s2Ref = React.useRef<SpreadSheet>();

    return <BaseSheet {...props} ref={s2Ref} />;
  },
);

PivotSheet.displayName = 'PivotSheet';
