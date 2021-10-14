import { useCallback, useEffect, useRef, useMemo } from 'react';
import { LooseObject } from '@antv/g-base';
import { Chart, View } from '@antv/g2';
import { Datum, TooltipItem } from '@antv/g2/lib/interface';
import { isEmpty } from '@antv/util';

import { ChartConfig, Legend } from '../interfaces';
import useLegends, { getLegends } from './useLegends';

export interface UseChartProps {
  rootRef: React.MutableRefObject<HTMLDivElement | null>;
  tooltipRef: React.MutableRefObject<HTMLDivElement | null>;
  callChart: any;
  tooltipItemRegister: any;
  config: ChartConfig;
  data: LooseObject | LooseObject[];
  legendList: (string | Legend)[];
  interceptors: any;
  defaultOptions: any;
}

// This is a hook which is used to create Chart object and update the chart.
const useChart = (options: UseChartProps) => {
  const {
    rootRef,
    tooltipRef,
    tooltipItemRegister,
    callChart,
    config,
    data,
    legendList,
    interceptors,
    defaultOptions,
  } = options;
  //   const { charts, getTriggerAction, interceptors } = useInterceptors();

  const chartRef = useRef<Chart>();
  const viewRef = useRef<View[]>();
  const updateRef = useRef<(charts: { chart: Chart; views?: View[] }, data: Datum[]) => void>();
  const { legends, hasDashed, setLegends, updateLegends } = useLegends();

  const createChart = useCallback(() => {
    // If the config is empty or there is no special config, return null;
    if (isEmpty(config) || !config?.chart) {
      return;
    }
    const [genLegends, hasDashedLegend] = getLegends(config.type, legendList);
    const {
      chart,
      views = [],
      update,
    } = callChart(
      {
        id: rootRef.current,
        data,
        // reporter: defineReporter,
        legends: genLegends,
        hasDashed: hasDashedLegend,
        interceptors,
        ...defaultOptions,
      },
      {
        ...config,
        tooltip: {
          container: tooltipRef.current,
          customItems: (originalItems: TooltipItem[]) => {
            // it will be get error when mouseover quickly on chart before funnl chart is rendered
            // debounce will resolve it.
            // use setHoverItem will make sure the tooltip marker style is right
            // config.type === ChartType.FUNNEL ? setHoverItemD(originalItems) : setHoverItem(originalItems);
            tooltipItemRegister(originalItems);
            return originalItems;
          },
        },
      }
    );
    chartRef.current = chart;
    viewRef.current = views;
    updateRef.current = update;
    setLegends(genLegends, hasDashedLegend);
  }, [data, legendList, config, callChart, tooltipItemRegister]);

  const updateChart = useCallback(() => {
    const chart = chartRef.current;
    const update = updateRef.current;
    update && chart && update({ chart, views: viewRef.current }, data as any);
  }, [data]);

  useEffect(() => {
    console.log('------');
    if (chartRef.current) {
      updateChart();
    } else {
      createChart();
    }
  }, [createChart, updateChart]);

  console.log(config);

  const chartOptions = useMemo(
    () => ({
      ...defaultOptions,
      chart: chartRef.current,
      views: viewRef.current,
      legends,
      hasDashed,
    }),
    [defaultOptions, chartRef.current, viewRef.current, legends, hasDashed]
  );

  return { updateLegends, chartOptions };
};

export default useChart;
