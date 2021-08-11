import React, { useCallback, useEffect, RefObject, useState } from 'react';

const useOffset = (rootRef: RefObject<HTMLDivElement>, watchReset?: () => void) => {
  const [offset, setOffset] = useState({} as { width: number; height: number });
  const onResize = useCallback(() => {
    if (rootRef?.current?.offsetWidth && rootRef?.current?.offsetWidth !== offset.width) {
      setOffset({ width: rootRef?.current?.offsetWidth || 800, height: rootRef?.current?.offsetHeight });
      watchReset?.();
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
