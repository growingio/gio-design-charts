import React, { useRef, useCallback } from 'react';
import Legends from '../../legends';
import useOffset, { Offset } from '../../hooks/useOffset';
import core, { LayoutProps } from '../../core/core';
import { View } from '@antv/g2';

const LegendLayout = (props: LayoutProps) => {
  const layoutRef = useRef<HTMLDivElement | null>(null);
  const { options, config = {}, onClickLegend, width } = props;
  const { legends, chart, views } = options;
  const watchReset = useCallback(
    (resetOffset: Offset) => {
      const autoFit = config?.chart?.autoFit;
      // we needn't support scroll-x for autoFit chart.
      if (autoFit) {
        chart?.forceFit();
        return;
      }
      const divWidth = resetOffset.width;
      const useWidth = Number(width) > divWidth + 100 ? Number(width) : divWidth;
      if (config?.chart?.height && chart?.canvas?.get('el')) {
        chart?.changeSize(useWidth, config.chart.height);
        views?.forEach((view: View) => view.render(true));
      }
    },
    [chart, config, width]
  );

  const offset = useOffset(layoutRef, watchReset);
  return (
    <div className="gio-d-chart" ref={layoutRef} data-testid="legend-layout">
      {config.legend !== false && <Legends legends={legends} offsetWidth={offset.width} onClick={onClickLegend} />}
      {props.children}
    </div>
  );
};

export default core(LegendLayout);
