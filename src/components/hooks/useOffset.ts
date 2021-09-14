import { throttle } from 'lodash';
import { useCallback, useEffect, RefObject, useState, useMemo } from 'react';

const useOffset = (rootRef: RefObject<HTMLDivElement>, watchReset?: (obj?: any) => void) => {
  const [offset, setOffset] = useState({} as { width: number; height: number });
  const onResize = useCallback(() => {
    const width = rootRef?.current?.offsetWidth as number;
    const height = rootRef?.current?.offsetHeight as number;
    if (width && width !== offset.width) {
      const newOffset = { width, height };
      setOffset(newOffset);
      watchReset?.(newOffset);
    }
  }, [rootRef, watchReset, offset]);

  const reset = useMemo(() => {
    return throttle(onResize, 200);
  }, [onResize]);

  // Listener resize
  useEffect(() => {
    if (!offset.width) {
      reset();
    }
    window.onresize = () => {
      reset();
    };
  }, [onResize]);
  return offset;
};

export default useOffset;
