import React from 'react';
import { Line as LineCls } from './framework';
import { ChartType, ChartProps, LineConfig } from '../interfaces';

import { LegendLayout } from '../layouts';
import { fetchChart } from '../boundary';

export interface LineProps extends ChartProps {
  config: LineConfig;
}

const Line: React.FC<LineProps> = (props: LineProps) => {
  const { data, legends: legendProps = [], config } = props;

  config.type = ChartType.LINE;
  const line = new LineCls();

  return (
    <LegendLayout
      data={data}
      legendList={legendProps}
      config={config}
      callChart={line.render}
      handleLegend={line.legend}
    />
  );
};

export default fetchChart<LineProps>(Line);
