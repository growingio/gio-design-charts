import React from 'react';
import { IChartOptions, ILegend, ILegends } from '../../interface';
import Item from './Item';

import * as styles from './styles/index.module.less';

export interface IInfoCardProps {
  legends: ILegends;
  trigger: string | undefined;
  items: any[];
  options: IChartOptions;
}

const InfoCard = (props: IInfoCardProps) => {
  const { items, legends = {}, trigger, options } = props;
  const { defaultStyles } = options;
  return (
    <div className={styles.infocard}>
      <div className={styles.title}>{items?.[0]?.title}</div>
      {items?.map((item: ILegend) => {
        item.color = defaultStyles?.color || item.color;
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
