import { Chart, View } from '@antv/g2';
import React, { LegacyRef, useMemo } from 'react';
import Legends from '../../legends';
import useOffset from '../../hooks/useOffset';
import core, { DirectorProps } from '../../core/core';
import debounce from 'lodash/debounce';

export interface LegendDirectorProps extends DirectorProps {
  onClickLegend: any;
}

const LegendDirector = React.memo((props: LegendDirectorProps) => {
  const directorRef: LegacyRef<HTMLDivElement> = React.createRef();
  const { options = {}, config = {}, onClickLegend, width } = props;
  const { legends, charts } = options;
  const watchReset = useMemo(() => {
    return debounce((resetOffset: { width: number; height: number }) => {
      charts?.map((view: Chart | View) => {
        if (view instanceof Chart && width) {
          const widthObj = Number(width) > resetOffset.width + 200 ? width : 0;
          if (widthObj) {
            view.changeSize(widthObj, config.chart.height);
          }
        }
        view?.render(true);
      });
    }, 600);
  }, [charts, config, width]);

  const offset = useOffset(directorRef, watchReset);
  return (
    <div className="gio-d-chart" ref={directorRef} data-testid="legend-director">
      {config.legend !== false && <Legends legends={legends} offsetWidth={offset.width} onClick={onClickLegend} />}
      {props.children}
    </div>
  );
});

export default core(LegendDirector);
