import React, { LegacyRef, useEffect } from 'react';
import { Chart, View } from '@antv/g2';
import { useState } from 'react';
import { useCallback } from 'react';

import '../styles/default.css';
import Legends from '../components/Legends';
import getLegends, { useLegends } from './hooks/getLegends';
import { ChartType, IChartProps } from '../interface';
import InfoCard from '../components/InfoCard/InfoCard';

import * as styles from './styles/basic.module.less';

export interface IBasicProps extends IChartProps {
  callChart: any;
  handleLegend: any;
  type?: ChartType;
}

const Basic = (props: IBasicProps) => {
  const { type, data, legends: legendProps = [], config = {}, callChart, handleLegend } = props;
  const root: LegacyRef<HTMLDivElement> = React.createRef();
  const tooltipRef: LegacyRef<HTMLDivElement> = React.createRef();
  const [chart, setChart] = useState<Chart>();
  const [views, setViews] = useState<View[]>([]);
  const { legends, setLegends, updateLegends } = useLegends();
  const [hoverItem, setHoverItem] = useState([]);
  const [offset, setOffset] = useState({ width: 800, height: 300 });

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
        { id: root.current, data, legends: genLegends, hasDashed },
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

  // console.log(styles, styles.defaultTitle);
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
    <div className={styles.chart}>
      <Legends legends={legends} offsetWidth={offset.width} onClick={onClickLegend} />
      <div>
        <div>
          <div ref={root} onReset={onResize} />
          <div ref={tooltipRef} className="g2-tooltip">
            <InfoCard legends={legends} items={hoverItem} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basic;
