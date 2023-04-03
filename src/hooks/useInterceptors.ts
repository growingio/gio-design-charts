import { useCallback, useRef, useMemo, MutableRefObject, useState } from 'react';
import { Chart, Event } from '@antv/g2';

export interface InterceptorOptions {
  visible?: boolean;
  offsetY?: number;
  fixedOffsetY?: number;
}
export interface Interceptor {
  bindTooltip: (ref: any) => void;
  bindElementEvents: (chart: Chart, options?: InterceptorOptions) => void;
}

const useInterceptors = () => {
  const triggerActionRef: MutableRefObject<string> = useRef('');
  const chartRef: MutableRefObject<Chart | null> = useRef(null);
  const tooltipRef = useRef<HTMLDivElement | null>();

  const getTrigger = useCallback(() => triggerActionRef.current, [triggerActionRef]);
  /* istanbul ignore next */
  const setTrigger = useCallback(
    (trigger) => {
      triggerActionRef.current = trigger;
      chartRef.current?.unlockTooltip();
      chartRef.current?.hideTooltip();
    },
    [triggerActionRef]
  );

  const [, updated] = useState(0);

  const interceptors: Interceptor = useMemo(() => {
    return {
      bindTooltip(r: any) {
        tooltipRef.current = r?.current;
      },
      bindElementEvents(chart: Chart, options?: InterceptorOptions) {
        chartRef.current = chart;
        chart.on('element:click', () => {
          /* istanbul ignore next */
          if (triggerActionRef.current !== 'click' && tooltipRef.current && options?.visible) {
            const tipStyles = window.getComputedStyle(tooltipRef?.current);
            const top = parseInt(tipStyles.top);
            const height = parseInt(tipStyles.height);

            const { offsetY = 70, fixedOffsetY } = options;
            const revisedOffsetY = fixedOffsetY ? top + height - fixedOffsetY : top - offsetY;
            tooltipRef.current.style.top = `${revisedOffsetY}px`;
          }
          triggerActionRef.current = 'click';
          chart.lockTooltip();
          updated(new Date().getTime());
        });
        chart.on('element:mouseover', () => {
          triggerActionRef.current = 'mouseover';
        });
        chart.on('element:mouseout', (e: Event) => {
          triggerActionRef.current = 'mouseover';
          if (!e.event.relatedTarget) {
            chart.unlockTooltip();
            updated(new Date().getTime());
          }
        });
      },
    };
  }, []);
  return { getTrigger, setTrigger, interceptors };
};

export default useInterceptors;
