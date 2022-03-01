/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useLayoutEffect, useEffect, useRef, useMemo, useState } from 'react';
import { debounce, round } from 'lodash';
import type { SpreadSheet } from '@antv/s2';
import { Adaptive } from '../interfaces';
import { useRefDepsEffect } from './useRefDepsEffect';

export interface UseResizeEffectProps {
  containerRef: React.MutableRefObject<HTMLElement | undefined>;
  s2: SpreadSheet;
  container: HTMLElement,
  wrapperRef: React.MutableRefObject<HTMLElement | undefined>; // 包含了 sheet + foot(page) + header
  // s2Ref: React.MutableRefObject<SpreadSheet | undefined>
  adaptive?: Adaptive;
}

const RENDER_DELAY = 200; // ms
const readResizeObserverEntry = (entry: ResizeObserverEntry) => {
  if (entry.borderBoxSize) {
    // Firefox implements `borderBoxSize` as a single content rect, rather than an array
    const borderBoxSize = Array.isArray(entry.borderBoxSize) ? entry.borderBoxSize[0] : entry.borderBoxSize;
    const { inlineSize: width, blockSize: height } = borderBoxSize;
    return { width, height };
  } else {
    // For older browsers & mobile devices that don't support the newer `borderBoxSize`
    // Note that we could use entry.contentRect here, which has better performance,
    // but since it does not include the padding & borders we use getBoundingClientRect() instead.
    const { width, height } = entry.target.getBoundingClientRect();
    return { width, height };
  }
};
const parseAdaptive = (defaultContainer?: HTMLElement, adaptive?: Adaptive) => {
  let container = defaultContainer;
  let adaptiveWidth = true;
  let adaptiveHeight = true;
  if (typeof adaptive !== 'boolean') {
    container = adaptive?.getContainer?.() || defaultContainer;
    adaptiveWidth = adaptive?.width ?? true;
    adaptiveHeight = adaptive?.height ?? true;
  }
  return { container, adaptiveWidth, adaptiveHeight };
}

export const useResize = (props: UseResizeEffectProps) => {
  const { s2, adaptive = false, containerRef, wrapperRef } = props;

  const [adaptiveState, setAdaptiveState] = useState<{
    container?: HTMLElement;
    adaptiveWidth: boolean;
    adaptiveHeight: boolean;
  }>()
  useEffect(() => {
    setAdaptiveState(parseAdaptive(
      wrapperRef.current,
      adaptive,
    ))
  }, [adaptive])

  // 第一次自适应时不需要 debounce, 防止抖动
  const isFirstRender = React.useRef<boolean>(true);

  const render = useCallback(
    (width: number, height: number) => {
      s2.changeSize(width, height);
      s2.render(false);
      isFirstRender.current = false;
    },
    [s2],
  );
  const debounceRender = debounce(render, RENDER_DELAY);


  useLayoutEffect(() => {
    const { container: wrapper, adaptiveWidth, adaptiveHeight } = adaptiveState || {};
    if (!containerRef.current || !adaptive || !wrapper) {
      return;
    }
    const resizeObserver = new ResizeObserver(([entry] = []) => {
      if (entry) {
        const size = readResizeObserverEntry(entry);

        const width = adaptiveWidth
          ? round(size?.width)
          : s2?.options.width;
        const height = adaptiveHeight
          ? round(containerRef.current?.getBoundingClientRect().height || 0)
          : s2?.options.height;
        if (!adaptiveWidth && !adaptiveHeight) {
          return;
        }
        if (isFirstRender.current) {
          render(width, height);
          return;
        }
        debounceRender(width, height);
      }
    });

    resizeObserver.observe(wrapper, {
      box: 'border-box',
    });

    return () => {
      //container可能为外层容器 这里仅unobserve
      resizeObserver.unobserve(wrapper);
    };
  }, [adaptiveState, adaptive, render])

};
