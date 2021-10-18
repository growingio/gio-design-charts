import React from 'react';
import { barChart, handleLegend } from './framework';

import { ChartType, ChartProps, BarConfig } from '../interfaces';
import { LegendLayout } from '../layouts';
import { fetchChart } from '../boundary';

export interface BarProps extends ChartProps {
  config: BarConfig;
}

export interface DragBarProps extends BarProps {
  // 在多维度拆分的拖拽条形图，需要设置总的title
  title?: string;
  // 在多维度拆分的拖拽条形图，需要设置总的counter
  total?: number;
}

const Bar: React.FC<BarProps> = (props: BarProps) => {
  const { data, legends: legendProps = [], config = {} as BarConfig } = props;

  config.type = ChartType.BAR;
  config.chart = {
    ...(config.chart || {}),
    appendPadding: [0, 50, 0, 0], // 为了显示右侧文字数据
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
      // leftComponent={VerticalMenu}
      data={data}
      legendList={legendProps}
      config={config}
      callChart={barChart}
      handleLegend={handleLegend}
    />
  );
};

export default fetchChart<BarProps>(Bar);
