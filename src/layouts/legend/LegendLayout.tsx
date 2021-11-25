import React, { useRef, useCallback, useState } from 'react';
import Legends from '../../legends';
import useOffset, { Offset } from '../../hooks/useOffset';
import core, { LayoutProps } from '../../core/core';
import { View } from '@antv/g2';
import { getThemeColor } from '../../utils/styles';
import { fixedHeight } from '../../utils/chart';

const LegendLayout = (props: LayoutProps) => {
  const layoutRef = useRef<HTMLDivElement | null>(null);
  const { options, config = {}, onClickLegend, width } = props;
  const { legendQueue, chart, views, title } = options;
  const [offsetWidth, setOffsetWidth] = useState(0);
  const watchReset = useCallback(
    (resetOffset: Offset) => {
      const autoFit = config?.chart?.autoFit;
      // we needn't support scroll-x for autoFit chart.
      const divWidth = resetOffset.width;
      if (autoFit) {
        chart?.forceFit();
        setOffsetWidth(divWidth);
        return;
      }
      const useWidth = Number(width) > divWidth + 40 ? Number(width) : divWidth;
      if (config?.chart?.height && chart?.canvas?.get('el')) {
        chart?.changeSize(useWidth, fixedHeight(options, config));
        views?.forEach((view: View) => view.render(true));
        chart?.render(true);
      }
      setOffsetWidth(divWidth);
    },
    [chart, views, options, config, width]
  );

  const offset = useOffset(layoutRef, watchReset);
  const color = getThemeColor(config);
  return (
    <div className="gio-d-charts" ref={layoutRef} data-testid="legend-layout">
      {title && (
        <div className="gio-d-charts__title" style={{ color }}>
          {title}
        </div>
      )}
      {config.legend !== false && legendQueue?.length > 0 && (
        <Legends
          config={config}
          legends={legendQueue}
          offsetWidth={offsetWidth || offset.width}
          onClick={onClickLegend}
        />
      )}
      {props.children}
    </div>
  );
};

export default core(LegendLayout);
