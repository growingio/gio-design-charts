import React from 'react';
import { barChart, handleLegend } from '../../frameworks/barChart';

import { ChartType, ChartProps } from '../../interface';
import { DEAULT_CHART_HEIGHT } from '../../theme';
import { ScrollDirector } from '../directors';
import { calculate } from './barUtils';

const BarChart: React.FC<ChartProps> = (props: ChartProps) => {
  const { data, legends: legendProps = [], config = {} } = props;

  const frameHeight = config?.chart?.height || DEAULT_CHART_HEIGHT;
  config.type = ChartType.BAR;
  const chartHeight = calculate(config, data);
  config.chart = {
    ...(config.chart || {}),
    // 为了显示右侧文字数据
    appendPadding: frameHeight < chartHeight ? [0, 60, 0, 0] : [0, 50, 0, 0],
    height: chartHeight,
  };

  config.bar = {
    ...(config?.bar || {}),
    interval: {
      ...(config?.bar?.interval || {}),
      // intervalPadding: 20, // 防止高度不适应，导致的错乱的问题
      dodgePadding: 4,
      maxColumnWidth: 16,
      minColumnWidth: 16,
    },
  };

  return (
    <ScrollDirector
      data={data}
      legendList={legendProps}
      config={config}
      callChart={barChart}
      handleLegend={handleLegend}
      height={frameHeight}
    />
  );
};

export default BarChart;
