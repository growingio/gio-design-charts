import React, { useEffect, useState } from 'react';
import { comparativeFunnelChart, handleLegend } from '../../frameworks/funnelChart';

import { ChartType, IChartProps } from '../../interface';
import LegendDirector from '../base/LegendDirector';

const ComparativeFunnelChart: React.FC<IChartProps> = (props: IChartProps) => {
  const { data, legends: legendProps = [], config = {} } = props;

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
        covertData.push({ ...item, value: prev?.value || 0 });
        prev = item;
      }
    });
    setComparativeData({
      source: data,
      covert: covertData,
      texts,
    });
  }, [data]);

  return (
    <LegendDirector
      type={ChartType.BAR}
      data={comparativeData}
      legendList={legendProps}
      config={config}
      callChart={comparativeFunnelChart}
      handleLegend={handleLegend}
    />
  );
};

export default ComparativeFunnelChart;
