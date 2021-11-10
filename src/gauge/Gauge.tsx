import React, { useState } from 'react';
import { ChartProps, GaugeConfig, ChartType } from '../interfaces';
import { Gauge as GaugeCls } from './framework';
import { LegendLayout } from '../layouts';
import { fetchChart } from '../boundary';

export interface GaugeProps extends ChartProps {
  config: GaugeConfig;
}

const Gauge: React.FC<GaugeProps> = (props: GaugeProps) => {
  const { data, legends: legendProps = [], config } = props;
  const [Gauge] = useState(new GaugeCls());
  config.type = ChartType.GAUGE;

  return (
    <LegendLayout
      data={data}
      legendList={legendProps}
      config={config}
      callChart={Gauge.render}
      handleLegend={Gauge.legend}
    />
  );
};

export default fetchChart<GaugeProps>(Gauge);
