import React, { useEffect, useMemo, useState } from 'react';
import { ChartRef, ChartType } from '../interfaces';
import { Funnel as FunnelCls } from './framework';
import { ScrollXLayout } from '../layouts';
import { getGroupData } from './utils';
import { fetchChart } from '../boundary';
import { FunnelProps } from './Funnel';

const GroupedFunnel: React.ForwardRefRenderFunction<ChartRef, FunnelProps> = (props, forwardRef) => {
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
      ref={forwardRef}
      title={title}
      data={comparativeData}
      legendList={legendProps}
      config={config}
      sourceData={data}
      chart={funnel}
    />
  );
};

export default fetchChart<FunnelProps>(GroupedFunnel);
