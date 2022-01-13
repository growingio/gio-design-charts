import { useCallback, useRef, useMemo, MutableRefObject, useState } from 'react';
import { Chart, Event } from '@antv/g2';

const useInterceptors = () => {
  const triggerActionRef: MutableRefObject<string> = useRef('');
  const chartRef: MutableRefObject<Chart | null> = useRef(null);
  const tooltipRef = useRef<HTMLDivElement | null>()

  const getTrigger = useCallback(() => triggerActionRef.current, [triggerActionRef]);
  const setTrigger = useCallback(
    (trigger) => {
      triggerActionRef.current = trigger;
      chartRef.current?.unlockTooltip();
      chartRef.current?.hideTooltip();
    },
    [triggerActionRef]
  );

  const [, updated] = useState(0);

  const interceptors = useMemo(() => {
    return {
      bindTooltip(r: any) {
        tooltipRef.current = r?.current
      },
      bindElementEvents(chart: Chart, options: {more?: boolean} = {}) {
        chartRef.current = chart;
        chart.on('element:click', () => {
          if (triggerActionRef.current !== 'click' && tooltipRef.current && options.more){
            triggerActionRef.current = 'click';
            const {top = ''} = tooltipRef?.current?.style || {}
            const y = Number(top.replace('px', ''))
            if (top) {
              tooltipRef.current.style.top = `${y - 70}px`
            }
          }
          chart.lockTooltip()
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
