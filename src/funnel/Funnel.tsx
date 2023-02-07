import { isEmpty, isObject } from 'lodash';
import React, { useMemo, useEffect, useState } from 'react';
import { ChartType, ChartProps, FunnelConfig } from '../interfaces';
import { Funnel as FunnelCls } from './framework';
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

  const funnel = useMemo(() => new FunnelCls(), []);

  const defaultOptions = useMemo(() => {
    if (isEmpty(legendProps)) {
      return {
        singleColor: colors[0],
        defaultStyles: {
          color: colors[0],
        },
      };
    } else if (legendProps?.length === 1 && isObject(legendProps[0])) {
      return { singleColor: legendProps[0]?.color || colors[0] };
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
      chart={funnel}
    />
  );
};

export default fetchChart<FunnelProps>(Funnel);
