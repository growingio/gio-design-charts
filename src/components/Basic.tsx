import React, { LegacyRef, useEffect } from "react";
import { Chart } from "@antv/g2";
import { useState } from "react";
import { useCallback } from "react";
import { throttle } from "lodash";

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
  const [offsetWidth, setOffsetWidth] = useState(800);

  // Init Chart
  useEffect(() => {
    const genLegends = getLegends(type || "bar", legendProps);
    let tooltip = config.tooltip || {};
    if (tooltipRef.current) {
      tooltip = {
        ...tooltip,
        container: tooltipRef.current,
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
      setOffsetWidth(root?.current?.offsetWidth || 800);
      setLegends(genLegends);
      setChart(renderChart);
    }
    return () => {
      renderChart?.destroy();
    };
  }, [data, legendProps, config, type]);

  const onResize = useCallback(() => {
    if (root?.current?.offsetWidth) {
      console.log(root?.current?.offsetWidth);
      setOffsetWidth(root?.current?.offsetWidth || 800);
    }
  }, [root]);

  // Listener resize
  useEffect(() => {
    if (root.current) {
      const observer = new MutationObserver(onResize);
      const targetNode = root?.current as HTMLElement;
      const targetConfig = { attributes: true, childList: true, subtree: true };
      observer.observe(targetNode, targetConfig);
      return () => {
        observer.disconnect();
      };
    }
  }, [root]);

  const onClickLegend = useCallback(
    (label: string) => {
      const newLegends = updateLegends(label);
      handleLegend(chart as Chart, newLegends, config);
    },
    [chart, legends, config]
  );

  return (
    <div className="legend">
      <Legends
        legends={legends}
        offsetWidth={offsetWidth}
        onClick={onClickLegend}
      />
      <div ref={root} onReset={onResize} />
      <div style={{ visibility: "collapse" }}>
        <div ref={tooltipRef} className="g2-tooltip">
          <InfoCard legends={legends} items={hoverItem} />
        </div>
      </div>
    </div>
  );
};

export default Basic;
