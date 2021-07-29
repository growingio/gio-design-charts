import React from "react";
import { barChart, handleLegend } from "../frameworks/barChart";

import "../styles/default.css";
import { IChartProps } from "../interface";
import Basic from "./Basic";

const BarChart = (props: IChartProps) => {
  const { data, legends: legendProps = [], config = {} } = props;
  return (
    <Basic
      type="bar"
      data={data}
      legends={legendProps}
      config={config}
      callChart={barChart}
      handleLegend={handleLegend}
    />
  );
};

export default BarChart;
