import { useRef, useCallback } from 'react';

const useTunnel = <T>() => {
  const fallbackRef = useRef<(v: T[]) => void>();
  const acceptor = useCallback((fallback: any) => {
    fallbackRef.current = fallback;
  }, []);

  const register = useCallback((orginalItems: T[]) => {
    const fallback = fallbackRef.current;
    fallback && fallback(orginalItems);
  }, []);
  return [register, acceptor];
};

export default useTunnel;
