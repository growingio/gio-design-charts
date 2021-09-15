import React, { LegacyRef, useEffect, useState, useCallback, RefObject, useMemo } from 'react';
import { InfoCardBox } from '../info-card';
import { ChartConfig, ChartOptions, Legend, ReportThing } from '../interfaces';
import useLegends, { getLegends } from '../hooks/useLegends';
import useInterceptors from '../hooks/useInterceptors';

import './styles/base.less';

export interface DirectorProps {
  options: ChartOptions;
  config: ChartConfig;
  children: JSX.Element;
  width?: number;
}

export interface ChartCanvasProps {
  // type: ChartType;
  callChart: any;
  legendList: (string | Legend)[];
  handleLegend: any;
  config: ChartConfig;
  defaultOptions?: ChartOptions;
  data: any;
  width?: number;
  // interceptors: any;
}

// In core, we only force on render chart and provide basic chart options
const core = (HighComponent: any) => {
  return (props: ChartCanvasProps) => {
    const { config, callChart, data, legendList, handleLegend, defaultOptions = {}, width } = props;
    const root: RefObject<HTMLDivElement> = React.createRef();
    const tooltipRef: LegacyRef<HTMLDivElement> = React.createRef();
    const [hoverItem, setHoverItem] = useState([]);

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
      let tooltip = config?.tooltip || {};
      if (tooltipRef?.current) {
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
      // The type should be set when the chart component is called.
      if (root?.current && data && config?.type) {
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
        interceptors?.onRender(chart, views);
        existChart = chart;
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
        handleLegend(charts, newLegends, config);
      },
      [charts, chartOptions, config, handleLegend, updateLegends]
    );

    return (
      <HighComponent options={chartOptions} width={width} charts={charts} config={config} onClickLegend={onClickLegend}>
        <div className="director-content" ref={root} />
        <div className="gio-d-chart_tooltip-content">
          <div ref={tooltipRef} className="g2-tooltip">
            <InfoCardBox
              legends={legends}
              triggerItems={hoverItem}
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
