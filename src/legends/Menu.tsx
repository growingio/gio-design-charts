import React from 'react';
import { Legend } from '../interfaces';
import { default as LegendComponent } from './Legend';

export interface MenuProps {
  legends: Legend[];
  onClick?: (label: string) => void;
}

const Menu = (props: MenuProps) => {
  const { legends, onClick } = props;
  return (
    <div className="gio-d-chart-legends_dropdown">
      <span data-testid="legend-others">其余{legends?.length || 0}项</span>
      <div className={`gio-d-chart-legends_dropdown-content dropdown-controller`}>
        {legends?.map((legend: Legend) => {
          const { name } = legend;
          return (
            <div key={name} className="gio-d-chart-legends_dropdown-item">
              <LegendComponent label={name} data={legend} onClick={onClick} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
