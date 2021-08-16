import React from 'react';
import { barChart, handleLegend } from '../../frameworks/barChart';

import { ChartType, IChartProps } from '../../interface';
import LegendDirector from '../base/LegendDirector';

const BarChart: React.FC<IChartProps> = (props: IChartProps) => {
  const { data, legends: legendProps = [], config = {} } = props;
  // const [fetchConfig, setFetchConfig] = useState(config);
  // useEffect(() => {
  //   // setFetchConfig({ ...config, axis: [false] });
  //   const [color, axisOption] = config.axis || [];
  //   if (axisOption) {
  //     axisOption.line = null;
  //   }
  //   setFetchConfig({ ...config, axis: ] });
  //   // const chartConfig = config?.chart || {};
  //   // setFetchConfig({ ...config, chart: { ...chartConfig, height: legendProps.length * 80 }, axis: [false] });
  // }, [config, legendProps]);
  config.type = ChartType.BAR;
  // console.log(fetchConfig);
  config.chart = {
    ...(config.chart || {}),
    appendPadding: [0, 50, 0, 0], // 上，右，下，左
  };
  config.bar = {
    ...(config.bar || {}),
    interval: {
      // intervalPadding: 20,
      dodgePadding: 4,
      maxColumnWidth: 16,
      minColumnWidth: 16,
    },
  };
  return (
    <LegendDirector
      // leftComponent={VerticalMenu}
      data={data}
      legendList={legendProps}
      config={config}
      callChart={barChart}
      handleLegend={handleLegend}
    />
  );
};

export default BarChart;
