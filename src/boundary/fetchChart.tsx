import { isEmpty } from 'lodash';
import React from 'react';
import { ChartProps, TinyChartProps } from '../interfaces';
import ErrorBoundary from './ErrorBoundary';
import { Loading } from './Loading';
import NoData from './NoData';

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
    return (
      <ErrorBoundary errorTemplate={errorTemplate}>
        <ChartComponent {...props} />
      </ErrorBoundary>
    );
  };
};

export default fetchChart;
