import React, { useState } from 'react';
import { ChartProps, DonutConfig, ChartType } from '../interfaces';
import { Donut as DonutCls } from './framework';
import { LegendLayout } from '../layouts';
import { fetchChart } from '../boundary';

export interface DonutProps extends ChartProps {
  config: DonutConfig;
}

const Donut: React.FC<DonutProps> = (props: DonutProps) => {
  const { data, legends: legendProps = [], config, title } = props;
  const [donut] = useState(new DonutCls());
  config.type = ChartType.DONUT;

  return (
    <LegendLayout
      title={title}
      data={data}
      legendList={legendProps}
      config={config}
      callChart={donut.render}
      handleLegend={donut.legend}
    />
  );
};

export default fetchChart<DonutProps>(Donut);
