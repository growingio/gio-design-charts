import { ComponentStory } from '@storybook/react';
import Line from '../Line';
import { dataWithOneLine, dataWithMenu, dataWithOnelineDate, dataWithTwoLine } from './data';
import Card from '../../demos/card';
import Docs from './Line.mdx';
import { colors } from '../../theme';

export default {
  title: 'Charts/折线图 Line Chart',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: Line,
  parameters: {
    docs: {
      page: Docs,
    },
  },
};

const Template: ComponentStory<typeof Line> = (args) => (
  <Card>
    <Line {...args} />
  </Card>
);

const config = {
  chart: {
    autoFit: true,
    height: 300,
  },
  scale: [
    {
      month: {
        range: [0, 1],
      },
      value: {
        nice: true,
      },
    },
  ],
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
  line: {
    position: 'month*value',
    color: 'city',
  },
};

export const LineWithOneLine = Template.bind({});
const LineWithOneLineArgs = {
  legends: ['北京'],
  data: dataWithOneLine,
  config,
};
LineWithOneLine.storyName = '基础折线图';
LineWithOneLine.args = { ...LineWithOneLineArgs };

export const LineWithDash = Template.bind({});
const LineWithDashArgs = {
  legends: [
    {
      name: '北京',
      color: colors[0],
    },
    {
      name: '北京(去年)',
      lineDash: true,
      color: colors[0],
    },
  ],
  data: dataWithTwoLine,
  config,
};

LineWithDash.args = { ...LineWithDashArgs };
LineWithDash.storyName = '对比折线图';

export const LineWithMenu = Template.bind({});
const LineWithMenuArgs = {
  legends: [
    '北京的天气真热啊',
    '上海',
    '深证',
    '郑州的雨下的真大',
    '杭州',
    '兰州',
    '福州',
    '广州',
    '南宁',
    '长沙',
    '合肥',
    '南京',
    '长春',
    '哈尔滨',
    '石家庄',
  ],
  data: dataWithMenu,
  config,
};
LineWithMenu.args = { ...LineWithMenuArgs };
LineWithMenu.storyName = '多纬度折线图';

export const LineWithOneLineDate = Template.bind({});

const LineWithOneLineDateConfig = {
  chart: {
    autoFit: true,
    height: 400,
  },
  scale: [
    {
      date: {
        type: 'timeCat',
      },
      value: {
        min: 0,
        // type: 'quantize',
        // type: 'quantile',
        // ticks: [0, 2000, 4000, 8000, 10000],
        tickCount: 5,
        nice: true,
        formatter: (x: string) => String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      },
    },
  ],
  tooltip: {
    showCrosshairs: true,
    shared: true,
    enterable: true,
    formatter: (val: number) => val + '次',
  },
  axis: [
    'value',
    {
      label: {
        formatter: (val: string) => {
          return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
      },
    },
  ],
  line: {
    position: 'date*value',
    color: 'metric',
  },
};
const LineWithOneLineDateArgs = {
  legends: [],
  data: dataWithOnelineDate,
  config: LineWithOneLineDateConfig,
};
LineWithOneLineDate.storyName = '时间*数字';
LineWithOneLineDate.args = { ...LineWithOneLineDateArgs };
