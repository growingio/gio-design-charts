import React, { useEffect, useState } from 'react';
import { funnelChart, handleLegend } from './framework';

import { ChartType, ChartProps } from '../interface';
import { ScrollXDirector } from '../directors';
import { getGroupData } from './utils';

const FunnelGroupChart: React.FC<ChartProps> = (props: ChartProps) => {
  const { data, legends: legendProps = [], config } = props;

  const [comparativeData, setComparativeData] = useState({});
  if (config) {
    config.type = ChartType.FUNNEL;
  }
  useEffect(() => {
    setComparativeData(getGroupData(data, config));
  }, [data, config]);

  return (
    <ScrollXDirector
      data={comparativeData}
      legendList={legendProps}
      config={config}
      sourceData={data}
      callChart={funnelChart}
      handleLegend={handleLegend}
    />
  );
};

export default FunnelGroupChart;
