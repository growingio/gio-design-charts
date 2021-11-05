import React from 'react';
import { ChartProps, DonutConfig, ChartType } from '../interfaces';
import { Donut } from './framework';
import { LegendLayout } from '../layouts';
import { fetchChart } from '../boundary';

export interface DonutProps extends ChartProps {
  config: DonutConfig;
}

const Column: React.FC<DonutProps> = (props: DonutProps) => {
  const { data, legends: legendProps = [], config } = props;
  const donut = new Donut();
  config.type = ChartType.DONUT;

  return (
    <LegendLayout
      data={data}
      legendList={legendProps}
      config={config}
      callChart={donut.render}
      handleLegend={donut.legend}
    />
  );
};

export default fetchChart<DonutProps>(Column);
