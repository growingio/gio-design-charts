import React from 'react';
import { ILegend, ILegends } from '../../interface';
import Item from './Item';

import * as styles from './styles/index.module.less';

export interface IInfoCardProps {
  legends: ILegends;
  items: any[];
}

const InfoCard = (props: IInfoCardProps) => {
  const { items, legends = {} } = props;
  return (
    <div className={styles.infocard}>
      <div className={styles.title}>{items?.[0]?.title}</div>
      {items?.map((item: ILegend) => {
        return (
          <div key={item?.name}>
            <Item data={item} legend={legends?.[item?.name]} />
          </div>
        );
      })}
    </div>
  );
};

export default InfoCard;
