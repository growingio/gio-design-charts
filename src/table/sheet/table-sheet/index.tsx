import React, { useEffect } from 'react';
import { SpreadSheet } from '@antv/s2';
import { BaseSheet } from '../base-sheet';
import { SheetProps } from '../../interfaces';

export const TableSheet: React.FC<SheetProps> = React.memo(
  (props) => {
    const { options } = props;
    const s2Ref = React.useRef<SpreadSheet>();

    useEffect(() => {
      s2Ref.current?.interaction.hideColumns(
        options.interaction?.hiddenColumnFields,
      );
    }, [options.interaction?.hiddenColumnFields, s2Ref]);

    return <BaseSheet {...props} ref={s2Ref} />;
  },
);

TableSheet.displayName = 'TableSheet';
