import { DesignContext } from '@gio-design/utils';
import { isEmpty } from 'lodash';
import React, { useContext } from 'react';
import { IntlProvider } from 'react-intl';
import { ChartProps, TinyChartProps } from '../interfaces';
import ErrorBoundary from './ErrorBoundary';
import { Loading } from './Loading';
import NoData from './NoData';
import en from '../locales/en.json';
import { LooseObject } from '@antv/g-base';

const MESSAGES: LooseObject = {
  'en-US': en,
  en: en,
  'zh-CN': {},
  zh: {},
};

const fetchChart = <T extends ChartProps | TinyChartProps>(ChartComponent: React.FC<T>) => {
  return (props: T) => {
    const { errorTemplate, noData, data, loading, config } = props;
    const height = config?.chart?.height;
    if (loading) {
      return <Loading height={height} />;
    }
    if (!data || isEmpty(data)) {
      return noData ? noData() : <NoData height={height} />;
    }
    const context = useContext(DesignContext);
    // const localeCode = context?.locale?.code || 'zh-CN';
    const localeCode = 'en';
    return (
      <IntlProvider defaultLocale="zh" locale={localeCode} messages={MESSAGES[localeCode] ?? {}}>
        <ErrorBoundary errorTemplate={errorTemplate}>
          <ChartComponent {...props} />
        </ErrorBoundary>
      </IntlProvider>
    );
  };
};

export default fetchChart;
