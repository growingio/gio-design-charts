import { useCallback, useEffect, useRef, useMemo, useContext } from 'react';
import { LooseObject } from '@antv/g-base';
import { Datum, TooltipItem } from '@antv/g2/lib/interface';
import { isEqual } from '@antv/util';

import { Actions, ChartConfig, Legend } from '../interfaces';
import useLegends, { getLegends } from './useLegends';
import { getTheme, inValidConfig } from '../utils/chart';
import { cloneDeep } from 'lodash';
import { DesignContext } from '@gio-design/utils';
import { useIntlDict } from './useIntlDict';

export interface UseChartProps {
  rootRef: React.MutableRefObject<HTMLDivElement | null>;
  tooltipRef: React.MutableRefObject<HTMLDivElement | null>;
  chart: Actions;
  tooltipItemRegister: any;
  config: ChartConfig;
  data: LooseObject | LooseObject[];
  legendList: (string | Legend)[];
  interceptors: any;
  defaultOptions: any;
  tooltipKey: number;
  setTooltipKey: any;
  title?: string;
}

// This is a hook which is used to create Chart object and update the chart.
const useChart = (options: UseChartProps) => {
  const {
    rootRef,
    tooltipRef,
    tooltipItemRegister,
    chart,
    config,
    data,
    legendList,
    interceptors,
    defaultOptions,
    setTooltipKey,
    tooltipKey,
    title,
  } = options;

  const context = useContext(DesignContext);
  const dict = useIntlDict();

  const configRef = useRef<Partial<ChartConfig>>();
  const dataRef = useRef<LooseObject | LooseObject[]>();
  const { legends, legendQueue, hasDashed, setLegends, updateLegends } = useLegends();

  const clear = useCallback(() => {
    chart.clear();
    setTooltipKey(new Date().getTime());
  }, [chart, setTooltipKey]);

  const create = useCallback(() => {
    // If the config is empty or there is no special config, return null;
    if (inValidConfig(config)) {
      return;
    }
    const theme = getTheme(context?.theme);
    const [genLegends, queue, hasDashedLegend] = getLegends(config.type, legendList);
    const tooltip =
      config.tooltip !== false
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
    chart.render(
      {
        id: rootRef.current,
        data,
        dict,
        legends: genLegends,
        hasDashed: hasDashedLegend,
        interceptors,
        theme: theme,
        hasLegend: config.legend !== false && queue.length > 0,
        hasTitle: !!title,
        ...(defaultOptions || {}),
      },
      {
        ...config,
        tooltip,
      }
    );
    if (chart.instance) {
      configRef.current = cloneDeep(config);
      dataRef.current = cloneDeep(data);
      setLegends(genLegends, queue, hasDashedLegend);
      interceptors?.bindElementEvents(chart.instance);
    }
  }, [
    rootRef,
    tooltipRef,
    data,
    legendList,
    config,
    chart,
    tooltipItemRegister,
    defaultOptions,
    interceptors,
    setLegends,
    context,
    dict,
    title,
  ]);

  const updateChart = useCallback(() => {
    if (config && legendList) {
      setLegends(...getLegends(config.chartType, legendList));
    }
    const changedData = !isEqual(dataRef.current, data);
    if (changedData) {
      chart.update?.(data as Datum[]);
      dataRef.current = cloneDeep(data);
    }
  }, [data, config, chart]);

  const hasChangedConfig = !isEqual(configRef.current, config);
  const hasChangedData = !isEqual(dataRef.current, data);

  useEffect(() => {
    // 如果equalConfig有变化，则进入创建或者清楚通道
    if (hasChangedConfig) {
      // 如果已经有了chartRef.current，需要先销毁
      if (chart.instance) {
        clear();
      } else {
        create();
      }
    }
  }, [chart, create, clear, hasChangedConfig, config, tooltipKey, legendList]);

  if (!hasChangedConfig && hasChangedData) {
    updateChart();
  }

  const chartOptions = useMemo(
    () => ({
      ...defaultOptions,
      chart,
      // views: viewRef.current,
      legends,
      hasDashed,
      legendQueue,
      title,
      hasLegend: config?.legend !== false && legendQueue?.length > 0,
      hasTitle: !!title,
    }),
    [defaultOptions, config, legends, legendQueue, hasDashed, title]
  );

  return { updateLegends, chartOptions };
};

export default useChart;
