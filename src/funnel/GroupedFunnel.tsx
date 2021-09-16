import React, { useEffect, useState } from 'react';
import { ChartType, ChartProps } from '../interfaces';
import { funnelChart, handleLegend } from './framework';
import { ScrollXLayout } from '../layouts';
import { getGroupData } from './utils';

const GroupedFunnel: React.FC<ChartProps> = (props: ChartProps) => {
  const { data, legends: legendProps = [], config } = props;

  const [comparativeData, setComparativeData] = useState({});
  if (config) {
    config.type = ChartType.FUNNEL;
  }
  useEffect(() => {
    setComparativeData(getGroupData(data, config));
  }, [data, config]);

  return (
    <ScrollXLayout
      data={comparativeData}
      legendList={legendProps}
      config={config}
      sourceData={data}
      callChart={funnelChart}
      handleLegend={handleLegend}
    />
  );
};

export default GroupedFunnel;
