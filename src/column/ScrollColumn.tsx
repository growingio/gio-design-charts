import React from 'react';
import Column, { ColumnProps } from './Column';

const ScrollColumn: React.FC<ColumnProps> = (props: ColumnProps) => {
  return <Column {...props} useScroll={true} />;
};

export default ScrollColumn;
