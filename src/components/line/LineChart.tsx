// import Base from '@antv/g2/lib/base';
import React from 'react';
import { lineChart, handleLegend } from '../../frameworks/lineChart';
import { ChartType, ChartProps } from '../../interface';
// import { BaseChart } from '../base';

import LegendDirector from '../base/LegendDirector';

const LineChart: React.FC<ChartProps> = (props: ChartProps) => {
  const { data, legends: legendProps = [], config } = props;

  config.type = ChartType.LINE;

  return (
    <LegendDirector
      data={data}
      legendList={legendProps}
      config={config}
      callChart={lineChart}
      handleLegend={handleLegend}
    />
  );
};

export default LineChart;
