import React from 'react';
import { lineChart, handleLegend } from './framework';
import { ChartType, ChartProps } from '../interfaces';

import { LegendLayout } from '../layouts';
import { fetchChart } from '../boundary';

const Line: React.FC<ChartProps> = (props: ChartProps) => {
  const { data, legends: legendProps = [], config } = props;

  config.type = ChartType.LINE;

  return (
    <LegendLayout
      data={data}
      legendList={legendProps}
      config={config}
      callChart={lineChart}
      handleLegend={handleLegend}
    />
  );
};

export default fetchChart(Line);
