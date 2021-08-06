import React from 'react';
import { funnelChart, handleLegend } from '../frameworks/funnelChart';

import { ChartType, IChartProps } from '../interface';
import Basic from './Basic';

const BarChart = (props: IChartProps) => {
  const { data, legends: legendProps = [], config = {} } = props;

  return (
    <Basic
      type={ChartType.BAR}
      data={data}
      legends={legendProps}
      config={config}
      callChart={funnelChart}
      handleLegend={handleLegend}
    />
  );
};

export default BarChart;
