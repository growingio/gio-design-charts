import React from 'react';
import { barChart, handleLegend } from './framework';

import { ChartType, ChartProps, BarConfig } from '../interfaces';
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

const CombineBar: React.FC<BarProps> = (props: BarProps) => {
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
      dodgePadding: 4,
      maxColumnWidth: 16,
      minColumnWidth: 16,
    },
  };
  return (
    <LegendLayout
      title={title}
      data={data}
      legendList={legendProps}
      config={config}
      callChart={barChart}
      handleLegend={handleLegend}
    />
  );
};

export default fetchChart<BarProps>(CombineBar);
