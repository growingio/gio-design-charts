import React, { FunctionComponent, PropsWithChildren } from 'react';
import { lineChart, handleLegend } from './framework';
import { ChartType, ChartProps, LineConfig } from '../interfaces';

import { LegendLayout } from '../layouts';
import { fetchChart } from '../boundary';

export interface LineProps extends ChartProps {
  config: LineConfig;
}

const Line: React.FC<LineProps> = (props: LineProps) => {
  const { data, legends: legendProps = [], config } = props;

  config.type = ChartType.LINE;

  return (
    <LegendLayout
      data={data}
      legendList={legendProps}
      config={config}
      callChart={lineChart}
      handleLegend={handleLegend}
    />
  );
};

export default fetchChart<LineProps>(Line);
