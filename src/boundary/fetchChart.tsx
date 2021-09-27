import { isEmpty } from 'lodash';
import React from 'react';
import { ChartProps } from '../interfaces';
import ErrorBoundary from './ErrorBoundary';
import { Loading } from './Loading';
import NoData from './NoData';

const fetchChart = <T extends ChartProps>(ChartComponent: React.FC<T>) => {
  return (props: T) => {
    const { errorTemplate, noData, data, loading } = props;
    if (loading) {
      return <Loading />;
    }
    if (!data || isEmpty(data)) {
      return noData ? noData() : <NoData />;
    }
    return (
      <ErrorBoundary errorTemplate={errorTemplate}>
        <ChartComponent {...props} />
      </ErrorBoundary>
    );
  };
};

export default fetchChart;
