import React, { LegacyRef, useEffect } from "react";
import { Chart } from "@antv/g2";
import { useState } from "react";
import { useCallback } from "react";
import { lineChart, handleLegend } from "../frameworks/lineChart";
import { IChartProps, ILegends } from "../interface";

import "../styles/default.css";
import Legends from "./common/Legends";
import getLegends, { useLegends } from "./hooks/getLegends";
import Basic from "./Basic";

const LineChart = (props: IChartProps) => {
  const { data, legends: legendProps = [], config } = props;
  // const root: LegacyRef<HTMLDivElement> = React.createRef();
  // const [chart, setChart] = useState<Chart>();
  // const { legends, setLegends, updateLegends } = useLegends();

  // useEffect(() => {
  //   const genLegends = getLegends(legendProps);
  //   const renderChart = lineChart(root.current, data, genLegends, config);
  //   setChart(renderChart);
  //   setLegends(genLegends);
  //   return () => {
  //     renderChart.destroy();
  //   };
  // }, [data, legendProps, config]);

  // const onClickLegend = useCallback(
  //   (label: string) => {
  //     const newLegends = updateLegends(label);
  //     handleLegend(chart as Chart, newLegends, config);
  //   },
  //   [chart, legends, config]
  // );

  // return (
  //   <div className="legend">
  //     <Legends legends={legends} onClick={onClickLegend} />
  //     <div ref={root} />
  //   </div>
  // );

  return (
    <Basic
      data={data}
      legends={legendProps}
      config={config}
      callChart={lineChart}
      handleLegend={handleLegend}
    />
  );
};

export default LineChart;
