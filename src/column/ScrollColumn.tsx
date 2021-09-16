import React from 'react';
import { ChartProps } from '../interfaces';
import Column from './Column';

const ScrollColumn: React.FC<ChartProps> = (props: ChartProps) => {
  return <Column {...props} useScroll={true} />;
};

export default ScrollColumn;
