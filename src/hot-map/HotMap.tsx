import React, { useMemo } from 'react';
import { ChartType, ChartProps, HotMapConfig, ChartRef } from '../interfaces';
import { HotMap as HatMapCls } from './framework';
import { LegendLayout } from '../layouts';
import { fetchChart } from '../boundary';

/** Heatmap records are carried in source; optional dimension lists stay alongside it. */
export interface HotMapData {
  source: ChartProps['data'];
  [dimension: string]: unknown;
}

export interface HotMapProps extends Omit<ChartProps, 'data'> {
  data: HotMapData;
  config: HotMapConfig;
}

const HotMap: React.ForwardRefRenderFunction<ChartRef, HotMapProps> = (props, forwardRef) => {
  const { data, config, title } = props;

  const hotMap = useMemo(() => new HatMapCls(), []);

  if (config) {
    config.type = ChartType.HotMap;
  }

  return <LegendLayout ref={forwardRef} title={title} data={data} legendList={[]} config={config} chart={hotMap} />;
};

export default fetchChart<HotMapProps>(HotMap);
