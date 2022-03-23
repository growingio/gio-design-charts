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
  const { chart, title, legendObject } = options;
  const [offsetWidth, setOffsetWidth] = useState(0);

  /* istanbul ignore next */
  const watchReset = useCallback(
    (resetOffset: Offset) => {
      const autoFit = config?.chart?.autoFit;
      // we needn't support scroll-x for autoFit chart.
      const divWidth = resetOffset.width;
      if (autoFit) {
        chart?.instance?.forceFit();
        setOffsetWidth(divWidth);
        return;
      }
      const useWidth = Number(width) > divWidth + 40 ? Number(width) : divWidth;
      if (config?.chart?.height && chart?.instance?.canvas?.get('el')) {
        chart?.instance?.changeSize(useWidth, fixedHeight(options, config));
        chart.views?.forEach((view: View) => view.render(true));
        chart.instance?.render(true);
        chart.instance?.render(true);
      }
      setOffsetWidth(divWidth);
    },
    [chart, options, config, width]
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
      {legendObject?.support && (
        <Legends
          config={config}
          legends={legendObject.quene}
          offsetWidth={offsetWidth || offset.width}
          onClick={onClickLegend}
        />
      )}
      {props.children}
    </div>
  );
};

export default core(LegendLayout);
