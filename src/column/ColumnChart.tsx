import React, { useMemo, useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import { columnChart, handleLegend } from '../frameworks/columnChart';

import { ChartType, ChartProps } from '../interface';
import { colors } from '../theme';
import { LegendDirector, ScrollXDirector } from '../directors';
import { defaultGroupInterval, defaultInterval, hasDodge } from '../utils/interval';

export interface ColumnChartProps extends ChartProps {
  useScroll?: boolean;
}

const ColumnChart: React.FC<ColumnChartProps> = (props: ColumnChartProps) => {
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
    <ScrollXDirector
      data={data}
      sourceData={data}
      legendList={legendProps}
      config={assginConfig}
      defaultOptions={defaultOptions}
      callChart={columnChart}
      handleLegend={handleLegend}
    />
  ) : (
    <LegendDirector
      data={data}
      legendList={legendProps}
      config={assginConfig}
      defaultOptions={defaultOptions}
      callChart={columnChart}
      handleLegend={handleLegend}
    />
  );
};

export default ColumnChart;
