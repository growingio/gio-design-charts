import React, { useMemo } from 'react';
import { ChartProps, GaugeConfig, ChartType } from '../interfaces';
import { Gauge as GaugeCls } from './framework';
import { LegendLayout } from '../layouts';
import { fetchChart } from '../boundary';

export interface GaugeProps extends ChartProps {
  config: GaugeConfig;
}

const Gauge: React.FC<GaugeProps> = (props: GaugeProps) => {
  const { data, legends: legendProps = [], config, title } = props;
  const gauge = useMemo(() => new GaugeCls(), []);
  config.type = ChartType.GAUGE;

  return <LegendLayout title={title} data={data} legendList={legendProps} config={config} chart={gauge} />;
};

export default fetchChart<GaugeProps>(Gauge);
