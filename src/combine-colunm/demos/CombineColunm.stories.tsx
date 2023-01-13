import { ComponentStory } from '@storybook/react';
import CombineColunm from '../CombineColunm';
import { dataWithComponsive, dataWithGroupByTs, dataWithTs, percentData } from './data';
import Docs from './Column.mdx';
import { colors, formatNumber, InfoCard } from '../..';
import formatDateByTs from '../../utils/formatDate';
import Card from '../../demos/card';

export default {
  title: 'Charts/组合图表 CombineColumn',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: CombineColunm,
};

const tooltipConfig = {
  showMarkers: false,
  render: (options: any) => {
    const ts = options.data?.[0]?.data?.ts;
    return <InfoCard {...options} title={formatDateByTs(new Date(ts).getTime())} />;
  },
};

const tsLabelConfig = [
  'ts',
  {
    label: {
      formatter: (text: string, item: any, index: number) => {
        return formatDateByTs(new Date(text).getTime());
      },
    },
  },
];

const valueLabelConfig = ['value', { label: { formatter: (val: string) => formatNumber(Number(val)) },
position:'left' }];

const Template: ComponentStory<typeof CombineColunm> = (args) => (
  <Card>
    <CombineColunm {...args} />
  </Card>
);

const position = 'type*value';

const config = {
  chart: {
    autoFit: true,
    height: 300,
  },
  scale: ['value', { nice: true }],
  tooltip: {
    enterable: true,
    showContent: true,
    showMarkers: false,
    // shared: true,
  },
};

export const ColumnWithTs = Template.bind({});

const ColumnWithTsArgs2 = {
  legends: ['步步盈增'],
  data: dataWithTs,
  config: {
    chart: {
      autoFit: true,
      height: 300,
    },
    scale:['value', { nice: true }],
    column: {
      position: 'ts*value',
      color: 'color',
    },
    axises: [tsLabelConfig, valueLabelConfig,['tgi',false]],
    // axis: {
    //   tgi:false,
    //   value:{
    //     position:'left'
    //   }
    // },
    //['value',{
    //   position:'left'
    // }]
    axis:[['tgi', false]],
    tooltip: tooltipConfig,
    point:{
      position:'ts*tgi',
      color:'#1248E9',
      shape:'circle',
      size:8
    },
    annotation:{
      line:{
        start: ['start', 100],
        end: ['end', 100],
        style: {
          stroke: '#7B819C',
          lineWidth: 1,
          lineDash: [9, 7],
        },
        text: {
          position: 'end',
          style: {
            fill: '#7B819C',
            fontSize: 20,
            fontWeight: 'normal',
          },
          content: 'TGI 100',
          offsetY: -7,
        offsetX:-110,

        },
      }
    },
  },
};
ColumnWithTs.args = { ...ColumnWithTsArgs2 };
ColumnWithTs.storyName = '标记线';