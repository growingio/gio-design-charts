import React, { useState, useCallback } from 'react';
import { useEffect } from 'react';
import { default as LegendComponent } from './Legend';
import LegendMenu from './Menu';

import { Legend } from '../../interface';
import './styles/legends.less';

const Legends = (props: any) => {
  const { legends = {}, onClick, offsetWidth = 800 } = props;

  const [tiled, setTiled] = useState([] as Legend[]);
  const [grouped, setGrouped] = useState([] as Legend[]);
  const [enableClick, setEnableClick] = useState(true);

  const onClickLegend = useCallback(
    (label: string) => {
      enableClick && onClick && onClick(label);
    },
    [onClick, enableClick]
  );

  useEffect(() => {
    const legendValues: Legend[] = Object.values(legends) || [];
    if (legendValues.length <= 1) {
      setEnableClick(false);
    } else {
      setEnableClick(true);
    }
    const count = Number((offsetWidth / 125).toFixed(0)) - 1;
    if (legendValues && legendValues.length > 5) {
      setTiled(legendValues.slice(0, count));
      setGrouped(legendValues.slice(count));
    } else {
      setTiled(legendValues);
    }
  }, [legends, offsetWidth]);
  return (
    <div className="gio-d-chart-legends" data-testid="legends">
      {tiled?.map((legend: Legend) => {
        const { name } = legend;
        return <LegendComponent key={name} label={name} data={legend} onClick={onClickLegend} />;
      })}
      {grouped && grouped.length > 0 && <LegendMenu legends={grouped} onClick={onClickLegend} />}
    </div>
  );
};

export default Legends;
