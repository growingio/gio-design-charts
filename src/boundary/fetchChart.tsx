import { DesignContext } from '@gio-design/utils';
import { isEmpty } from 'lodash';
import React, { useContext } from 'react';
import { IntlProvider } from 'react-intl';
import { ChartProps, ChartRef, TinyChartProps } from '../interfaces';
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

const fetchChart = <T extends ChartProps | TinyChartProps>(
  ChartComponent: React.ForwardRefRenderFunction<ChartRef, T>
) =>
  React.forwardRef((props: T, forwardRef) => {
    const { errorTemplate, noData, data, loading, config } = props;
    const height = config?.chart?.height;
    if (loading) {
      return <Loading height={height} />;
    }
    if (!data || isEmpty(data)) {
      return noData ? noData() : <NoData height={height} />;
    }
    const context = useContext(DesignContext);
    const localeCode = context?.locale?.code || 'zh-CN';
    const Com = React.forwardRef<ChartRef, T & React.RefAttributes<ChartRef>>(ChartComponent);
    return (
      <IntlProvider defaultLocale="zh-CN" locale={localeCode} messages={MESSAGES[localeCode] ?? {}}>
        <ErrorBoundary errorTemplate={errorTemplate}>
          {/* @ts-ignore */}
          <Com {...props} ref={forwardRef} />
        </ErrorBoundary>
      </IntlProvider>
    );
  });

export default fetchChart;
