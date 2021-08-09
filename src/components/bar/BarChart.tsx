import React from 'react';
import { barChart, handleLegend } from '../../frameworks/barChart';

import { ChartType, IChartProps } from '../../interface';
import { useEffect } from 'react';
import { useState } from 'react';
import LegendDirector from '../base/LegendDirector';

const BarChart: React.FC<IChartProps> = (props: IChartProps) => {
  const { data, legends: legendProps = [], config = {} } = props;
  const [fetchConfig, setFetchConfig] = useState(config);
  useEffect(() => {
    // setFetchConfig({ ...config, axis: [false] });
    const [color, axisOption] = config.axis || [];
    if (axisOption) {
      axisOption.line = null;
    }
    // setFetchConfig({ ...config, axis: ['type', { line: null, subTickLine: null }] });
    // const chartConfig = config?.chart || {};
    // setFetchConfig({ ...config, chart: { ...chartConfig, height: legendProps.length * 80 }, axis: [false] });
  }, [config, legendProps]);
  return (
    <LegendDirector
      // leftComponent={VerticalMenu}
      type={ChartType.BAR}
      data={data}
      legendList={legendProps}
      config={fetchConfig}
      callChart={barChart}
      handleLegend={handleLegend}
    />
  );
};

export default BarChart;
