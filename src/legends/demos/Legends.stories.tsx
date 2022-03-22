import { ChartType } from '../../interfaces';
import { LegendObject } from '../useLegends';
import Legends from '../Legends';
import Docs from './Legends.mdx';
import { ComponentStory } from '@storybook/react';

export default {
  title: 'Components/Legends',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: Legends,
  parameters: {
    docs: {
      page: Docs,
    },
  },
};

const shortlegendList = ['北京', '上海', '杭州', '重庆', '天津'];

const Template: ComponentStory<typeof Legends> = (args) => <Legends {...args} />;

export const lineLegends = Template.bind({});
lineLegends.args = {
  legends: new LegendObject({ type: ChartType.LINE }, shortlegendList).quene,
};
lineLegends.storyName = '线图图例';

const contrastLegends = [
  { name: '北京', color: '#5F87FF' },
  { name: '北京（上月）', color: '#5F87FF', dashed: true },
  { name: '上海', color: '#FFDD63' },
  { name: '上海（上月）', color: '#FFDD63', dashed: true },
  { name: '广州', color: '#62CE6C' },
  { name: '广州（上月）', color: '#62CE6C', dashed: true },
];
export const lineContrastLegends = Template.bind({});
lineContrastLegends.args = {
  legends: new LegendObject({ type: ChartType.LINE }, contrastLegends).quene,
  offsetWidth: 1000,
};
lineContrastLegends.storyName = '线图图例(同一维度不同时间对比）';

const longLegendLast = [
  'growingio.com/user',
  'growingio.com/user2',
  'growingio.com/user3',
  'growingio.com/user4',
  'growingio.com/user5',
  'growingio.com/user6',
  'growingio.com/user7',
  'growingio.com/user8',
];

export const lineLongLegends = Template.bind({});
lineLongLegends.args = {
  legends: new LegendObject({ type: ChartType.LINE }, longLegendLast).quene,
};
lineLongLegends.storyName = '线图图例（其他）';

export const barLegends = Template.bind({});
barLegends.args = {
  legends: new LegendObject({ type: ChartType.BAR }, shortlegendList).quene,
};
barLegends.storyName = '方块图例';

export const barLongLegends = Template.bind({});
barLongLegends.args = {
  legends: new LegendObject({ type: ChartType.BAR }, longLegendLast).quene,
};
barLongLegends.storyName = '方块图例（其他）';
