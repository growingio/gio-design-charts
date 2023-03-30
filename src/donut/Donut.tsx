import React, { useMemo } from 'react';
import { ChartProps, DonutConfig, ChartType, ChartRef } from '../interfaces';
import { Donut as DonutCls } from './framework';
import { LegendLayout } from '../layouts';
import { fetchChart } from '../boundary';

export interface DonutProps extends ChartProps {
  config: DonutConfig;
}

const Donut: React.ForwardRefRenderFunction<ChartRef, DonutProps> = (props, forwardRef) => {
  const { data, legends: legendProps = [], config, title } = props;
  const donut = useMemo(() => new DonutCls(), []);
  config.type = ChartType.DONUT;

  return (
    <LegendLayout title={title} data={data} legendList={legendProps} config={config} chart={donut} ref={forwardRef} />
  );
};

export default fetchChart<DonutProps>(Donut);
