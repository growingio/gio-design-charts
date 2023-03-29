import React, { useMemo } from 'react';
import { Bar as BarCls } from './framework';

import { ChartType, BarConfig, ChartRef } from '../interfaces';
import { ScrollYLayout } from '../layouts';
import { fetchChart } from '../boundary';
import { BarProps } from './Bar';

const ScrollBar: React.ForwardRefRenderFunction<ChartRef, BarProps> = (props, forwardRef) => {
  const { data, legends: legendProps = [], config = {} as BarConfig, title } = props;

  config.type = ChartType.BAR;

  const bar = useMemo(() => new BarCls(), []);

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
    <ScrollYLayout title={title} data={data} legendList={legendProps} config={config} chart={bar} ref={forwardRef} />
  );
};

export default fetchChart<BarProps>(ScrollBar);
