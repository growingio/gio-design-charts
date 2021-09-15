import React from 'react';
import { barChart, handleLegend } from './framework';

import { ChartType, ChartProps } from '../interfaces';
import { ScrollYDirector } from '../layouts';

const ScrollBarChart: React.FC<ChartProps> = (props: ChartProps) => {
  const { data, legends: legendProps = [], config = {} } = props;

  config.type = ChartType.BAR;

  config.bar = {
    ...(config.bar || {}),
    interval: {
      ...(config.bar?.interval || {}),
      // intervalPadding: 20, // 防止高度不适应，导致的错乱的问题
      dodgePadding: 4,
      maxColumnWidth: 16,
      minColumnWidth: 16,
    },
  };

  return (
    <ScrollYDirector
      data={data}
      legendList={legendProps}
      config={config}
      callChart={barChart}
      handleLegend={handleLegend}
    />
  );
};

export default ScrollBarChart;
