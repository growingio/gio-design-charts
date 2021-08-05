import React from 'react';
import { useCallback } from 'react';
import { DISABLE_COLOR } from '../../theme';
import { getBackgroundImage } from '../utils/styles';

import * as styles from './styles/index.module.less';

export interface ILegendProps {
  label: string;
  data: any;
  onClick?: any;
}

const Legend = (props: ILegendProps) => {
  const { label, data, onClick } = props;
  const onClickLabel = useCallback(() => {
    onClick && onClick(label);
  }, [label, onClick]);
  const { active, color, lineDash, type, dashed } = data || {};
  let stylesLine = {} as React.CSSProperties;

  const backgroundImage = dashed ? getBackgroundImage() : {};
  stylesLine = lineDash
    ? {
        border: `1px dashed ${active ? color : DISABLE_COLOR}`,
        height: 0,
        width: 12,
        ...backgroundImage,
      }
    : { backgroundColor: active ? color : DISABLE_COLOR, ...backgroundImage };

  return (
    <span className={styles.legend} onClick={onClickLabel} style={{ color: active ? '' : DISABLE_COLOR }} title={label}>
      <div className={`${styles.block} ${styles[type as 'bar' | 'line']}`} style={stylesLine} />
      <div className={styles.text}>{label}</div>
    </span>
  );
};

export default Legend;
