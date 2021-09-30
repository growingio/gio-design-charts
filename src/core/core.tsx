import React, { LegacyRef, useEffect, useState, useCallback, RefObject, useMemo } from 'react';
import { InfoCardBox } from '../info-card';
import { ChartConfig, ChartOptions, Legend, ReportThing, Legends } from '../interfaces';
import useLegends, { getLegends } from '../hooks/useLegends';
import useInterceptors from '../hooks/useInterceptors';
import useTunnel from '../hooks/useTunnel';

import { Chart, View } from '@antv/g2';
import { TooltipItem } from '@antv/g2/lib/interface';
import { LooseObject } from '@antv/component';
import './styles/base.less';

export interface LayoutProps {
  options: ChartOptions;
  config?: ChartConfig;
  children: JSX.Element | JSX.Element[];
  width?: number;
  charts?: (Chart | View)[];
  onClickLegend?: (label: string) => void;
}

export interface ChartCanvasProps {
  // type: ChartType;
  callChart: (options: ChartOptions, config: ChartConfig) => { chart?: Chart; views?: View[] };
  legendList: (string | Legend)[];
  handleLegend: <T extends ChartConfig>(charts: (Chart | View)[], legends: Legends, config: T) => void;
  config: ChartConfig;
  defaultOptions?: ChartOptions;
  data: LooseObject | LooseObject[];
  width?: number;
}

// In core, we only force on render chart and provide basic chart options
const core = (HighComponent: React.FC<LayoutProps>) => {
  return (props: ChartCanvasProps) => {
    const { config, callChart, data, legendList, handleLegend, defaultOptions = {}, width } = props;
    const root: RefObject<HTMLDivElement> = React.createRef();
    const tooltipRef: LegacyRef<HTMLDivElement> = React.createRef();
    const [register, acceptor] = useTunnel();

    const { legends, setLegends, updateLegends } = useLegends();

    const { charts, getTriggerAction, interceptors } = useInterceptors();
    const [hasDashed, setDashed] = useState(false);

    const defineReporter = useCallback((thing: ReportThing) => {
      // do stome report thing in here
    }, []);

    const chartOptions = useMemo(
      () => ({
        ...defaultOptions,
        charts,
        legends,
        hasDashed,
      }),
      [defaultOptions, charts, legends, hasDashed]
    );

    // Init Chart
    // 1. In init Chart, it should be no updated in here when legends are updated by click
    //    whether we need legends to render chart
    // 2. the config: ChartConfig will be not updated in working.
    //    but the options: ChartOptions is always updated
    // 3. in this useEffect, we needn't to make it changes many times.
    useEffect(() => {
      let tooltip = config?.tooltip;
      if (tooltip && tooltipRef.current) {
        tooltip = {
          ...tooltip,
          container: tooltipRef.current,
          customItems: (originalItems: TooltipItem[]) => {
            // it will be get error when mouseover quickly on chart before funnl chart is rendered
            // debounce will resolve it.
            // use setHoverItem will make sure the tooltip marker style is right
            // config.type === ChartType.FUNNEL ? setHoverItemD(originalItems) : setHoverItem(originalItems);
            register(originalItems);
            return originalItems;
          },
        };
      }
      let existChart: Chart;
      // The type should be set when the chart component is called.
      if (root.current && data && config?.type) {
        const [genLegends, hasDashedLegend] = getLegends(config.type, legendList);
        const { chart, views = [] } = callChart(
          {
            id: root.current,
            data,
            reporter: defineReporter,
            legends: genLegends,
            hasDashed: hasDashedLegend,
            interceptors,
            ...defaultOptions,
          },
          {
            ...config,
            tooltip,
          }
        );
        interceptors.onRender(chart as Chart, views);
        existChart = chart as Chart;
        setLegends(genLegends);
        setDashed(hasDashedLegend);
      }
      return () => {
        try {
          existChart?.destroy();
        } catch (err) {}
      };
    }, [data, legendList, config, callChart]);

    const onClickLegend = useCallback(
      (label: string) => {
        const newLegends = updateLegends(label);
        if (charts) {
          handleLegend(charts, newLegends, config);
        }
      },
      [charts, config, handleLegend, updateLegends]
    );
    return (
      <HighComponent options={chartOptions} width={width} charts={charts} config={config} onClickLegend={onClickLegend}>
        <div className="layout-content" ref={root} />
        <div className="gio-d-chart_tooltip-content">
          <div ref={tooltipRef} className="g2-tooltip">
            <InfoCardBox
              legends={legends}
              // triggerItems={hoverItem}
              acceptor={acceptor}
              options={{ ...chartOptions, ...defaultOptions }}
              trigger={getTriggerAction()}
              config={config}
            />
          </div>
        </div>
      </HighComponent>
    );
  };
};
export default core;
