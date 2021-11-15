import { useIntl } from 'react-intl';

export const useIntlDict = () => {
  const intl = useIntl();

  return {
    rate: intl.formatMessage({ id: 'rate', defaultMessage: '占比：', description: '占比' }),
    noData: intl.formatMessage({ id: 'no-data', defaultMessage: '暂无数据', description: '暂无数据' }),
  };
};
