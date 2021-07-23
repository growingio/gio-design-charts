import React, { LegacyRef, useEffect } from "react";
import { Chart } from "@antv/g2";
import { useState } from "react";
import { useCallback } from "react";
import { barChart, handleLegend } from "../frameworks/barChart";

import "../styles/default.css";
import Legends from "./common/Legends";
import getLegends, { useLegends } from "./hooks/getLegends";
import { IChartProps, ILegend } from "../interface";
import InfoCard from "./common/InfoCard/InfoCard";
import Basic from "./Basic";

const BarChart = (props: IChartProps) => {
  const { data, legends: legendProps = [], config = {} } = props;
  // const root: LegacyRef<HTMLDivElement> = React.createRef();
  // const tooltipRef: LegacyRef<HTMLDivElement> = React.createRef();
  // const [chart, setChart] = useState<Chart>();
  // const { legends, setLegends, updateLegends } = useLegends();

  // const [hoverItem, setHoverItem] = useState([]);

  // useEffect(() => {
  //   const genLegends = getLegends(legendProps);
  //   let tooltip = {} as any;
  //   if (tooltipRef.current) {
  //     tooltip = {
  //       container: tooltipRef.current,
  //       follow: true,
  //       shared: true,
  //       customItems: (items: any) => {
  //         setHoverItem(items);
  //         return items;
  //       },
  //     };
  //   }
  //   const renderChart = barChart(root.current, data, genLegends, {
  //     ...config,
  //     tooltip,
  //   });

  //   setLegends(genLegends);
  //   setChart(renderChart);

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
  //     {/* <div ref={tooltipRef}>csafasdfasdf ad as d as</div> */}
  //     <div ref={root} />
  //     <div style={{ visibility: "collapse" }}>
  //       <div ref={tooltipRef} className="g2-tooltip">
  //         <InfoCard
  //           legends={Object.values(legends) as ILegend[]}
  //           items={hoverItem}
  //         />
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <Basic
      data={data}
      legends={legendProps}
      config={config}
      callChart={barChart}
      handleLegend={handleLegend}
    />
  );
};

export default BarChart;
