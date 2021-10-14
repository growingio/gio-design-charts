import { Chart, View } from '@antv/g2';
import React, { LegacyRef, useCallback } from 'react';
import Legends from '../../legends';
import useOffset, { Offset } from '../../hooks/useOffset';
import core, { LayoutProps } from '../../core/core';

const LegendLayout = React.memo((props: LayoutProps) => {
  const layoutRef: LegacyRef<HTMLDivElement> = React.createRef();
  const { options, config = {}, onClickLegend, width } = props;
  const { legends, chart } = options;
  const watchReset = useCallback(
    (resetOffset: Offset) => {
      const autoFit = config?.chart?.autoFit;
      // we needn't support scroll-x for autoFit chart.
      if (autoFit) {
        return;
      }
      const divWidth = resetOffset.width;
      const useWidth = Number(width) > divWidth + 100 ? Number(width) : divWidth;
      if (config?.chart?.height) {
        chart?.changeSize(useWidth, config.chart.height);
        chart?.render(true);
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
});

export default core(LegendLayout);
