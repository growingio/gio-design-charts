import { useCallback, useRef, useMemo, MutableRefObject, useState } from 'react';
import { Chart, Event } from '@antv/g2';

const useInterceptors = () => {
  const triggerActionRef: MutableRefObject<string | undefined> = useRef();
  const getTriggerAction = useCallback(() => triggerActionRef.current, [triggerActionRef]);

  const [, updated] = useState(0);

  const interceptors = useMemo(() => {
    return {
      bindElementEvents(chart: Chart) {
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
  return { getTriggerAction, interceptors };
};

export default useInterceptors;
