import React from 'react';
import { SpreadSheet } from '@antv/s2';
import { TableSheet } from './table-sheet';
import { SheetProps } from '../interfaces';
import { PivotSheet } from './pivot-sheet';

const Sheet = React.forwardRef(
  (props: SheetProps, ref: React.ForwardedRef<SpreadSheet>) => {
    const { type: sheetType } = props;

    const sheetProps: SheetProps = React.useMemo(() => {
      return {
        ...props,
      };
    }, [props]);

    const CurrentSheet = React.useMemo(() => {
      switch (sheetType) {
        case 'table':
          return <TableSheet {...sheetProps} />;
        default:
          return <PivotSheet {...sheetProps} />;
      }
    }, [sheetType, sheetProps]);

    return <React.StrictMode>{CurrentSheet} </React.StrictMode>;
  },
);

Sheet.displayName = 'DataTable';

export const SheetComponent: React.ForwardRefExoticComponent<
  SheetProps & React.RefAttributes<SpreadSheet>
> = React.memo(Sheet);
