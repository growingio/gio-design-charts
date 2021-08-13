import React, { LegacyRef, useEffect, useState, useCallback } from 'react';
import { RefObject } from 'react';
import InfoCard from '../../common/InfoCard';
import { IChartConfig, IChartOptions, ILegend, IReportThing } from '../../interface';
import useLegends, { getLegends } from '../hooks/useLegends';
import useInterceptors from '../hooks/useInterceptors';

export interface IDirectorProps {
  options: IChartOptions;
  children: JSX.Element;
}

export interface IChartCanvasProps {
  // type: ChartType;
  callChart: any;
  legendList: (string | ILegend)[];
  handleLegend: any;
  config: IChartConfig;
  defaultOptions?: IChartOptions;
  data: any;
  // interceptors: any;
}

// In core, we only force on render chart and provide basic chart options
const core = (HighConponent: any) => {
  return (props: IChartCanvasProps) => {
    const { config, callChart, data, legendList, handleLegend, defaultOptions = {} } = props;
    const root: RefObject<HTMLDivElement> = React.createRef();
    const tooltipRef: LegacyRef<HTMLDivElement> = React.createRef();
    const [hoverItem, setHoverItem] = useState([]);

    const { legends, setLegends, updateLegends } = useLegends();
    const [chartOptions, setChartOptions] = useState(defaultOptions as IChartOptions);

    const { getCharts, getTriggerAction, interceptors } = useInterceptors();

    const defineReporter = useCallback((thing: IReportThing) => {
      // setReportThing(thing);
    }, []);

    // Init Chart
    // 1. In init Chart, it should be no updated in here when legends are updated by click
    //    whether we need legends to render chart
    // 2. the config: IChartConfig will be not updated in working.
    //    but the options: IChartOptions is always updated
    // 3. in this useEffect, we needn't to make it changes many times.
    useEffect(() => {
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
      if (root.current && data) {
        const [genLegends, hasDashed] = getLegends(config.type, legendList);
        const { chart, views = [] } = callChart(
          { id: root.current, data, reporter: defineReporter, legends: genLegends, hasDashed, interceptors },
          {
            ...config,
            tooltip,
          }
        );
        interceptors?.onRender(chart, views);
        existChart = chart;
        setLegends(genLegends);
        setChartOptions({ data, hasDashed, legends: genLegends });
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
      [getCharts, legends, chartOptions, config, handleLegend, updateLegends]
    );

    return (
      <HighConponent options={{ ...chartOptions, getCharts }} onClickLegend={onClickLegend}>
        <div ref={root} />
        <div ref={tooltipRef} className="g2-tooltip">
          <InfoCard
            legends={legends || {}}
            triggerItems={hoverItem}
            options={{ ...chartOptions, ...defaultOptions }}
            trigger={getTriggerAction()}
            config={config}
          />
        </div>
      </HighConponent>
    );
  };
};
export default core;
