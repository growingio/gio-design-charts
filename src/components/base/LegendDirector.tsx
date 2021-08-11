import { Chart, View } from '@antv/g2';
import React, { LegacyRef } from 'react';
import Legends from '../../common/Legends';
import useOffset from '../hooks/useOffset';
import core, { IDirectorProps } from './core';
import * as styles from './styles/base.module.less';

export interface ILegendDirectorProps extends IDirectorProps {
  onClickLegend: any;
}

const LegendDirector = (props: ILegendDirectorProps) => {
  const directorRef: LegacyRef<HTMLDivElement> = React.createRef();
  const { options = {}, onClickLegend } = props;
  const { legends, getCharts } = options;
  const watchReset = () => {
    const charts = getCharts?.();
    charts?.map((view: Chart | View) => view?.render(true));
  };
  const offset = useOffset(directorRef, watchReset);
  return (
    <div className={styles.chart} ref={directorRef}>
      <Legends legends={legends} offsetWidth={offset.width} onClick={onClickLegend} />
      {props.children}
    </div>
  );
};

export default core(LegendDirector);
