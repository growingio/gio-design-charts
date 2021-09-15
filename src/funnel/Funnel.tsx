import { isEmpty } from 'lodash';
import React, { useMemo, useEffect, useState } from 'react';
import { ChartType, ChartProps } from '../interfaces';
import { funnelChart, handleLegend } from './framework';
import { colors } from '../theme';
import { ScrollXLayout } from '../layouts';
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

export default FunnelChart;
