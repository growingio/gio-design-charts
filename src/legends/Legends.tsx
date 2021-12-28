import React, { useEffect, useState, useCallback } from 'react';
import { default as LegendComponent } from './Legend';
import LegendMenu from './Menu';

import { Legend, ChartConfig } from '../interfaces';
import { getThemeColor } from '../utils/styles';
import './styles/legends.less';

export interface LegendsProps {
  legends?: Legend[];
  onClick?: (label: string) => void;
  offsetWidth?: number;
  config?: ChartConfig;
}

const Legends = (props: LegendsProps) => {
  const { legends = [], onClick, config, offsetWidth = 800 } = props;
  const height = config?.chart?.height || 300;

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
    let count = 0;
    let totalWidth = 0;
    legends?.forEach((legend) => {
      totalWidth += legend?.width || 125;
      if (totalWidth <= offsetWidth - 125) {
        count += 1;
      }
    });
    if (legends && legends.length > 0) {
      setTiled(legends.slice(0, count));
      setGrouped(legends.slice(count));
    }
  }, [legends, offsetWidth]);

  const textColor = getThemeColor(config);

  return (
    <div className="gio-d-charts-legends" data-testid="legends">
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
      {grouped && grouped.length > 0 && <LegendMenu legends={grouped} onClick={onClickLegend} height={height} />}
    </div>
  );
};

export default Legends;
