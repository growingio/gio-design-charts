import React, { useEffect, useState, useCallback } from 'react';
import { default as LegendComponent } from './Legend';
import LegendMenu from './Menu';

import { Legend, Legends as LegendsInterface } from '../interfaces';
import './styles/legends.less';

export interface LegendsProps {
  legends?: LegendsInterface;
  onClick?: (label: string) => void;
  offsetWidth?: number;
}

const Legends = (props: LegendsProps) => {
  const { legends = {}, onClick, offsetWidth = 800 } = props;

  const [tiled, setTiled] = useState([] as Legend[]);
  const [grouped, setGrouped] = useState([] as Legend[]);

  const onClickLegend = useCallback(
    (label: string) => {
      const legendValues: Legend[] = Object.values(legends);
      const enableClick = legendValues.length > 1;
      enableClick && onClick && onClick(label);
    },
    [onClick, legends]
  );

  useEffect(() => {
    const legendValues: Legend[] = Object.values(legends);
    const count = Number((offsetWidth / 125).toFixed(0)) - 1;
    if (legendValues && legendValues.length > 0) {
      if (legendValues.length > 5) {
        setTiled(legendValues.slice(0, count));
        setGrouped(legendValues.slice(count));
      } else {
        setTiled(legendValues);
      }
    }
  }, [legends, offsetWidth]);

  return (
    <div className="gio-d-chart-legends" data-testid="legends">
      {tiled.map((legend: Legend) => {
        const { name, alias } = legend;
        return <LegendComponent key={name} label={alias || name} data={legend} onClick={onClickLegend} />;
      })}
      {grouped && grouped.length > 0 && <LegendMenu legends={grouped} onClick={onClickLegend} />}
    </div>
  );
};

export default Legends;
