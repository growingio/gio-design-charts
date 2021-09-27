import React, { useMemo, useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import { ChartType, ChartProps, ColumnConfig } from '../interfaces';
import { columnChart, handleLegend } from './framework';
import { colors } from '../theme';
import { LegendLayout, ScrollXLayout } from '../layouts';
import { defaultGroupInterval, defaultInterval, hasDodge } from '../utils/interval';
import { fetchChart } from '../boundary';

export interface ColumnProps extends ChartProps {
  config: ColumnConfig;
  useScroll?: boolean;
}

const Column: React.FC<ColumnProps> = (props: ColumnProps) => {
  const { data, legends: legendProps = [], config, useScroll } = props;
  const [assginConfig, setAssignConfig] = useState({});

  useEffect(() => {
    const newConfig = config || {};
    const column = newConfig.column || {};

    // 分组柱状图的组内bar间距，可由dodgePadding控制，组间距为自由浮动
    // 默认的柱状图的bar间距，可由intervalPadding控制，若
    // 当两者都设定后，以intervalPadding为准
    const isGroup = hasDodge(column);
    const defaultConfig = isGroup ? defaultGroupInterval : defaultInterval;

    newConfig.column = { ...column, ...defaultConfig };
    newConfig.type = ChartType.COLUMN;

    setAssignConfig(Object.assign({}, newConfig));
  }, [config]);
  const defaultOptions = useMemo(() => {
    if (isEmpty(legendProps)) {
      return {
        defaultStyles: {
          color: colors[0],
        },
      };
    }
    return {};
  }, [legendProps]);

  return useScroll ? (
    <ScrollXLayout
      data={data}
      sourceData={data}
      legendList={legendProps}
      config={assginConfig}
      defaultOptions={defaultOptions}
      callChart={columnChart}
      handleLegend={handleLegend}
    />
  ) : (
    <LegendLayout
      data={data}
      legendList={legendProps}
      config={assginConfig}
      defaultOptions={defaultOptions}
      callChart={columnChart}
      handleLegend={handleLegend}
    />
  );
};

export default fetchChart<ColumnProps>(Column);
