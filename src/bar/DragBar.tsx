import React from 'react';
import { barChart, handleLegend } from './framework';

import { ChartType, BarConfig } from '../interfaces';
import { fetchChart } from '../boundary';
import { DragBarProps } from './Bar';
import { DragLayout } from '../layouts';

const DragBar: React.FC<DragBarProps> = (props: DragBarProps) => {
  const { data, legends: legendProps = [], config = {} as BarConfig, title, total } = props;

  config.type = ChartType.BAR;

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
      callChart={barChart}
      handleLegend={handleLegend}
      title={title}
      total={total}
    />
  );
};

export default fetchChart<DragBarProps>(DragBar);
