import React, { useEffect, useState } from 'react';
import { SpreadSheet, S2Event } from '@antv/s2';

export const useLoading = (s2?: SpreadSheet, loadingFromProps: boolean = false) => {
  const [loading, setLoading] = useState<boolean>(loadingFromProps);

  useEffect(() => {
    s2?.on(S2Event.LAYOUT_BEFORE_RENDER, () => {
      setLoading(true);
    });

    s2?.on(S2Event.LAYOUT_AFTER_RENDER, () => {
      setLoading(false);
    });
  }, [s2]);

  return {
    loading: loadingFromProps ?? loading,
    setLoading,
  };
};
