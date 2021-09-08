import { Chart, View } from '@antv/g2';
import React, { LegacyRef, useMemo } from 'react';
import Legends from '../../../common/Legends';
import useOffset from '../../hooks/useOffset';
import core, { DirectorProps } from '../../core/core';
import { debounce } from 'lodash';

export interface LegendDirectorProps extends DirectorProps {
  onClickLegend: any;
}

const LegendDirector = React.memo((props: LegendDirectorProps) => {
  const directorRef: LegacyRef<HTMLDivElement> = React.createRef();
  const { options = {}, config = {}, onClickLegend, width } = props;
  const { legends, getCharts } = options;
  const watchReset = useMemo(
    () =>
      debounce((offset: { width: number; height: number }) => {
        const charts = getCharts?.();
        charts?.map((view: Chart | View) => {
          if (view instanceof Chart && width) {
            const widthObj = Number(width) > offset.width + 200 ? width : 0;
            if (widthObj) {
              view.changeSize(widthObj, config.chart.height);
            }
          }
          view?.render(true);
        });
      }, 600),
    [getCharts, config, width]
  );

  const offset = useOffset(directorRef, watchReset);
  return (
    <div className="gio-d-chart" ref={directorRef} data-testid="legend-director">
      {config.legend !== false && <Legends legends={legends} offsetWidth={offset.width} onClick={onClickLegend} />}
      {props.children}
    </div>
  );
});

export default core(LegendDirector);
