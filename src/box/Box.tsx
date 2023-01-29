import React, { useState, useMemo } from 'react';
import { Box as BoxCls } from './framework';
import { ChartType, ChartProps, BoxConfig } from '../interfaces';
import { ScrollXLayout } from '../layouts';
import { fetchChart } from '../boundary';
import { isEmpty } from 'lodash';
import { colors } from '../theme';
import { hasDodge } from '../utils/interval';

export interface BoxProps extends ChartProps {
  config: BoxConfig;
  size?: 'normal' | 'small';
}

const Box: React.FC<BoxProps> = (props: BoxProps) => {
  const { data, legends: legendProps = [], title, config, size = 'normal' } = props;
  const isDodge = useMemo(() => hasDodge(config?.['box']), [config]);

  const customSizeConfig = useMemo(
    () =>
      size === 'small'
        ? {
            intervalPadding: isDodge ? 30 : 12,
            dodgePadding: 16,
            columnWidth: 16,
            maxColumnWidth: 20,
            minColumnWidth: 16,
          }
        : {
            intervalPadding: isDodge ? 60 : 16,
            dodgePadding: 16,
            columnWidth: 16,
            maxColumnWidth: 60,
            minColumnWidth: 16,
          },
    [size, isDodge]
  );

  const [box] = useState(new BoxCls());
  config.type = ChartType.BOX;
  config.customSizeConfig = customSizeConfig;

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
            stroke:
              colors[legendProps.findIndex((l: any) => (l?.name ?? l) === (legend?.name ?? legend)) % colors.length],
            fill: colors[
              legendProps.findIndex((l: any) => (l?.name ?? l) === (legend?.name ?? legend)) % colors.length
            ],
            fillOpacity: 0.2,
          }),
          point: (legend: any) => ({
            lineWidth: 0,
            fill: colors[
              legendProps.findIndex((l: any) => (l?.name ?? l) === (legend?.name ?? legend)) % colors.length
            ],
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
      // callChart={box.render}
      // handleLegend={box.legend}
      chart={box}
    />
  );
};

export default fetchChart<BoxProps>(Box);
