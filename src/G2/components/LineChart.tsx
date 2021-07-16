import React, { LegacyRef, useEffect } from 'react';
import { Chart } from '@antv/g2';
import { useState } from 'react';
import { useCallback } from 'react';
import { lineChart, handleLegend } from '../frameworks/lineChart';
import { ILegend, ILegends } from '../interface';

import '../styles/default.css';
import Legends from './common/Legends';
import getLegends from './hooks/getLegends';

export interface IG3Props {
  data: any;
  legends: Array<ILegend | string>;
}

const G3 = (props: any) => {
  const { data, legends: legendProps = {} } = props;
  const root: LegacyRef<HTMLDivElement> = React.createRef();
  const [chart, setChart] = useState<Chart>();
  const [legends, setLegends] = useState({} as ILegends);

  useEffect(() => {
    const genLegends = getLegends(legendProps);
    const renderChart = lineChart(root.current, data, genLegends);
    setChart(renderChart);
    setLegends(genLegends);
    return () => {
      renderChart.destroy();
    };
  }, [data, legendProps]);

  const onClickLegend = useCallback(
    (label: string) => {
      const legend = legends[label] || {};
      legend.active = !legend.active;
      setLegends({ ...legends });
      handleLegend(chart as Chart, legends);
    },
    [chart, legends]
  );

  console.log(legends);

  return (
    <div className='legend'>
      <Legends legends={legends} onClick={onClickLegend} />
      <div ref={root} />
    </div>
  );
};

export default G3;
