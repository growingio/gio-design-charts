import React from 'react';
import { barChart, handleLegend } from './framework';

import { ChartType, BarConfig } from '../interfaces';
import { ScrollYLayout } from '../layouts';
import { fetchChart } from '../boundary';
import { BarProps } from './Bar';

const ScrollBar: React.FC<BarProps> = (props: BarProps) => {
  const { data, legends: legendProps = [], config = {} as BarConfig, title } = props;

  config.type = ChartType.BAR;

  config.chart = {
    ...(config.chart || {}),
    appendPadding: [0, 60, 0, 0], // 为了显示右侧文字数据
  };

  config.bar = {
    ...(config.bar || {}),
    interval: {
      ...(config.bar?.interval || {}),
      // intervalPadding: 20, // 防止高度不适应，导致的错乱的问题
      dodgePadding: 8,
      maxColumnWidth: 16,
      minColumnWidth: 16,
    },
  };

  return (
    <ScrollYLayout
      title={title}
      data={data}
      legendList={legendProps}
      config={config}
      callChart={barChart}
      handleLegend={handleLegend}
    />
  );
};

export default fetchChart<BarProps>(ScrollBar);
