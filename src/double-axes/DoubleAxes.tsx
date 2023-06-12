import React, { useMemo } from 'react';
import { ChartProps, DoubleAxesConfig, ChartType, ChartRef } from '../interfaces';
import { DoubleAxes as DoubleAxesCls } from './framework';
import { LegendLayout } from '../layouts';
import { fetchChart } from '../boundary';

export interface DoubleAxesProps extends ChartProps {
  config: DoubleAxesConfig;
}

const DoubleAxes: React.ForwardRefRenderFunction<ChartRef, DoubleAxesProps> = (props, forwardRef) => {
  const { data, legends: legendProps = [], config, title } = props;
  const doubleAxes = useMemo(() => new DoubleAxesCls(), []);
  // ChartType.DoubleAxes === 'column' 这是保证，双轴图至少需要绘制一个柱状图
  config.type = ChartType.DoubleAxes;
  return (
    <LegendLayout
      title={title}
      data={data}
      legendList={legendProps}
      config={config}
      chart={doubleAxes}
      ref={forwardRef}
    />
  );
};

export default fetchChart<DoubleAxesProps>(DoubleAxes);
