import React, { useMemo } from 'react';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import { useEffect } from 'react';
import { columnChart, handleLegend } from '../../frameworks/columnChart';

import { ChartType, ChartProps } from '../../interface';
import { colors } from '../../theme';
import LegendDirector from '../base/LegendDirector';
import { defaultGroupInterval, defaultInterval } from './settings';
import { hasDodge } from './utils';

const ColumnChart: React.FC<ChartProps> = (props: ChartProps) => {
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

  config.type = ChartType.COLUMN;
  return (
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
