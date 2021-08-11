import React, { useCallback, useEffect, RefObject, useState } from 'react';

const useOffset = (rootRef: RefObject<HTMLDivElement>, watchReset?: () => void) => {
  const [offset, setOffset] = useState({} as { width: number; height: number });
  const onResize = useCallback(() => {
    const width = rootRef?.current?.offsetWidth as number;
    const height = rootRef?.current?.offsetHeight as number;
    if (width && width !== offset.width) {
      setOffset({ width: width || 800, height });
      if (width && offset.width) {
        watchReset?.();
      }
    }
  }, [rootRef]);

  // Listener resize
  useEffect(() => {
    if (rootRef?.current) {
      const observer = new MutationObserver(onResize);
      const targetNode = rootRef?.current as HTMLElement;
      const targetConfig = { attributes: true, childList: true, subtree: true };
      observer.observe(targetNode, targetConfig);
      return () => {
        observer.disconnect();
      };
    }
  }, [rootRef, onResize]);
  return offset;
};

export default useOffset;
