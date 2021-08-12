import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useMemo } from 'react';
import { comparativeFunnelChart, handleLegend } from '../../frameworks/funnelChart';

import { ChartType, IChartProps } from '../../interface';
import { colors } from '../../theme';
import LegendDirector from '../base/LegendDirector';

const ComparativeFunnelChart: React.FC<IChartProps> = (props: IChartProps) => {
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

  const [comparativeData, setComparativeData] = useState({});
  useEffect(() => {
    const covertData = [] as any[];
    const texts = [] as string[];
    let prev = {} as any;
    data.map((item: any, index: number) => {
      if (index === 0) {
        covertData.push({ ...item });
        prev = item;
      } else if (item?.isPlaceholder) {
        covertData.push({ ...item });
      } else {
        texts.push(`${((item?.value / prev?.value || 0) * 100).toFixed(2)}%`);
        covertData.push({ ...item, value: prev?.value || 0, prev: prev });
        prev = item;
      }
    });
    setComparativeData({
      source: data,
      covert: covertData,
      texts,
    });
  }, [data]);
  config.type = ChartType.FUNNEL;
  return (
    <LegendDirector
      data={comparativeData}
      legendList={legendProps}
      defaultOptions={defaultOptions}
      config={config}
      callChart={comparativeFunnelChart}
      handleLegend={handleLegend}
    />
  );
};

export default ComparativeFunnelChart;
