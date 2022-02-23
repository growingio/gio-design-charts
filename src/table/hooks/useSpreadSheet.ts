/* eslint-disable react-hooks/exhaustive-deps */
import {
  PivotSheet,
  S2Constructor,
  S2Options,
  SpreadSheet,
  TableSheet,
} from '@antv/s2';
import React, { MutableRefObject, useCallback, useEffect, useRef } from 'react';
import type { BaseSheetProps, SheetType } from '../interfaces';
import { themeDefault } from '../theme';
import { getSheetComponentOptions } from '../utils';
import { useEvents } from './useEvents';
import { useLoading } from './useLoading';
import { usePagination } from './usePagination';
import { usePrevious } from './usePrevious';
import { useRefDepsEffect } from './useRefDepsEffect';
import { useResize } from './useResize';

export interface UseSpreadSheetConfig {
  s2Options?: S2Options;
  sheetType: SheetType;
  // container: HTMLDivElement
  // containerRef: React.RefObject<HTMLDivElement>
}

export const useSpreadSheet = (
  props: BaseSheetProps,
  config: UseSpreadSheetConfig,
) => {
  const s2Ref = useRef<SpreadSheet>();
  const containerRef: MutableRefObject<HTMLElement | undefined> = useRef<HTMLElement>();
  const { spreadsheet: customSpreadSheet, dataConfig, options, themeConfig = themeDefault, loading: propsLoading, adaptive } = props;
  const { loading, setLoading } = useLoading(s2Ref.current, propsLoading);
  const pagination = usePagination(s2Ref.current, props);
  const prevDataCfg = usePrevious(dataConfig);
  const prevOptions = usePrevious(options);
  console.log(themeConfig?.theme?.splitLine)
  const prevThemeCfg = usePrevious(themeConfig);
  useEvents(props, s2Ref.current);
  const renderSpreadSheet = useCallback(
    (container: HTMLDivElement) => {
      console.log('renderSpreadSheet', container)
      const s2Options = config.s2Options || getSheetComponentOptions(options);
      const s2ConstructorArgs: S2Constructor = [container, dataConfig, s2Options];
      if (customSpreadSheet) {
        return customSpreadSheet(...s2ConstructorArgs);
      }
      if (config.sheetType === 'table') {
        return new TableSheet(container, dataConfig, s2Options);
      }
      return new PivotSheet(container, dataConfig, s2Options);
    },
    [config.s2Options, config.sheetType, options, dataConfig, customSpreadSheet],
  );
  const buildSpreadSheet = useCallback(() => {
    const { current: container } = containerRef;
    setLoading(true);
    if (container) {
      s2Ref.current = renderSpreadSheet(container as HTMLDivElement);
      s2Ref.current.setThemeCfg(themeConfig);
      s2Ref.current.render();
    }
    setLoading(false);
  }, [props, renderSpreadSheet, setLoading, config]);

  // init
  useEffect(() => {
    buildSpreadSheet();
    return () => {
      s2Ref.current?.destroy();
    };
  }, [containerRef]);

  //rerender when dataCfg, options or theme changed
  useEffect(() => {
    let reloadData = false;
    let reBuildDataSet = false;
    if (!Object.is(prevDataCfg, dataConfig)) {
      reloadData = true;
      s2Ref.current?.setDataCfg(dataConfig);
    }

    if (!Object.is(prevOptions, options)) {
      if (!Object.is(prevOptions?.hierarchyType, options?.hierarchyType)) {
        // 自定义树目录需要重新构建 CustomTreePivotDataSet
        reBuildDataSet = true;
        reloadData = true;
        s2Ref.current?.setDataCfg(dataConfig);
      }
      s2Ref.current?.setOptions(options);
    }
    if (!Object.is(prevThemeCfg, themeConfig)) {
      s2Ref.current?.setThemeCfg(themeConfig);
    }
    s2Ref.current?.render(reloadData, reBuildDataSet);
  }, [dataConfig, options, prevDataCfg, prevOptions, prevThemeCfg, themeConfig]);

  useResize({
    spreadSheet: s2Ref.current as SpreadSheet,
    container: containerRef.current as HTMLElement,
    adaptive: adaptive,
  });

  return {
    s2Ref,
    containerRef,
    loading,
    setLoading,
    pagination,
  };
}
