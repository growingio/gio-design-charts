import React, { useContext } from 'react';
import { SpreadSheet } from '@antv/s2';
import { TableSheet } from './table-sheet';
import { SheetProps } from '../../interfaces';
import { PivotSheet } from './pivot-sheet';
import { IntlProvider } from 'react-intl';
import { DesignContext } from '@gio-design/utils';
import en from '../../../locales/en.json';
const MESSAGES: { [key: string]: any; } = {
  'en-US': en,
  en: en,
  'zh-CN': {},
  zh: {},
};
const Sheet = React.forwardRef(
  (props: SheetProps, ref: React.ForwardedRef<SpreadSheet>) => {
    const { type = 'pivot', adaptive = true, ...restProps } = props;
    const context = useContext(DesignContext);
    const localeCode = context?.locale?.code || 'zh-CN';

    const sheetProps: SheetProps = React.useMemo(() => {
      return {
        ...restProps,
        type,
        adaptive,
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

    return <IntlProvider defaultLocale="zh-CN" locale={localeCode} messages={MESSAGES[localeCode] ?? {}}>
      <React.StrictMode>{CurrentSheet} </React.StrictMode>
    </IntlProvider>;
  },
);

Sheet.displayName = 'DataTable';

export const DataTable: React.ForwardRefExoticComponent<
  SheetProps & React.RefAttributes<SpreadSheet>
> = React.memo(Sheet);
