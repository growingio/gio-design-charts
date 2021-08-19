import React, { useEffect, useState } from 'react';
import { comparativeFunnelChart, handleLegend } from '../../frameworks/funnelChart';

import { ChartType, ChartProps } from '../../interface';
import { LegendDirector } from '../directors';
import { getGroupData } from './utils';

const FunnelGroupChart: React.FC<ChartProps> = (props: ChartProps) => {
  const { data, legends: legendProps = [], config = {} } = props;
  //   const defaultOptions = useMemo(() => {
  //     if (isEmpty(legendProps)) {
  //       return {
  //         defaultStyles: {
  //           color: colors[0],
  //         },
  //       };
  //     }
  //     return {};
  //   }, [legendProps]);

  const [comparativeData, setComparativeData] = useState({});

  useEffect(() => {
    setComparativeData(getGroupData(data, config));
  }, [data, config]);
  config.type = ChartType.FUNNEL;

  return (
    <LegendDirector
      data={comparativeData}
      legendList={legendProps}
      //   defaultOptions={defaultOptions}
      config={config}
      callChart={comparativeFunnelChart}
      handleLegend={handleLegend}
    />
  );
};

export default FunnelGroupChart;
