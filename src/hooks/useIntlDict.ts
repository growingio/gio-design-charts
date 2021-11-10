import { useIntl } from 'react-intl';

export const useIntlDict = () => {
  const intl = useIntl();

  return {
    rate: intl.formatMessage({ id: 'rate', defaultMessage: '占比：', description: '占比' }),
  };
};
