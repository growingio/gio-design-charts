import { Chart, View } from '@antv/g2';
import React, { LegacyRef } from 'react';
import Legends from '../../../common/Legends';
import useOffset from '../../hooks/useOffset';
import core, { DirectorProps } from '../../base/core';

// import './styles/base.less';

export interface LegendDirectorProps extends DirectorProps {
  onClickLegend: any;
}

const LegendDirector = (props: LegendDirectorProps) => {
  const directorRef: LegacyRef<HTMLDivElement> = React.createRef();
  const { options = {}, config = {}, onClickLegend } = props;
  const { legends, getCharts } = options;
  const watchReset = () => {
    const charts = getCharts?.();
    charts?.map((view: Chart | View) => view?.render(true));
  };
  const offset = useOffset(directorRef, watchReset);
  return (
    <div className="gio-d-chart" ref={directorRef}>
      {config.legend !== false && <Legends legends={legends} offsetWidth={offset.width} onClick={onClickLegend} />}
      {props.children}
    </div>
  );
};

export default core(LegendDirector);
