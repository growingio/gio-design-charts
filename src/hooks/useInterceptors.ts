import { useCallback, useRef, useMemo, MutableRefObject, useState } from 'react';
import { Chart, Event } from '@antv/g2';

export interface InterceptorOptions {
  visible?: boolean;
  // tooltip相对于当前的位置，发生的偏移量
  offsetX?: number;
  // tooltip相对当前的位置，向上移动发生的偏移量
  offsetY?: number;
  // tooltip相对于点击的位置，向上移动发生的偏移量，这是解决有固定高度的tooltip弹窗而设计的偏移量
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
        chart.on('element:click', (event: Event) => {
          /* istanbul ignore next */
          if (triggerActionRef.current !== 'click' && tooltipRef.current && options?.visible) {
            const tipStyles = window.getComputedStyle(tooltipRef?.current);
            const top = parseInt(tipStyles.top);
            const left = parseInt(tipStyles.left);
            const height = parseInt(tipStyles.height);

            const { offsetX = 0, offsetY = 0, fixedOffsetY } = options;
            if (fixedOffsetY || offsetY) {
              const revisedOffsetY = fixedOffsetY ? top + height - fixedOffsetY : top - offsetY;
              tooltipRef.current.style.top = `${revisedOffsetY}px`;
            }
            if (offsetX) {
              const revisedOffsetX = event.x < left ? left + offsetX : left - offsetX;
              tooltipRef.current.style.left = `${revisedOffsetX}px`;
            }
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
