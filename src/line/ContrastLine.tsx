import React, { useMemo } from 'react';
import { ContrastLine as LineCls } from './framework';

import { ChartType, LineConfig } from '../interfaces';
import { fetchChart } from '../boundary';
import { LegendLayout } from '../layouts';
import { LineProps } from './Line';

const ContrastLine: React.FC<LineProps> = (props: LineProps) => {
  const { data, legends: legendProps = [], config = {} as LineConfig, title } = props;

  config.type = ChartType.LINE;

  const line = useMemo(() => new LineCls(), []);

  return <LegendLayout title={title} data={data} legendList={legendProps} config={config} chart={line} />;
};

export default fetchChart<LineProps>(ContrastLine);
