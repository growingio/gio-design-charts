import { useRef, useCallback } from 'react';

const useTunnel = <T>() => {
  const currentRecord = useRef<T | T[]>();
  const fallbackRef = useRef<(v: T | T[]) => void>();
  const acceptor = useCallback((fallback: any) => {
    fallbackRef.current = fallback;
    if (currentRecord.current) {
      fallback(currentRecord.current);
      currentRecord.current = undefined;
    }
  }, []);

  const register = useCallback((original: T | T[]) => {
    const fallback = fallbackRef.current;
    if (fallback) {
      fallback(original);
    } else {
      currentRecord.current = original;
    }
  }, []);
  return [register, acceptor];
};

export default useTunnel;
