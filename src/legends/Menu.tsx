import React from 'react';
import { Legend } from '../interfaces';
import { default as LegendComponent } from './Legend';
import { useIntlDict } from '../hooks/useIntlDict';

export interface MenuProps {
  legends: Legend[];
  onClick?: (label: string) => void;
  height: number;
}

const Menu = (props: MenuProps) => {
  const { legends, onClick, height } = props;
  const intlDict = useIntlDict();
  return (
    <div className="gio-d-charts-legends_dropdown">
      <span data-testid="legend-others">{intlDict.otherOptions(legends?.length || 0)}</span>
      <div className={`gio-d-charts-legends_dropdown-content dropdown-controller`} style={{ maxHeight: height - 80 }}>
        {legends?.map((legend: Legend) => {
          const { name, alias } = legend;
          return (
            <div key={name} className="gio-d-charts-legends_dropdown-item">
              <LegendComponent label={name} alias={alias} data={legend} onClick={onClick} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
