import React from 'react';
import { ChartProps } from '../interfaces';
import ColumnChart from './Column';

const ScrollColumnChart: React.FC<ChartProps> = (props: ChartProps) => {
  return <ColumnChart {...props} useScroll={true} />;
};

export default ScrollColumnChart;
