import { isEmpty } from 'lodash';
import React, { useMemo, useEffect, useState } from 'react';
import { ChartType, ChartProps, FunnelConfig } from '../interfaces';
import { funnelChart, handleLegend } from './framework';
import { colors } from '../theme';
import { ScrollXLayout } from '../layouts';
import { getSingleData } from './utils';
import { LooseObject } from '@antv/component';
import { fetchChart } from '../boundary';

export interface FunnelProps extends ChartProps {
  config: FunnelConfig;
}

const Funnel: React.FC<FunnelProps> = (props: FunnelProps) => {
  const { data, legends: legendProps = [], config, title } = props;
  const defaultOptions = useMemo(() => {
    if (isEmpty(legendProps)) {
      return {
        singleColor: colors[0],
        defaultStyles: {
          color: colors[0],
        },
      };
    }
    return { singleColor: colors[0] };
  }, [legendProps]);

  if (config) {
    config.type = ChartType.FUNNEL;
  }

  const [comparativeData, setComparativeData] = useState<LooseObject>({});
  useEffect(() => {
    setComparativeData(getSingleData(data, config));
  }, [data, config]);
  return (
    <ScrollXLayout
      title={title}
      data={comparativeData}
      legendList={legendProps}
      defaultOptions={defaultOptions}
      config={config}
      sourceData={data}
      callChart={funnelChart}
      handleLegend={handleLegend}
    />
  );
};

export default fetchChart<FunnelProps>(Funnel);
