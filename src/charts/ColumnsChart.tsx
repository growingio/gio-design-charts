import React from 'react';
import { columnChart, handleLegend } from '../frameworks/columnChart';

import { ChartType, IChartProps } from '../interface';
import Basic from './Basic';

const ColumnChart = (props: IChartProps) => {
  const { data, legends: legendProps = [], config = {} } = props;

  return (
    <Basic
      type={ChartType.COLUMN}
      data={data}
      legends={legendProps}
      config={config}
      callChart={columnChart}
      handleLegend={handleLegend}
    />
  );
};

export default ColumnChart;
