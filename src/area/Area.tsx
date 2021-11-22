import React from 'react';
import { areaChart, handleLegend } from './framework';
import { ChartType, ChartProps, AreaConfig } from '../interfaces';

import { LegendLayout } from '../layouts';
import { fetchChart } from '../boundary';

export interface AreaProps extends ChartProps {
  config: AreaConfig;
}

const Area: React.FC<AreaProps> = (props: AreaProps) => {
  const { data, legends: legendProps = [], title, config } = props;

  config.type = ChartType.AREA;
  return (
    <LegendLayout
      title={title}
      data={data}
      legendList={legendProps}
      config={config}
      callChart={areaChart}
      handleLegend={handleLegend}
    />
  );
};

export default fetchChart<AreaProps>(Area);
