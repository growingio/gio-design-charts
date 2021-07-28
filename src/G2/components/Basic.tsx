import React, { LegacyRef, useEffect } from "react";
import { Chart } from "@antv/g2";
import { useState } from "react";
import { useCallback } from "react";

import "../styles/default.css";
import Legends from "./common/Legends";
import getLegends, { useLegends } from "./hooks/getLegends";
import { IChartProps } from "../interface";
import InfoCard from "./common/InfoCard/InfoCard";

export interface IBasicProps extends IChartProps {
  callChart: any;
  handleLegend: any;
  type?: "bar" | "line";
}

const Basic = (props: IBasicProps) => {
  const {
    type,
    data,
    legends: legendProps = [],
    config = {},
    callChart,
    handleLegend,
  } = props;
  const root: LegacyRef<HTMLDivElement> = React.createRef();
  const tooltipRef: LegacyRef<HTMLDivElement> = React.createRef();
  const [chart, setChart] = useState<Chart>();
  const { legends, setLegends, updateLegends } = useLegends();
  const [hoverItem, setHoverItem] = useState([]);

  useEffect(() => {
    const genLegends = getLegends(type || "bar", legendProps);
    let tooltip = {} as any;
    if (tooltipRef.current) {
      tooltip = {
        container: tooltipRef.current,
        follow: true,
        shared: true,
        customItems: (items: any) => {
          setHoverItem(items);
          return items;
        },
      };
    }
    let renderChart: any;
    if (root.current) {
      renderChart = callChart(root.current, data, genLegends, {
        ...config,
        tooltip,
      });

      setLegends(genLegends);
      setChart(renderChart);
    }

    return () => {
      renderChart?.destroy();
    };
  }, [data, legendProps, config, type]);

  const onClickLegend = useCallback(
    (label: string) => {
      const newLegends = updateLegends(label);
      handleLegend(chart as Chart, newLegends, config);
    },
    [chart, legends, config]
  );

  return (
    <div className="legend">
      <Legends legends={legends} onClick={onClickLegend} />
      <div ref={root} />
      <div style={{ visibility: "collapse" }}>
        <div ref={tooltipRef} className="g2-tooltip">
          <InfoCard legends={legends} items={hoverItem} />
        </div>
      </div>
    </div>
  );
};

export default Basic;
