import React, { useMemo } from 'react';
import { Bubble as BubbleCls } from './framework';
import { ChartType, ChartProps, BubbleConfig, ChartRef } from '../interfaces';

import { LegendLayout } from '../layouts';
import { fetchChart } from '../boundary';

export interface BubbleProps extends ChartProps {
  config: BubbleConfig;
}

const Bubble: React.ForwardRefRenderFunction<ChartRef, BubbleProps> = (props, forwardRef) => {
  const { data, legends: legendProps = [], config, title } = props;
  const bubble = useMemo(() => new BubbleCls(), []);

  config.type = ChartType.BUBBLE;
  config.chart = { ...config?.chart, limitInPlot: true };

  return (
    <LegendLayout title={title} data={data} legendList={legendProps} config={config} chart={bubble} ref={forwardRef} />
  );
};

export default fetchChart<BubbleProps>(Bubble);
