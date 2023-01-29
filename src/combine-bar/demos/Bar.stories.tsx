import { ComponentStory } from '@storybook/react';
import CombineBar from '../CombineBar';

import Card from '../../demos/card';
import { dataWithGroup, percentData } from '../../column/demos/data';
import { data, dataWithMulti, dataWithMultiContrast, sortData } from './data';
import Docs from './Bar.mdx';
import { cloneDeep } from 'lodash';
import { formatNumber } from '../..';
import { AdjustType } from '@antv/g2/lib/interface';

export default {
  title: 'Charts/组合图表 CombineBar',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: CombineBar,
 
};
const position = 'type*value';
const Template: ComponentStory<typeof CombineBar> = (args) => (
  <Card>
    <CombineBar {...args} />
  </Card>
);

const config = {
  tooltip: {
    enterable: false,
    showMarkers: false,
    position: 'right',
    offset: 5,
    // shared: true,
  },

  scale: ['value', { range: [0, 1] }],
};

const labelConfig = [
  'value',
  {
    content: (labelData: any) => {
      return formatNumber(labelData.value);
    },
    // type: 'interval-bar-label',
    offset: 6,
  },
];

export const BarDefault = Template.bind({});
const BarDefaultArgs = {
  legends: [
    { name: '目标群组', color: '#5F87FF', pointColor: '#1248E9' },
    { name: '目标群组TGI', alias: '目标群组TGI', color: '#1248E9', shapeType: 'circle' },
    { name: '对照组', color: '#FFDD63', pointColor: '#FAA937' },
    { name: '对照组TGI', alias: '对照组TGI', color: '#FAA937', shapeType: 'circle' },
  ],
  data: [
    {
        "dimensionValue": "崔宜",
        "userCount": 59,
        "tgi": 547.7632,
        "name": "用户量",
        "group": "目标群组"
    },
    {
        "dimensionValue": "崔宜",
        "userCount": 59,
        "tgi": 102.58748,
        "name": "用户量",
        "group": "对照组"
    },
    {
        "dimensionValue": "LoganCarpenter",
        "userCount": 59,
        "tgi": 547.7632,
        "name": "用户量",
        "group": "目标群组"
    },
    {
        "dimensionValue": "LoganCarpenter",
        "userCount": 59,
        "tgi": 102.58748,
        "name": "用户量",
        "group": "对照组"
    },
    {
        "dimensionValue": "涂友娜",
        "userCount": 56,
        "tgi": 547.7632,
        "name": "用户量",
        "group": "目标群组"
    },
    {
        "dimensionValue": "涂友娜",
        "userCount": 56,
        "tgi": 102.58748,
        "name": "用户量",
        "group": "对照组"
    },
    {
        "dimensionValue": "闵燕",
        "userCount": 53,
        "tgi": 547.7632,
        "name": "用户量",
        "group": "目标群组"
    },
    {
        "dimensionValue": "闵燕",
        "userCount": 53,
        "tgi": 102.58748,
        "name": "用户量",
        "group": "对照组"
    },
    {
        "dimensionValue": "AliceVaughn",
        "userCount": 51,
        "tgi": 547.7632,
        "name": "用户量",
        "group": "目标群组"
    },
    {
        "dimensionValue": "AliceVaughn",
        "userCount": 51,
        "tgi": 102.58748,
        "name": "用户量",
        "group": "对照组"
    }
],
  config: {
    ...config,
    chart: {
      autoFit: true,
      height: 300,
    },
    bar: {
      position: 'dimensionValue*userCount',
      color: 'group',
      adjust: [{ type: 'dodge' }],
      label: labelConfig,
    },
    axises: [['userCount',false],['tgi',false]],
    point:{
      position:'dimensionValue*tgi',
      color: 'group',
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
      },
      text:{
        position:{tgi:100},
        content:'TGI 100',
          style: {
            fill: '#8c8c8c',
            fontSize: 20,
            fontWeight: 'normal',
          },
        rotate:0,
        isVertical:true,
        offsetY: -280,
          offsetX:10,
      }
    },
  },
};
BarDefault.args = { ...BarDefaultArgs };
BarDefault.storyName = '条形图';
