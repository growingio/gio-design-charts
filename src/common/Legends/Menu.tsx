import React from 'react';
import { ILegend } from '../../interface';
import Legend from './Legend';

const Menu = (props: any) => {
  const { legends, onClick } = props;
  return (
    <div className="gio-d-chart-legends_dropdown">
      <span>其余{legends?.length || 0}项</span>
      <div className={`gio-d-chart-legends_dropdown-content dropdown-controller`}>
        {legends.map((legend: ILegend) => {
          const { name } = legend;
          return (
            <div key={name} className="gio-d-chart-legends_dropdown-item">
              <Legend label={name} data={legend} onClick={onClick} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
