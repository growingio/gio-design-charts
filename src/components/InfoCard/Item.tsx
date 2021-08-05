import React from 'react';
import { getBackgroundImage } from '../utils/styles';
import * as styles from './styles/index.module.less';

const Item = (props: any) => {
  const { data, legend = {} } = props;
  const { color, lineDash, type, dashed } = legend;

  const backgroundImage = dashed ? getBackgroundImage() : {};

  const stylesLine = lineDash
    ? {
        border: `1px dashed ${color}`,
        height: 0,
        width: '12px',
        ...backgroundImage,
      }
    : { backgroundColor: color || data.color, ...backgroundImage };

  return (
    <div className={styles.item}>
      <span className={styles.label}>
        <div className={`${styles.block} ${styles[type as 'bar' | 'line']}`} style={stylesLine} />
        {data.name}
      </span>
      <span className="value">{data.value}</span>
    </div>
  );
};

export default Item;
