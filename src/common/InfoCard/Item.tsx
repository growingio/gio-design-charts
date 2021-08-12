import React from 'react';
import * as styles from './styles/index.module.less';

const Item = (props: any) => {
  const { data, forwardKey } = props;
  const item = data?.data;
  return (
    <div className={styles.item}>
      <span className={styles.label}>
        <div className={`${styles.block} ${styles[data?.type as 'bar' | 'line']}`} style={data.styles || {}} />
        {item?.[forwardKey]}
      </span>
      <span className={styles.value}>{item.value}</span>
    </div>
  );
};

export default Item;
