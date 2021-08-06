import React from 'react';
import { ILegend } from '../../interface';
import Legend from './Legend';

import * as styles from './styles/index.module.less';

const Menu = (props: any) => {
  const { legends, onClick } = props;
  return (
    <div className={styles.dropdown}>
      <span>其余{legends?.length || 0}项</span>
      <div className={`${styles.dropdownContent} dropdown-controller`}>
        {legends.map((legend: ILegend) => {
          const { name } = legend;
          return (
            <div key={name} className={styles.dropdownItem}>
              <Legend label={name} data={legend} onClick={onClick} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
