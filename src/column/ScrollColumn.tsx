import React from 'react';
import { ChartRef } from '../interfaces';
import Column, { ColumnProps } from './Column';

const ScrollColumn: React.ForwardRefRenderFunction<ChartRef, ColumnProps> = (props, forwardRef) => {
  return <Column {...props} useScroll={true} ref={forwardRef} />;
};

export default React.forwardRef(ScrollColumn);
