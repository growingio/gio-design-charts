import React, { useMemo } from 'react';
import { Bar as BarCls } from './framework';

import { ChartType, BarConfig, ChartRef } from '../interfaces';
import { fetchChart } from '../boundary';
import { DragBarProps } from './Bar';
import { DragLayout } from '../layouts';

const DragBar: React.ForwardRefRenderFunction<ChartRef, DragBarProps> = (props, forwardRef) => {
  const { data, legends: legendProps = [], config = {} as BarConfig, title, content, fullHeight } = props;

  config.type = ChartType.BAR;
  config.chart = {
    ...(config.chart || {}),
    appendPadding: [0, 60, 0, 0], // 为了显示右侧文字数据
  };

  const bar = useMemo(() => new BarCls(), []);

  config.bar = {
    ...(config.bar || {}),
    interval: {
      ...(config.bar?.interval || {}),
      dodgePadding: 4,
      maxColumnWidth: 16,
      minColumnWidth: 16,
    },
  };

  return (
    <DragLayout
      data={data}
      legendList={legendProps}
      config={config}
      chart={bar}
      title={title}
      content={content}
      fullHeight={fullHeight}
      ref={forwardRef}
    />
  );
};

export default fetchChart<DragBarProps>(DragBar);
