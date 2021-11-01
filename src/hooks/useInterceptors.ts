import { useCallback, useRef, useMemo, MutableRefObject, useState } from 'react';
import { Chart, Event } from '@antv/g2';

const useInterceptors = () => {
  const triggerActionRef: MutableRefObject<string> = useRef('');
  const chartRef: MutableRefObject<Chart | null> = useRef(null);

  const getTrigger = useCallback(() => triggerActionRef.current, [triggerActionRef]);
  const setTrigger = useCallback(
    (trigger) => {
      triggerActionRef.current = trigger;
      chartRef.current?.unlockTooltip();
    },
    [triggerActionRef]
  );

  const [, updated] = useState(0);

  const interceptors = useMemo(() => {
    return {
      bindElementEvents(chart: Chart) {
        chartRef.current = chart;
        chart.on('element:click', () => {
          triggerActionRef.current = 'click';
          chart.lockTooltip();
          updated(new Date().getTime());
        });

        chart.on('element:mouseover', () => {
          triggerActionRef.current = 'mouseover';
        });
        chart.on('element:mouseout', (e: Event) => {
          if (!e.event.relatedTarget) {
            chart.unlockTooltip();
            updated(new Date().getTime());
          }
          triggerActionRef.current = 'mouseover';
        });
      },
    };
  }, []);
  return { getTrigger, setTrigger, interceptors };
};

export default useInterceptors;
