import React, { useEffect, useState } from 'react';
import { Sankey as SankeyCls } from './framework';
import { ChartType, ChartProps, SankeyConfig } from '../interfaces';

import { LegendLayout } from '../layouts';
import { fetchChart } from '../boundary';
import { DataSet } from '@antv/data-set';

export interface SankeyProps extends ChartProps {
  config: SankeyConfig;
}

const Sankey: React.FC<SankeyProps> = (props: SankeyProps) => {
  const { data, legends: legendProps = [], config, title } = props;

  config.type = ChartType.SANKEY;
  const [sankey] = useState(new SankeyCls());

  const [nodes, setNodes] = useState();

  useEffect(() => {
    // arc diagram layout
    const ds = new DataSet();
    const dv = ds.createView().source(data, {
      type: 'graph',
      edges: (d) => d.links,
    });
    dv.transform({
      type: 'diagram.sankey',
      nodeWidth: 0.008,
      nodePadding: 0.03,
      sort: (a, b) => {
        if (a.value > b.value) {
          return 0;
        } else if (a.value < b.value) {
          return -1;
        }
        return 0;
      },
    });

    const edges = dv.edges.map((edge) => {
      return {
        source: edge.source.name,
        target: edge.target.name,
        name: edge.source.name === '首页 UV' ? edge.target.name : edge.source.name,
        x: edge.x,
        y: edge.y,
        value: edge.value,
      };
    });

    const nodes = dv.nodes.map((node) => {
      return {
        x: node.x,
        y: node.y,
        name: node.name,
      };
    });

    setNodes({ nodes, edges } as any);
  }, [data]);

  return <LegendLayout title={title} data={nodes as any} legendList={legendProps} config={config} chart={sankey} />;
};

export default fetchChart<SankeyProps>(Sankey);
