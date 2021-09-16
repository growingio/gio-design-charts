import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

export const dateFormatterByTs = (text: string | number) =>
  format(new Date(Number(text)), 'MM/dd EEE', { locale: zhCN });

export default dateFormatterByTs;
