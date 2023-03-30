import React, { useState } from 'react';
import { Line as LineCls } from './framework';
import { ChartType, ChartProps, LineConfig, ChartRef } from '../interfaces';

import { LegendLayout } from '../layouts';
import { fetchChart } from '../boundary';

export interface LineProps extends ChartProps {
  config: LineConfig;
}

const Line: React.ForwardRefRenderFunction<ChartRef, LineProps> = (props: LineProps, forwardRef) => {
  const { data, legends: legendProps = [], config, title } = props;

  config.type = ChartType.LINE;
  const [line] = useState(new LineCls());

  return (
    <LegendLayout title={title} data={data} legendList={legendProps} config={config} chart={line} ref={forwardRef} />
  );
};

export default fetchChart<LineProps>(Line);
