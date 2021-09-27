import React from 'react';
import { barChart, handleLegend } from './framework';

import { ChartType, BarConfig } from '../interfaces';
import { ScrollYLayout } from '../layouts';
import { fetchChart } from '../boundary';
import { BarProps } from './Bar';

const ScrollBar: React.FC<BarProps> = (props: BarProps) => {
  const { data, legends: legendProps = [], config = {} as BarConfig } = props;

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
    <ScrollYLayout
      data={data}
      legendList={legendProps}
      config={config}
      callChart={barChart}
      handleLegend={handleLegend}
    />
  );
};

export default fetchChart<BarProps>(ScrollBar);
