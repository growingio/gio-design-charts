import React from 'react';
import { funnelChart, handleLegend } from '../../frameworks/funnelChart';

import { ChartType, IChartProps } from '../../interface';
import LegendDirector from '../base/LegendDirector';

const FunnelChart: React.FC<IChartProps> = (props: IChartProps) => {
  const { data, legends: legendProps = [], config = {} } = props;

  return (
    <LegendDirector
      type={ChartType.BAR}
      data={data}
      legendList={legendProps}
      config={config}
      callChart={funnelChart}
      handleLegend={handleLegend}
    />
  );
};

export default FunnelChart;
