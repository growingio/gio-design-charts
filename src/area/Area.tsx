import React, { useMemo } from 'react';
import { Area as AreaCls } from './framework';
import { ChartType, ChartProps, AreaConfig } from '../interfaces';

import { LegendLayout } from '../layouts';
import { fetchChart } from '../boundary';

export interface AreaProps extends ChartProps {
  config: AreaConfig;
}

const Area: React.FC<AreaProps> = (props: AreaProps) => {
  const { data, legends: legendProps = [], title, config } = props;

  const area = useMemo(() => new AreaCls(), []);

  config.type = ChartType.AREA;
  return (
    <LegendLayout
      title={title}
      data={data}
      legendList={legendProps}
      config={config}
      callChart={area.render}
      handleLegend={area.handleLegend}
    />
  );
};

export default fetchChart<AreaProps>(Area);
