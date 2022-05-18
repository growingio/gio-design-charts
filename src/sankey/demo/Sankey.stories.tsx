import { DataSet } from '@antv/data-set';
import { ComponentStory } from '@storybook/react';
import { BaseChart } from '../../core/framework';
import Sankey, { SankeyProps } from '../Sankey';

const Template: ComponentStory<typeof Sankey> = (args: SankeyProps) => <Sankey {...args} />;

export default {
  title: 'Charts/桑吉图 Sankey',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: Sankey,
  parameters: {
    docs: {
      // page: Docs,
    },
  },
};

console.log(new BaseChart());

export const SankeyDemo = Template.bind({});

// ============= 数据准备
const DATA = {
  nodes: [
    {
      name: '首次打开',
    },
    {
      name: '结果页',
    },
    {
      name: '验证页',
    },
    {
      name: '我的',
    },
    {
      name: '朋友',
    },
    {
      name: '其他来源',
    },
    {
      name: '首页 UV',
    },
    {
      name: '我的',
    },
    {
      name: '扫一扫',
    },
    {
      name: '服务',
    },
    {
      name: '蚂蚁森林',
    },
    {
      name: '跳失',
    },
    {
      name: '借呗',
    },
    {
      name: '花呗',
    },
    {
      name: '其他流向',
    },
  ],
  links: [
    {
      source: 0,
      target: 6,
      value: 160,
    },
    {
      source: 1,
      target: 6,
      value: 40,
    },
    {
      source: 2,
      target: 6,
      value: 10,
    },
    {
      source: 3,
      target: 6,
      value: 10,
    },
    {
      source: 4,
      target: 6,
      value: 8,
    },
    {
      source: 5,
      target: 6,
      value: 27,
    },
    {
      source: 6,
      target: 7,
      value: 30,
    },
    {
      source: 6,
      target: 8,
      value: 40,
    },
    {
      source: 6,
      target: 9,
      value: 35,
    },
    {
      source: 6,
      target: 10,
      value: 25,
    },
    {
      source: 6,
      target: 11,
      value: 10,
    },
    {
      source: 6,
      target: 12,
      value: 30,
    },
    {
      source: 6,
      target: 13,
      value: 40,
    },
    {
      source: 6,
      target: 14,
      value: 45,
    },
  ],
};

SankeyDemo.args = {
  data: DATA as any,
  config: {
    chart: {
      autoFit: true,
      height: 250,
    },
    scale: {
      month: {
        range: [0, 1],
      },
      value: {
        nice: true,
      },
    },
    tooltip: {
      showCrosshairs: true,
      shared: true,
      enterable: true,
    },
    axis: [
      'value',
      {
        label: {
          formatter: (val: string) => {
            return val + ' °C';
          },
        },
      },
    ],
    sankey: {
      position: 'month*value',
      color: 'city',
    },
  } as any,
};
