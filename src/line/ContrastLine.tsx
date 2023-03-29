import React, { useMemo } from 'react';
import { ContrastLine as LineCls } from './framework';

import { ChartRef, ChartType, LineConfig } from '../interfaces';
import { fetchChart } from '../boundary';
import { LegendLayout } from '../layouts';
import { LineProps } from './Line';

const ContrastLine: React.ForwardRefRenderFunction<ChartRef, LineProps> = (props, forwardRef) => {
  const { data, legends: legendProps = [], config = {} as LineConfig, title } = props;

  config.type = ChartType.LINE;

  const line = useMemo(() => new LineCls(), []);

  return (
    <LegendLayout title={title} data={data} legendList={legendProps} config={config} chart={line} ref={forwardRef} />
  );
};

export default fetchChart<LineProps>(ContrastLine);
