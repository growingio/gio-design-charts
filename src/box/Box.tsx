import React, { useState, useMemo } from 'react';
import { Box as BoxCls } from './framework';
import { ChartType, ChartProps, BoxConfig } from '../interfaces';
import { LegendLayout, ScrollXLayout } from '../layouts';
import { fetchChart } from '../boundary';
import { isEmpty } from 'lodash';
import { colors } from '../theme';

export interface BoxProps extends ChartProps {
  config: BoxConfig;
}

const Box: React.FC<BoxProps> = (props: BoxProps) => {
  const { data, legends: legendProps = [], title, config } = props;
  const [box] = useState(new BoxCls());
  config.type = ChartType.BOX;

  const defaultOptions = useMemo(() => {
    if (!legendProps || isEmpty(legendProps)) {
      return {
        defaultStyles: {
          box: () => ({
            color: colors[0],
            fill: colors[0],
            stroke: colors[0],
            fillOpacity: 0.2,
          }),
          point: () => ({
            lineWidth: 0,
            fill: colors[0],
          }),
        },
      };
    } else {
      return {
        defaultStyles: {
          box: (legend: any) => ({
            stroke: colors[legendProps.findIndex((l) => l === (legend?.name ?? legend)) % colors.length],
            fill: colors[legendProps.findIndex((l) => l === (legend?.name ?? legend)) % colors.length],
            fillOpacity: 0.2,
          }),
          point: (legend: any) => ({
            lineWidth: 0,
            fill: colors[legendProps.findIndex((l) => l === (legend?.name ?? legend)) % colors.length],
          }),
        },
      };
    }
  }, [legendProps]);

  return (
    <ScrollXLayout
      title={title}
      data={data}
      sourceData={data}
      defaultOptions={defaultOptions}
      legendList={legendProps}
      config={config}
      callChart={box.render}
      handleLegend={box.legend}
    />
  );
};

export default fetchChart<BoxProps>(Box);
