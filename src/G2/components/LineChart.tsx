import React from "react";
import { lineChart, handleLegend } from "../frameworks/lineChart";
import { IChartProps } from "../interface";

import "../styles/default.css";
import Basic from "./Basic";

const LineChart = (props: IChartProps) => {
  const { data, legends: legendProps = [], config } = props;

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
