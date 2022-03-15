import React, { useMemo, useState } from 'react';
import { Bubble as BubbleCls } from './framework';
import { ChartType, ChartProps, BubbleConfig } from '../interfaces';

import { LegendLayout } from '../layouts';
import { fetchChart } from '../boundary';

export interface BubbleProps extends ChartProps {
  config: BubbleConfig;
}

const Bubble: React.FC<BubbleProps> = (props: BubbleProps) => {
  const { data, legends: legendProps = [], config, title } = props;

  const bubble = useMemo(() => new BubbleCls(), []);

  config.type = ChartType.BUBBLE;
  config.chart = { ...config?.chart, limitInPlot: true };

  return (
    <LegendLayout
      title={title}
      data={data}
      legendList={legendProps}
      config={config}
      callChart={bubble.render}
      handleLegend={bubble.legend}
    />
  );
};

export default fetchChart<BubbleProps>(Bubble);
