import React, { useState } from 'react';
import { Line as LineCls } from './framework';

import { ChartType, LineConfig } from '../interfaces';
import { fetchChart } from '../boundary';
import { LegendLayout } from '../layouts';
import { LineProps } from './Line';

const ContrastLine: React.FC<LineProps> = (props: LineProps) => {
  const { data, legends: legendProps = [], config = {} as LineConfig, title } = props;

  config.type = ChartType.LINE;

  const [line] = useState(new LineCls());

  return (
    <LegendLayout
      title={title}
      data={data}
      legendList={legendProps}
      config={config}
      callChart={line.contrast}
      handleLegend={line.legend}
    />
  );
};

export default fetchChart<LineProps>(ContrastLine);
