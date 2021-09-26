import React, { FunctionComponent, PropsWithChildren } from 'react';
import { barChart, handleLegend } from './framework';

import { ChartType, ChartProps } from '../interfaces';
import { LegendLayout } from '../layouts';
import { fetchChart } from '../boundary';
import { BarConfig } from '..';

export interface BarProps extends ChartProps {
  config: BarConfig;
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

export default fetchChart(Bar as FunctionComponent<PropsWithChildren<ChartProps>>) as FunctionComponent<BarProps>;
