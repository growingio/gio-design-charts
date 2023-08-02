import { format } from 'date-fns';
import { zhCN, enUS } from 'date-fns/locale';

export const formatDateByTs = (text: string | number) =>
  !isNaN(Number(text))
    ? format(new Date(Number(text)), 'MM/dd EEE', {
        locale: localStorage.getItem('locale') === 'en-US' ? enUS : zhCN,
      })
    : text;

export default formatDateByTs;
