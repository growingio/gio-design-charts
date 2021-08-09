// import Base from '@antv/g2/lib/base';
import React from 'react';
import { lineChart, handleLegend } from '../../frameworks/lineChart';
import { ChartType, IChartProps } from '../../interface';
// import { BaseChart } from '../base';

import LegendDirector from '../base/LegendDirector';

const LineChart: React.FC<IChartProps> = (props: IChartProps) => {
  const { data, legends: legendProps = [], config } = props;

  return (
    <LegendDirector
      type={ChartType.LINE}
      data={data}
      legendList={legendProps}
      config={config}
      callChart={lineChart}
      handleLegend={handleLegend}
    />
  );
};

export default LineChart;
