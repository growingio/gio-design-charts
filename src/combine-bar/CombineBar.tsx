import React, { useMemo } from 'react';
import { default as CombineBarCls } from './framework';

import { ChartType, ChartProps, BarConfig, ChartRef } from '../interfaces';
import { LegendLayout } from '../layouts';
import { fetchChart } from '../boundary';

export interface BarProps extends ChartProps {
  config: BarConfig;
}

export interface ContentMenu {
  // 在多维度拆分的拖拽条形图，需要设置总的title
  title?: string;
  // 在多维度拆分的拖拽条形图，需要设置总的counter
  total?: number;
}

export interface DragBarProps extends BarProps {
  content?: ContentMenu;
  fullHeight?: boolean;
}

const CombineBar: React.ForwardRefRenderFunction<ChartRef, BarProps> = (props, forwardRef) => {
  const { data, legends: legendProps = [], config = {} as BarConfig, title } = props;

  const combineBar = useMemo(() => {
    return new CombineBarCls();
  }, []);

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
      dodgePadding: 4,
      maxColumnWidth: 16,
      minColumnWidth: 16,
    },
  };
  return (
    <LegendLayout
      ref={forwardRef}
      title={title}
      data={data}
      legendList={legendProps}
      config={config}
      // callChart={barChart}
      chart={combineBar}
      // handleLegend={handleLegend}
    />
  );
};

export default fetchChart<BarProps>(CombineBar);
