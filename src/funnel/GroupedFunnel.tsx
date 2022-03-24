import React, { useEffect, useMemo, useState } from 'react';
import { ChartType } from '../interfaces';
import { Funnel as FunnelCls } from './framework';
import { ScrollXLayout } from '../layouts';
import { getGroupData } from './utils';
import { fetchChart } from '../boundary';
import { FunnelProps } from './Funnel';

const GroupedFunnel: React.FC<FunnelProps> = (props: FunnelProps) => {
  const { data, legends: legendProps = [], config, title } = props;

  const funnel = useMemo(() => new FunnelCls(), []);

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
      callChart={funnel.render}
      handleLegend={funnel.legend}
    />
  );
};

export default fetchChart<FunnelProps>(GroupedFunnel);
