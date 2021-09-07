import React from 'react';
import { areaChart, handleLegend } from '../../frameworks/areaChart';
import { ChartType, ChartProps } from '../../interface';

import { LegendDirector } from '../directors';

const AreaChart: React.FC<ChartProps> = (props: ChartProps) => {
  const { data, legends: legendProps = [], config } = props;

  config.type = ChartType.AREA;
  return (
    <LegendDirector
      data={data}
      legendList={legendProps}
      config={config}
      callChart={areaChart}
      handleLegend={handleLegend}
    />
  );
};

export default AreaChart;