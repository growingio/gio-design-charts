import React, { LegacyRef } from 'react';
import Legends from '../../common/Legends';
import { IChartConfig, IChartOptions } from '../../interface';
import useOffset from '../hooks/useOffset';
import core from './core';
import * as styles from './styles/base.module.less';

export interface IDirectorProps {
  options: IChartOptions;
  config: IChartConfig;
}

export interface ILegendDirectorProps extends IDirectorProps {
  onClickLegend: any;
}

const LegendDirector = (props: any) => {
  const directorRef: LegacyRef<HTMLDivElement> = React.createRef();
  const { options = {}, onClickLegend } = props;
  const offset = useOffset(directorRef);

  return (
    <div className={styles.chart} ref={directorRef}>
      <Legends legends={options.legends} offsetWidth={offset.width} onClick={onClickLegend} />
      {props.children}
    </div>
  );
};

export default core(LegendDirector);
