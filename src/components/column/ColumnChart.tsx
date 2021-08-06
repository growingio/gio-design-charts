import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { columnChart, handleLegend } from '../../frameworks/columnChart';

import { ChartType, IChartProps } from '../../interface';
import Basic from '../base';
import { defaultGroupInterval, defaultInterval } from './settings';
import { hasDodge } from './utils';

const ColumnChart: React.FC<IChartProps> = (props: IChartProps) => {
  const { data, legends: legendProps = [], config = {} } = props;
  const [assginConfig, setAssignConfig] = useState(config);

  useEffect(() => {
    const column = config?.column || {};

    // 分组柱状图的组内bar间距，可由dodgePadding控制，组间距为自由浮动
    // 默认的柱状图的bar间距，可由intervalPadding控制，若
    // 当两者都设定后，以intervalPadding为准
    const isGroup = hasDodge(config.column);
    const defaultConfig = isGroup ? defaultGroupInterval : defaultInterval;

    config.column = { ...column, ...defaultConfig };

    setAssignConfig(Object.assign({}, config));
  }, [config]);
  return (
    <Basic
      type={ChartType.COLUMN}
      data={data}
      legends={legendProps}
      config={assginConfig}
      callChart={columnChart}
      handleLegend={handleLegend}
    />
  );
};

export default ColumnChart;
