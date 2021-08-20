import React, { useEffect, useState } from 'react';
import { comparativeFunnelChart, handleLegend } from '../../frameworks/funnelChart';

import { ChartType, ChartProps } from '../../interface';
import { calculateColumnWidth } from '../../utils/calculate';
import { ScrollXDirector } from '../directors';
import { getGroupData } from './utils';

const FunnelGroupChart: React.FC<ChartProps> = (props: ChartProps) => {
  const { data, legends: legendProps = [], config = {} } = props;

  const [comparativeData, setComparativeData] = useState({});
  config.type = ChartType.FUNNEL;
  const chartWidth = calculateColumnWidth(config, data);

  useEffect(() => {
    setComparativeData(getGroupData(data, config));
  }, [data, config]);

  return (
    <ScrollXDirector
      width={chartWidth}
      data={comparativeData}
      legendList={legendProps}
      config={config}
      callChart={comparativeFunnelChart}
      handleLegend={handleLegend}
    />
  );
};

export default FunnelGroupChart;
