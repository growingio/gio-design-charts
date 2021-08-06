import React from 'react';
import { lineChart, handleLegend } from '../frameworks/lineChart';
import { ChartType, IChartProps } from '../interface';

import Basic from './Basic';

const LineChart = (props: IChartProps) => {
  const { data, legends: legendProps = [], config } = props;

  return (
    <Basic
      type={ChartType.LINE}
      data={data}
      legends={legendProps}
      config={config}
      callChart={lineChart}
      handleLegend={handleLegend}
    />
  );
};

export default LineChart;
