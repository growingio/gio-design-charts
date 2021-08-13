// import Base from '@antv/g2/lib/base';
import React from 'react';
import { areaChart, handleLegend } from '../../frameworks/areaChart';
import { ChartType, IChartProps } from '../../interface';
// import { BaseChart } from '../base';

import LegendDirector from '../base/LegendDirector';

const AreaChart: React.FC<IChartProps> = (props: IChartProps) => {
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
