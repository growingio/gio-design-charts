import React, { LegacyRef, useEffect } from "react";
import { Chart, View } from "@antv/g2";
import { useState } from "react";
import { useCallback } from "react";

import "../styles/default.css";
import Legends from "../components/Legends";
import getLegends, { useLegends } from "./hooks/getLegends";
import { ChartType, IChartProps } from "../interface";
import InfoCard from "../components/InfoCard/InfoCard";

export interface IBasicProps extends IChartProps {
  callChart: any;
  handleLegend: any;
  type?: ChartType;
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
  const [views, setViews] = useState<View[]>([]);
  const { legends, setLegends, updateLegends } = useLegends();
  const [hoverItem, setHoverItem] = useState([]);
  const [offsetWidth, setOffsetWidth] = useState(800);

  // Init Chart
  useEffect(() => {
    const [genLegends, hasDashed] = getLegends(
      type || ChartType.BAR,
      legendProps
    );
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
    let existChart: any;
    if (root.current) {
      const { chart: renderChart, views: renderViews = [] } = callChart(
        { id: root.current, data, legends: genLegends, hasDashed },
        {
          ...config,
          tooltip,
        }
      );
      setOffsetWidth(root?.current?.offsetWidth || 800);
      setLegends(genLegends);
      setChart(renderChart);
      setViews(renderViews);
      existChart = renderChart;
    }
    return () => {
      existChart?.destroy();
    };
  }, [data, legendProps, config, type, callChart]);

  const onResize = useCallback(() => {
    if (root?.current?.offsetWidth) {
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
  }, [root, onResize]);

  const onClickLegend = useCallback(
    (label: string) => {
      const newLegends = updateLegends(label);
      handleLegend([chart, ...views], newLegends, config);
    },
    [chart, views, legends, config, handleLegend, updateLegends]
  );

  return (
    <div className="gio-chart-next">
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
