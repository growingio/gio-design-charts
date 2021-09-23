import { isEmpty } from 'lodash';
import React, { useMemo, useEffect, useState } from 'react';
import { ChartType, ChartProps } from '../interfaces';
import { funnelChart, handleLegend } from './framework';
import { colors } from '../theme';
import { ScrollXLayout } from '../layouts';
import { getSingleData } from './utils';
import { LooseObject } from '@antv/component';

const Funnel: React.FC<ChartProps> = (props: ChartProps) => {
  const { data, legends: legendProps = [], config } = props;
  const defaultOptions = useMemo(() => {
    if (isEmpty(legendProps)) {
      return {
        defaultStyles: {
          color: colors[0],
        },
      };
    }
    return {};
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

export default Funnel;
