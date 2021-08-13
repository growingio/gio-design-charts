import React, { LegacyRef, useEffect } from 'react';
import { Chart, View } from '@antv/g2';
import { useState } from 'react';
import { useCallback } from 'react';

import Legends from '../../common/Legends';
import useLegends, { getLegends } from '../hooks/useLegends';
import { ChartType, IChartProps, IReportThing } from '../../interface';
import { InfoCardBox } from '../../common/InfoCard';

export interface IBasicProps extends IChartProps {
  callChart: any;
  handleLegend: any;
  type?: ChartType;
  leftComponent?: React.FC<any>;
}

const Basic = (props: IBasicProps) => {
  const {
    type,
    data,
    legends: legendProps = [],
    config = {},
    callChart,
    handleLegend,
    leftComponent: LeftComponent,
  } = props;
  const root: LegacyRef<HTMLDivElement> = React.createRef();
  const tooltipRef: LegacyRef<HTMLDivElement> = React.createRef();
  const [chart, setChart] = useState<Chart>();
  const [views, setViews] = useState<View[]>([]);
  const { legends, setLegends, updateLegends } = useLegends();
  const [hoverItem, setHoverItem] = useState([]);
  const [offset, setOffset] = useState({ width: 800, height: 300 });

  // define report thing objects
  // const [elements, setElements] = useState([] as Element[]);
  // const [scale, setScale] = useState({} as Scale);
  const [reportThing, setReportThing] = useState({});

  const defineReporter = useCallback((thing: IReportThing) => {
    setReportThing(thing);
  }, []);

  // Init Chart
  useEffect(() => {
    const [genLegends, hasDashed] = getLegends(type || ChartType.BAR, legendProps);
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
        { id: root.current, data, legends: genLegends, hasDashed, reporter: defineReporter },
        {
          ...config,
          tooltip,
        }
      );
      setOffset({ width: root?.current?.offsetWidth || 800, height: root?.current?.offsetHeight });
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
      setOffset({ width: root?.current?.offsetWidth || 800, height: root?.current?.offsetHeight });
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

  const width = 100;

  return (
    <div className="gio-d-chart">
      <Legends legends={legends} offsetWidth={offset.width} onClick={onClickLegend} />
      <div className="gio-d-chart_main">
        {LeftComponent && (
          <div className="gio-d-chart_left" style={{ height: offset.height, width }}>
            <LeftComponent height={offset.height} width={width} {...reportThing} />
          </div>
        )}
        <div className="gio-d-chart_right">
          <div ref={root} onReset={onResize} />
          <div className="gio-d-chart_tooltip-content">
            <div ref={tooltipRef} className="g2-tooltip">
              <InfoCardBox legends={legends} triggerItems={hoverItem} config={config} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basic;
