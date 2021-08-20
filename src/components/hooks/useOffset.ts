import { useCallback, useEffect, RefObject, useState } from 'react';

const useOffset = (rootRef: RefObject<HTMLDivElement>, watchReset?: (obj?: any) => void) => {
  const [offset, setOffset] = useState({} as { width: number; height: number });
  const onResize = useCallback(() => {
    const width = rootRef?.current?.offsetWidth as number;
    const height = rootRef?.current?.offsetHeight as number;
    if (width && width !== offset.width) {
      const newOffset = { width: width || 800, height };
      setOffset(newOffset);
      if (width && offset.width) {
        watchReset?.(newOffset);
      }
    }
  }, [rootRef, watchReset, offset]);

  // Listener resize
  useEffect(() => {
    if (rootRef?.current) {
      const observer = new MutationObserver(onResize);
      const targetNode = rootRef?.current as HTMLElement;
      const targetConfig = { attributes: true, childList: true, subtree: true };
      observer.observe(targetNode, targetConfig);
      // first init
      onResize();
      return () => {
        observer.disconnect();
      };
    }
  }, [rootRef, onResize]);
  return offset;
};

export default useOffset;
