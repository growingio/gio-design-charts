import React from 'react';
import { SpreadSheet } from '@antv/s2';
import { TableSheet } from './table-sheet';
import { SheetProps } from '../interfaces';
import { PivotSheet } from './pivot-sheet';

const Sheet = React.forwardRef(
  (props: SheetProps, ref: React.ForwardedRef<SpreadSheet>) => {
    const { type = 'pivot', adaptive = true, ...restProps } = props;

    const sheetProps: SheetProps = React.useMemo(() => {
      return {
        ...restProps,
        type,
        adaptive

      };
    }, [restProps, type, adaptive]);

    const CurrentSheet = React.useMemo(() => {
      switch (type) {
        case 'table':
          return <TableSheet {...sheetProps} />;
        default:
          return <PivotSheet {...sheetProps} />;
      }
    }, [type, sheetProps]);

    return <React.StrictMode>{CurrentSheet} </React.StrictMode>;
  },
);

Sheet.displayName = 'DataTable';

export const DataTable: React.ForwardRefExoticComponent<
  SheetProps & React.RefAttributes<SpreadSheet>
> = React.memo(Sheet);
