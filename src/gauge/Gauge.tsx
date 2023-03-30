import React, { useMemo } from 'react';
import { ChartProps, GaugeConfig, ChartType, ChartRef } from '../interfaces';
import { Gauge as GaugeCls } from './framework';
import { LegendLayout } from '../layouts';
import { fetchChart } from '../boundary';

export interface GaugeProps extends ChartProps {
  config: GaugeConfig;
}

const Gauge: React.ForwardRefRenderFunction<ChartRef, GaugeProps> = (props, forwardRef) => {
  const { data, legends: legendProps = [], config, title } = props;
  const gauge = useMemo(() => new GaugeCls(), []);
  config.type = ChartType.GAUGE;

  return (
    <LegendLayout title={title} data={data} legendList={legendProps} config={config} chart={gauge} ref={forwardRef} />
  );
};

export default fetchChart<GaugeProps>(Gauge);
