import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useMemo } from 'react';
import { comparativeFunnelChart, handleLegend } from '../../frameworks/funnelChart';

import { ChartType, ChartProps } from '../../interface';
import { colors } from '../../theme';
import { ScrollXDirector } from '../directors';
import { getSingleData } from './utils';

const FunnelChart: React.FC<ChartProps> = (props: ChartProps) => {
  const { data, legends: legendProps = [], config = {} } = props;
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
  config.type = ChartType.FUNNEL;

  const [comparativeData, setComparativeData] = useState({});
  useEffect(() => {
    setComparativeData(getSingleData(data));
  }, [data]);
  return (
    <ScrollXDirector
      data={comparativeData}
      legendList={legendProps}
      defaultOptions={defaultOptions}
      config={config}
      sourceData={data}
      callChart={comparativeFunnelChart}
      handleLegend={handleLegend}
    />
  );
};

export default FunnelChart;
