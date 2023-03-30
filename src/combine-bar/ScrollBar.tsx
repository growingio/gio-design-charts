import React from 'react';
// import { barChart, handleLegend } from './framework';

import { ChartType, BarConfig, ChartRef } from '../interfaces';
import { ScrollYLayout } from '../layouts';
import { fetchChart } from '../boundary';
import { BarProps } from './CombineBar';
import CombineBar from './framework';

const ScrollBar: React.ForwardRefRenderFunction<ChartRef, BarProps> = (props, forwardRef) => {
  const { data, legends: legendProps = [], config = {} as BarConfig, title } = props;
  const combineBar = new CombineBar();

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
      ref={forwardRef}
      title={title}
      data={data}
      legendList={legendProps}
      config={config}
      // callChart={barChart}
      // handleLegend={handleLegend}
      chart={combineBar}
    />
  );
};

export default fetchChart<BarProps>(ScrollBar);
