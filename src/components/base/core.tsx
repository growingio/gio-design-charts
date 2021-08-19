import React, { LegacyRef, useEffect, useState, useCallback } from 'react';
import { RefObject } from 'react';
import { InfoCardBox } from '../../common/InfoCard';
import { ChartConfig, ChartOptions, Legend, ReportThing } from '../../interface';
import useLegends, { getLegends } from '../hooks/useLegends';
import useInterceptors from '../hooks/useInterceptors';

export interface DirectorProps {
  options: ChartOptions;
  config: ChartConfig;
  children: JSX.Element;
}

export interface ChartCanvasProps {
  // type: ChartType;
  callChart: any;
  legendList: (string | Legend)[];
  handleLegend: any;
  config: ChartConfig;
  defaultOptions?: ChartOptions;
  data: any;
  // interceptors: any;
}

// In core, we only force on render chart and provide basic chart options
const core = (HighConponent: any) => {
  return (props: ChartCanvasProps) => {
    const { config, callChart, data, legendList, handleLegend, defaultOptions = {} } = props;
    const root: RefObject<HTMLDivElement> = React.createRef();
    const tooltipRef: LegacyRef<HTMLDivElement> = React.createRef();
    const [hoverItem, setHoverItem] = useState([]);

    const { legends, setLegends, updateLegends } = useLegends();
    const [chartOptions, setChartOptions] = useState(defaultOptions as ChartOptions);

    const { getCharts, getTriggerAction, interceptors } = useInterceptors();

    const defineReporter = useCallback((thing: ReportThing) => {
      // setReportThing(thing);
    }, []);

    // Init Chart
    // 1. In init Chart, it should be no updated in here when legends are updated by click
    //    whether we need legends to render chart
    // 2. the config: ChartConfig will be not updated in working.
    //    but the options: ChartOptions is always updated
    // 3. in this useEffect, we needn't to make it changes many times.
    useEffect(() => {
      let tooltip = config.tooltip || {};
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
      if (root?.current && data && config.type) {
        try {
          const [genLegends, hasDashed] = getLegends(config.type, legendList);
          const { chart, views = [] } = callChart(
            {
              id: root.current,
              data,
              reporter: defineReporter,
              legends: genLegends,
              hasDashed,
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
          setChartOptions({ data, hasDashed, legends: genLegends });
        } catch (err) {
          console.warn(err);
        }
      }
      return () => {
        existChart?.destroy();
      };
    }, [data, legendList, config, callChart]);

    const onClickLegend = useCallback(
      (label: string) => {
        const newLegends = updateLegends(label);
        handleLegend(getCharts(), newLegends, config);
        setChartOptions({ ...chartOptions, legends: newLegends });
      },
      [getCharts, chartOptions, config, handleLegend, updateLegends]
    );

    return (
      <HighConponent options={{ ...chartOptions, getCharts }} config={config} onClickLegend={onClickLegend}>
        <div ref={root} />
        <div className="gio-d-chart_tooltip-content">
          <div ref={tooltipRef} className="g2-tooltip">
            <InfoCardBox
              legends={legends || {}}
              triggerItems={hoverItem}
              options={{ ...chartOptions, ...defaultOptions }}
              trigger={getTriggerAction()}
              config={config}
            />
          </div>
        </div>
      </HighConponent>
    );
  };
};
export default core;
