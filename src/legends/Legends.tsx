import React, { useEffect, useState, useCallback } from 'react';
import { default as LegendComponent } from './Legend';
import LegendMenu from './Menu';

import { Legend, ChartConfig } from '../interfaces';
import './styles/legends.less';
import { isString, lowerCase } from 'lodash';

export interface LegendsProps {
  legends?: Legend[];
  onClick?: (label: string) => void;
  offsetWidth?: number;
  config?: ChartConfig;
}

const getLegendColor = (config?: ChartConfig) => {
  const theme = config?.chart?.theme;
  let color = '';
  if (isString(theme)) {
    color = lowerCase(theme) === 'dark' ? '#fff' : '';
  } else {
    color = theme?.gio?.legend?.color || '';
  }
  return color;
};

const Legends = (props: LegendsProps) => {
  const { legends = [], onClick, config, offsetWidth = 800 } = props;

  const [tiled, setTiled] = useState([] as Legend[]);
  const [grouped, setGrouped] = useState([] as Legend[]);

  const onClickLegend = useCallback(
    (label: string) => {
      const enableClick = legends.length > 1;
      enableClick && onClick && onClick(label);
    },
    [onClick, legends]
  );

  useEffect(() => {
    const count = Number((offsetWidth / 125).toFixed(0)) - 1;
    if (legends && legends.length > 0) {
      if (legends.length > 5) {
        setTiled(legends.slice(0, count));
        setGrouped(legends.slice(count));
      } else {
        setTiled(legends);
      }
    }
  }, [legends, offsetWidth]);

  const textColor = getLegendColor(config);

  return (
    <div className="gio-d-chart-legends" data-testid="legends">
      {tiled.map((legend: Legend) => {
        const { name, alias } = legend;
        return (
          <LegendComponent
            key={name}
            label={name}
            alias={alias}
            data={legend}
            textColor={textColor}
            onClick={onClickLegend}
          />
        );
      })}
      {grouped && grouped.length > 0 && <LegendMenu legends={grouped} onClick={onClickLegend} />}
    </div>
  );
};

export default Legends;
