/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useLayoutEffect, useEffect } from 'react';
import { debounce, round } from 'lodash';
import type { SpreadSheet } from '@antv/s2';
import { Adaptive } from '../interfaces';

export interface UseResizeEffectProps {
  container: HTMLElement;
  spreadSheet: SpreadSheet;
  adaptive: Adaptive;
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
const parseAdaptive = (defaultContainer: HTMLElement, adaptive: Adaptive) => {
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
  const { spreadSheet: s2, adaptive } = props;
  const { container, adaptiveWidth, adaptiveHeight } = parseAdaptive(
    props.container,
    adaptive,
  );

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

  // rerender by option.width and option.height
  useEffect(() => {
    if (!adaptive && s2) {
      s2.changeSize(s2?.options.width, s2?.options.height);
      s2.render(false);
    }
  }, [s2?.options.width, s2?.options.height, adaptive, s2]);

  // rerender by container resize or window resize
  useLayoutEffect(() => {
    if (!container || !adaptive) {
      return;
    }

    const resizeObserver = new ResizeObserver(([entry] = []) => {
      if (entry) {
        const size = readResizeObserverEntry(entry)
        const width = adaptiveWidth
          ? round(size?.width)
          : s2?.options.width;
        const height = adaptiveHeight
          ? round(size?.height)
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

    resizeObserver.observe(container, {
      box: 'border-box',
    });

    return () => {
      //container可能为外层容器 这里仅unobserve
      resizeObserver.unobserve(container);
    };
  }, [
    container,
    adaptiveWidth,
    adaptiveHeight,
    s2?.options.width,
    s2?.options.height,
    render,
  ]);
};
