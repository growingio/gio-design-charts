import React from 'react';
import { barChart, handleLegend } from '../frameworks/barChart';

import '../styles/default.css';
import { ChartType, IChartProps } from '../interface';
import Basic from './Basic';
import { useEffect } from 'react';
import { useState } from 'react';

const BarChart = (props: IChartProps) => {
  const { data, legends: legendProps = [], config = {} } = props;
  const [fetchConfig, setFetchConfig] = useState(config);
  useEffect(() => {
    // setFetchConfig({ ...config, axis: [false] });
    const [color, axisOption] = config.axis || [];
    if (axisOption) {
      axisOption.line = null;
    }
    setFetchConfig({ ...config, axis: ['type', { line: null, subTickLine: null }] });
  }, [config]);
  console.log(fetchConfig);
  return (
    <Basic
      type={ChartType.BAR}
      data={data}
      legends={legendProps}
      config={fetchConfig}
      callChart={barChart}
      handleLegend={handleLegend}
    />
  );
};

export default BarChart;
