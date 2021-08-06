import React from 'react';
import { funnelChart, handleLegend } from '../../frameworks/funnelChart';

import { ChartType, IChartProps } from '../../interface';
import BasicChart from '../base';

const FunnelChart: React.FC<IChartProps> = (props: IChartProps) => {
  const { data, legends: legendProps = [], config = {} } = props;

  return (
    <BasicChart
      type={ChartType.BAR}
      data={data}
      legends={legendProps}
      config={config}
      callChart={funnelChart}
      handleLegend={handleLegend}
    />
  );
};

export default FunnelChart;
