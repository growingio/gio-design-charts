import React, { useEffect, useRef } from 'react';

export const usePrevious = <T = unknown>(value: T) => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
