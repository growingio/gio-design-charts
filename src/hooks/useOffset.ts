import { debounce } from 'lodash';
import { useCallback, useEffect, RefObject, useRef, MutableRefObject } from 'react';

export interface Offset {
  width: number;
  height: number;
}

const useOffset = (rootRef: RefObject<HTMLDivElement>, watchReset?: (obj: Offset) => void) => {
  const offsetRef: MutableRefObject<Offset | undefined> = useRef();
  /* istanbul ignore next */
  const onResize = useCallback(
    (offset: Offset) => {
      offsetRef.current = offset;
      watchReset?.(offset);
    },
    [watchReset]
  );

  useEffect(() => {
    const resize = debounce(onResize, 200);
    /* istanbul ignore next */
    const observe = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      const contentRect = entries?.[0]?.contentRect;
      resize({ width: contentRect?.width || 0, height: contentRect?.height });
    });
    if (rootRef.current) {
      observe.observe(rootRef.current);
    }
    return () => {
      observe.disconnect();
    };
  }, [rootRef, onResize]);
  return (
    offsetRef.current || ({ width: rootRef.current?.offsetWidth, height: rootRef.current?.offsetHeight } as Offset)
  );
};

export default useOffset;
