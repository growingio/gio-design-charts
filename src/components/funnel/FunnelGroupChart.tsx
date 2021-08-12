import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useMemo } from 'react';
import { comparativeFunnelChart, handleLegend } from '../../frameworks/funnelChart';

import { ChartType, IChartProps } from '../../interface';
import { colors } from '../../theme';
import LegendDirector from '../base/LegendDirector';
import { getGroupData, getSingleData } from './utils';

const ComparativeFunnelChart: React.FC<IChartProps> = (props: IChartProps) => {
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
  }, [data]);
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

export default ComparativeFunnelChart;
