import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

export const formatDateByTs = (text: string | number) =>
  !isNaN(Number(text)) ? format(new Date(Number(text)), 'MM/dd EEE', { locale: zhCN }) : text;

export default formatDateByTs;
