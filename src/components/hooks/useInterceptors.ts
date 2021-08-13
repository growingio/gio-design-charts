import React, { useCallback, useRef, useMemo, MutableRefObject, useState } from 'react';
import { Chart, View } from '@antv/g2';

const useInterceptors = () => {
  const chartRef: MutableRefObject<(Chart | View)[] | undefined> = useRef();
  const triggerActionRef: MutableRefObject<string | undefined> = useRef();
  const getCharts = useCallback(() => chartRef.current, [chartRef]);
  const getTriggerAction = useCallback(() => triggerActionRef.current, [triggerActionRef]);

  const [, updated] = useState(0);

  const interceptors = useMemo(() => {
    return {
      onRender(chart: Chart, views: View[] = []) {
        chartRef.current = [chart, ...views];
      },
      bindElementEvents(chart: Chart) {
        chart.on('element:click', () => {
          triggerActionRef.current = 'click';
          updated(new Date().getTime());
        });
        chart.on('element:mouseover', () => {
          triggerActionRef.current = 'mouseover';
        });
      },
    };
  }, []);
  return { getTriggerAction, getCharts, interceptors };
};

export default useInterceptors;
