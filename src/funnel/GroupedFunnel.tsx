import React, { useEffect, useState } from 'react';
import { ChartType } from '../interfaces';
import { funnelChart, handleLegend } from './framework';
import { ScrollXLayout } from '../layouts';
import { getGroupData } from './utils';
import { fetchChart } from '../boundary';
import { FunnelProps } from './Funnel';

const GroupedFunnel: React.FC<FunnelProps> = (props: FunnelProps) => {
  const { data, legends: legendProps = [], config, title } = props;

  const [comparativeData, setComparativeData] = useState({});
  if (config) {
    config.type = ChartType.FUNNEL;
  }
  useEffect(() => {
    setComparativeData(getGroupData(data, config));
  }, [data, config]);

  return (
    <ScrollXLayout
      title={title}
      data={comparativeData}
      legendList={legendProps}
      config={config}
      sourceData={data}
      callChart={funnelChart}
      handleLegend={handleLegend}
    />
  );
};

export default fetchChart<FunnelProps>(GroupedFunnel);
