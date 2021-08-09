import { Chart, View } from '@antv/g2';
import React, { useCallback, useRef, useMemo, MutableRefObject } from 'react';

const useInterceptors = () => {
  const chartRef: MutableRefObject<(Chart | View)[] | undefined> = useRef();
  const getCharts = useCallback(() => chartRef.current, [chartRef]);
  const interceptors = useMemo(() => {
    return {
      onRender(chart: Chart, views: View[] = []) {
        chartRef.current = [chart, ...views];
      },
    };
  }, []);
  return { getCharts, interceptors };
};

export default useInterceptors;
