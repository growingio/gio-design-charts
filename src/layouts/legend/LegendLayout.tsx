import { Chart, View } from '@antv/g2';
import React, { LegacyRef, useMemo } from 'react';
import Legends from '../../legends';
import useOffset, { Offset } from '../../hooks/useOffset';
import core, { LayoutProps } from '../../core/core';
import debounce from 'lodash/debounce';

const LegendLayout = React.memo((props: LayoutProps) => {
  const layoutRef: LegacyRef<HTMLDivElement> = React.createRef();
  const { options, config = {}, onClickLegend, width, charts } = props;
  const { legends } = options;
  const watchReset = useMemo(() => {
    return debounce((resetOffset: Offset) => {
      charts &&
        charts.forEach((view: Chart | View) => {
          if (view instanceof Chart && width) {
            const widthObj = Number(width) > resetOffset.width + 200 ? width : 0;
            if (widthObj) {
              view.changeSize(widthObj, config.chart.height);
              view.render(true);
            }
          }
        });
    }, 600);
  }, [charts, config, width]);

  const offset = useOffset(layoutRef, watchReset);
  return (
    <div className="gio-d-chart" ref={layoutRef} data-testid="legend-layout">
      {config.legend !== false && <Legends legends={legends} offsetWidth={offset.width} onClick={onClickLegend} />}
      {props.children}
    </div>
  );
});

export default core(LegendLayout);
