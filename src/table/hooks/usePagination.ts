import React, { useEffect, useState } from 'react';
import { S2Event, SpreadSheet, customMerge, getSafetyOptions } from '@antv/s2';
import { isEmpty } from 'lodash';
import { BaseSheetProps } from '../interfaces';
/**
 * default page setting
 */
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_NUMBER = 1;

export const usePagination = (
  s2: SpreadSheet | undefined,
  props: BaseSheetProps,
) => {
  const { options, dataConfig } = props;
  const [total, setTotal] = useState<number>(0);
  const [current, setCurrent] = useState<number>(
    options.pagination?.current || DEFAULT_PAGE_NUMBER,
  );
  const [pageSize, setPageSize] = useState<number>(
    options.pagination?.pageSize || DEFAULT_PAGE_SIZE,
  );

  useEffect(() => {
    if (!s2 || isEmpty(options.pagination)) {
      return;
    }
    s2.setOptions({
      pagination: {
        current,
        pageSize,
      },
    });
    s2.render(false);
  }, [pageSize, current, options.pagination, s2]);

  useEffect(() => {
    setCurrent(options?.pagination?.current || DEFAULT_PAGE_NUMBER);
    setPageSize(options?.pagination?.pageSize || DEFAULT_PAGE_SIZE);
  }, [options.pagination]);

  useEffect(() => {
    if (!s2 || isEmpty(options.pagination)) {
      return;
    }

    const totalUpdateCallback = (data: {
      pageSize: number;
      pageCount: number;
      total: number;
      current: number;
    }) => setTotal(data.total);
    s2.on(S2Event.LAYOUT_PAGINATION, totalUpdateCallback);
    return () => {
      s2.off(S2Event.LAYOUT_PAGINATION, totalUpdateCallback);
    };
  }, [options.pagination, dataConfig, s2]);

  return {
    total,
    current,
    pageSize,
    setTotal,
    setCurrent,
    setPageSize,
  };
};
