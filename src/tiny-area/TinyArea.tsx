import React, { useEffect, useMemo, useState } from 'react';
import { BaldLayout } from '../layouts';

import { Area as AreaCls } from '../area/framework';
import { ChartType, TinyChartProps, AreaConfig, Legend, ChartRef } from '../interfaces';

import { fetchChart } from '../boundary';
import { LooseObject } from '@antv/g-base';

const TinyArea: React.ForwardRefRenderFunction<ChartRef, TinyChartProps> = (props, forwardRef) => {
  const { data, config } = props;
  const [areaData, setAreaData] = useState<LooseObject[]>([]);
  const [areaConfig, setAreaConfig] = useState<AreaConfig>({} as AreaConfig);
  const [legends, setLegends] = useState<Legend[]>([]);

  const area = useMemo(() => new AreaCls(), []);

  useEffect(() => {
    const covertData = data?.map((num: number, index: number) => {
      return { x: index, value: num, type: 'tiny' };
    });
    const covertAreaConfig = {
      chart: config?.chart || {},
      scale: {
        x: { range: [0, 1] },
        value: { nice: true },
      },
      axises: [
        ['value', { label: false, grid: null }],
        ['x', { label: false, tickLine: null }],
      ],
      area: {
        position: 'x*value',
        color: 'type',
        adjust: ['stack'],
      },
      tooltip: false,
    } as AreaConfig;
    setLegends([{ name: 'tiny', opacity: 0.1 }]);
    setAreaData(covertData);
    setAreaConfig(covertAreaConfig);
  }, [data, config]);
  areaConfig.type = ChartType.AREA;
  areaConfig.size = 'tiny';

  return <BaldLayout data={areaData} legendList={legends} config={areaConfig} chart={area} ref={forwardRef} />;
};

export default fetchChart<TinyChartProps>(TinyArea);
