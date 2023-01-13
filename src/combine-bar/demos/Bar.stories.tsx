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
  legends: [],
  data: dataWithMulti,
  config: {
    ...config,
    chart: {
      autoFit: true,
      height: 300,
    },
    bar: {
      position: 'name*value',
      color: 'name',
      label: labelConfig,
    },
    axises: [['value',false],['tgi',false]],
    point:{
      position:'name*tgi',
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
