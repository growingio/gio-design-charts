import { useCallback, useEffect, useRef, useMemo, useContext } from 'react';
import { LooseObject } from '@antv/g-base';
import { Chart, View } from '@antv/g2';
import { Datum, TooltipItem } from '@antv/g2/lib/interface';
import { isEqual } from '@antv/util';

import { ChartConfig, Legend } from '../interfaces';
import useLegends, { getLegends } from './useLegends';
import { inValidConfig } from '../utils/chart';
import { cloneDeep } from 'lodash';
import { DesignContext } from '@gio-design/utils';

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
  tooltipKey: number;
  setTooltipKey: any;
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
    setTooltipKey,
    tooltipKey,
  } = options;

  const context = useContext(DesignContext);

  const chartRef = useRef<Chart>();
  const viewRef = useRef<View[]>();
  const configRef = useRef<Partial<ChartConfig>>();
  const dataRef = useRef<LooseObject | LooseObject[]>();
  const updateRef = useRef<(charts: { chart: Chart; views?: View[] }, data: Datum[]) => void>();
  const { legends, hasDashed, setLegends, updateLegends } = useLegends();

  const clear = useCallback(() => {
    chartRef.current?.destroy();
    chartRef.current = undefined;
    setTooltipKey(new Date().getTime());
  }, [setTooltipKey]);

  const create = useCallback(() => {
    // If the config is empty or there is no special config, return null;
    if (inValidConfig(config)) {
      return;
    }
    const [genLegends, hasDashedLegend] = getLegends(config.type, legendList);
    const tooltip = config.tooltip
      ? {
          ...config.tooltip,
          container: tooltipRef.current,
          customItems: (originalItems: TooltipItem[]) => {
            // it will be get error when mouseover quickly on chart before funnl chart is rendered
            // debounce will resolve it.
            // use setHoverItem will make sure the tooltip marker style is right
            // config.type === ChartType.FUNNEL ? setHoverItemD(originalItems) : setHoverItem(originalItems);
            tooltipItemRegister(originalItems);
            return originalItems;
          },
        }
      : false;
    const {
      chart,
      views = [],
      update,
    } = callChart(
      {
        id: rootRef.current,
        data,
        legends: genLegends,
        hasDashed: hasDashedLegend,
        interceptors,
        theme: context.theme || {},
        ...(defaultOptions || {}),
      },
      {
        ...config,
        tooltip,
      }
    );
    if (chart) {
      configRef.current = cloneDeep(config);
      dataRef.current = cloneDeep(data);
      chartRef.current = chart;
      viewRef.current = views;
      updateRef.current = update;
      setLegends(genLegends, hasDashedLegend);
    }
  }, [
    rootRef,
    tooltipRef,
    data,
    legendList,
    config,
    callChart,
    tooltipItemRegister,
    defaultOptions,
    interceptors,
    setLegends,
    context,
  ]);

  const updateChart = useCallback(() => {
    const chart = chartRef.current;
    const update = updateRef.current;
    const changedData = !isEqual(dataRef.current, data);
    if (update && chart && changedData) {
      update({ chart, views: viewRef.current }, data as Datum[]);
      dataRef.current = cloneDeep(data);
    }
  }, [data]);

  const hasChangedConfig = !isEqual(configRef.current, config);
  const hasChangedData = !isEqual(dataRef.current, data);

  useEffect(() => {
    // 如果equalConfig有变化，则进入创建或者清楚通道
    if (hasChangedConfig) {
      // 如果已经有了chartRef.current，需要先销毁
      if (chartRef.current) {
        clear();
      } else {
        create();
      }
    }
  }, [create, clear, hasChangedConfig, config, tooltipKey]);

  if (!hasChangedConfig && hasChangedData) {
    updateChart();
  }

  const chartOptions = useMemo(
    () => ({
      ...defaultOptions,
      chart: chartRef.current,
      views: viewRef.current,
      legends,
      hasDashed,
    }),
    [defaultOptions, legends, hasDashed]
  );

  return { updateLegends, chartOptions };
};

export default useChart;
