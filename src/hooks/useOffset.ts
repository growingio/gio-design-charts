import { throttle } from 'lodash';
import { useCallback, useEffect, RefObject, useRef, MutableRefObject, useMemo } from 'react';

export interface Offset {
  width: number;
  height: number;
}

const useOffset = (rootRef: RefObject<HTMLDivElement>, watchReset?: (obj: Offset) => void) => {
  const offsetRef: MutableRefObject<Offset | undefined> = useRef();
  const onResize = useCallback(() => {
    const offset = offsetRef.current;
    const width = rootRef?.current?.offsetWidth as number;
    const height = rootRef?.current?.offsetHeight as number;
    if (width && width !== offset?.width) {
      const newOffset = { width, height };
      offsetRef.current = newOffset;
      watchReset?.(newOffset);
    }
  }, [rootRef, watchReset, offsetRef]);

  // const reset = useMemo(() => {
  //   return throttle(onResize, 200);
  // }, [onResize]);

  // Listener resize
  useEffect(() => {
    const offset = offsetRef.current;
    if (!offset?.width) {
      onResize();
    }
    window.onresize = () => {
      onResize();
    };
  }, [onResize]);
  return offsetRef.current || ({} as Offset);
};

export default useOffset;
