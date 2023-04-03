import { useCallback, useEffect, useRef, useMemo, useContext } from 'react';
import { LooseObject } from '@antv/g-base';
import { Datum, TooltipItem } from '@antv/g2/lib/interface';
import { isEqual } from '@antv/util';

import { Actions, ChartConfig } from '../interfaces';
import { LegendObject } from '../legends/useLegends';
import { getTheme, inValidConfig } from '../utils/chart';
import { cloneDeep, get, isObject } from 'lodash';
import { DesignContext } from '@gio-design/utils';
import { useIntlDict } from './useIntlDict';

export interface UseChartProps {
  rootRef: React.MutableRefObject<HTMLDivElement | null>;
  tooltipRef: React.MutableRefObject<HTMLDivElement | null>;
  chart: Actions;
  tooltipItemRegister: any;
  config: ChartConfig;
  data: LooseObject | LooseObject[];
  // legendList: (string | Legend)[];
  interceptors: any;
  defaultOptions: any;
  tooltipKey: number;
  setTooltipKey: any;
  title?: string;
  legendObject: LegendObject;
}

const changedDatalength = (source: any, target: any) => {
  if (isObject(source)) {
    return (source as any)?.source?.length === (target as any)?.source?.length;
  }
  return source?.length === target?.length;
};

// This is a hook which is used to create Chart object and update the chart.
const useChart = (options: UseChartProps) => {
  const {
    rootRef,
    tooltipRef,
    tooltipItemRegister,
    chart,
    config,
    data,
    // legendList,
    interceptors,
    defaultOptions,
    setTooltipKey,
    tooltipKey,
    title,
    legendObject,
  } = options;

  const context = useContext(DesignContext);
  const dict = useIntlDict();

  const configRef = useRef<Partial<ChartConfig>>();
  const dataRef = useRef<LooseObject | LooseObject[]>();
  // const { legends, legendQueue, hasDashed, setLegends, updateLegends } = useLegends();

  /* istanbul ignore next */
  const clear = useCallback(() => {
    chart.clear();
    setTooltipKey(new Date().getTime());
  }, [chart, setTooltipKey]);

  const create = useCallback(() => {
    // If the config is empty or there is no special config, return null;
    if (inValidConfig(config)) {
      return;
    }

    /* istanbul ignore next */
    const tooltipCustomItems = (originalItems: TooltipItem[]) => {
      // it will be get error when mouseover quickly on chart before funnl chart is rendered
      // debounce will resolve it.
      // use setHoverItem will make sure the tooltip marker style is right
      // config.type === ChartType.FUNNEL ? setHoverItemD(originalItems) : setHoverItem(originalItems);
      tooltipItemRegister(originalItems);
      return originalItems;
    };

    const theme = getTheme(context?.theme);
    const tooltip =
      config.tooltip !== false
        ? {
            ...config.tooltip,
            container: tooltipRef.current,
            customItems: tooltipCustomItems,
          }
        : false;
    const chartConfig = {
      ...config,
      tooltip,
    };
    // const [genLegends, queue, hasDashedLegend] = getLegends(config.type, legendList);
    chart.render(
      {
        id: rootRef.current,
        data,
        dict,
        // legends: legendObject.mapping,
        // hasDashed: legendObject.hasDashed,
        interceptors,
        theme: theme,
        // hasLegend: legendObject.support,
        legendObject,
        hasTitle: !!title,
        ...(defaultOptions || {}),
      },
      chartConfig
    );
    if (chart.instance) {
      configRef.current = cloneDeep(config);
      dataRef.current = cloneDeep(data);
      // setLegends(genLegends, queue, hasDashedLegend);
      interceptors?.bindElementEvents(chart.instance, {
        more: get(config, 'tooltip.clickOffset'),
        offset: get(config, 'tooltip.clickOffset'),
        fixedOffset: get(config, 'tooltip.clickFixedOffset'),
      });
    }
  }, [
    rootRef,
    tooltipRef,
    data,
    legendObject,
    config,
    chart,
    tooltipItemRegister,
    defaultOptions,
    interceptors,
    // setLegends,
    context,
    dict,
    title,
  ]);

  /* istanbul ignore next */
  const updateChart = useCallback(() => {
    const changedData = !isEqual(dataRef.current, data);
    if (changedData) {
      chart.update?.(data as Datum[]);
      dataRef.current = cloneDeep(data);
    }
  }, [data, chart]);

  const hasChangedConfig = !isEqual(configRef.current, config) || !changedDatalength(data, dataRef.current);
  const hasChangedData = !isEqual(dataRef.current, data);

  useEffect(() => {
    // 如果equalConfig有变化，则进入创建或者清楚通道
    if (hasChangedConfig) {
      // 如果已经有了chartRef.current，需要先销毁
      if (chart.instance) {
        /* istanbul ignore next */
        clear();
      } else {
        create();
      }
    }
  }, [chart, create, clear, hasChangedConfig, config, tooltipKey, legendObject]);

  const chartOptions = useMemo(
    () => ({
      ...defaultOptions,
      chart,
      // legends: legendObject.mapping,
      // hasDashed: legendObject.hasDashed,
      // legendQueue: legendObject.quene,
      // hasLegend: legendObject.support,
      legendObject,
      title,
      hasTitle: !!title,
    }),
    [defaultOptions, chart, title, legendObject]
  );

  if (!hasChangedConfig && hasChangedData) {
    /* istanbul ignore next */
    updateChart();
  }

  return { updateLegends: legendObject.update, chartOptions };
};

export default useChart;
