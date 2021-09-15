import React from 'react';
import { areaChart, handleLegend } from './framework';
import { ChartType, ChartProps } from '../interfaces';

import { LegendLayout } from '../layouts';

const AreaChart: React.FC<ChartProps> = (props: ChartProps) => {
  const { data, legends: legendProps = [], config } = props;

  config.type = ChartType.AREA;
  return (
    <LegendLayout
      data={data}
      legendList={legendProps}
      config={config}
      callChart={areaChart}
      handleLegend={handleLegend}
    />
  );
};

export default AreaChart;
