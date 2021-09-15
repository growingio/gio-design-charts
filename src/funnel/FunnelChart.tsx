import { isEmpty } from 'lodash';
import React, { useMemo, useEffect, useState } from 'react';
import { funnelChart, handleLegend } from './framework';

import { ChartType, ChartProps } from '../interfaces';
import { colors } from '../theme';
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
      callChart={funnelChart}
      handleLegend={handleLegend}
    />
  );
};

export default FunnelChart;
