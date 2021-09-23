import { ComponentStory } from '@storybook/react';
import Line from '../Line';
import { dataWithOneLine, dataWithMenu, dataWithOnelineDate, dataWithTwoLine } from './data';
import Card from '../../demos/card';
import Docs from './Line.mdx';
import { colors } from '../../theme';
import { formatNumber, InfoCard } from '../..';
import { formatDateByTs } from '../../utils/formatDate';

export default {
  title: 'Charts/折线图 Line',
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

export const BaiscLine = Template.bind({});
const BaiscLineArgs = {
  legends: ['步步盈增'],
  data: dataWithOneLine,
  config: {
    ...config,
    scales: [
      [
        'value',
        {
          tickCount: 10,
          min: 0,
        },
      ],
      ['tm', { range: [0, 1] }],
    ],
    axises: [
      [
        'value',
        {
          label: {
            formatter: (val: string) => formatNumber(Number(val)),
          },
        },
      ],
      ['tm', { tickLine: null }],
    ],
    line: {
      position: 'tm*value',
      color: 'type',
    },
  },
};
BaiscLine.storyName = '基础折线图';
BaiscLine.args = { ...BaiscLineArgs };

export const ContrastLine = Template.bind({});
const ContrastLineArgs = {
  legends: [
    {
      name: '步步盈增',
      color: colors[0],
    },
    {
      name: '步步盈增（上个月）',
      lineDash: true,
      color: colors[0],
    },
  ],
  data: dataWithTwoLine,
  config: {
    ...config,
    scales: [
      [
        'value',
        {
          tickCount: 10,
          min: 0,
        },
      ],
      ['tm', { range: [0, 1] }],
    ],
    axises: [
      [
        'value',
        {
          label: {
            formatter: (val: string) => formatNumber(Number(val)),
          },
        },
      ],
      ['tm', { tickLine: null }],
    ],
    line: {
      position: 'tm*value',
      color: 'type',
    },
  },
};

ContrastLine.args = { ...ContrastLineArgs };
ContrastLine.storyName = '对比折线图';

export const MultiLine = Template.bind({});
const MultiLineArgs = {
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
MultiLine.args = { ...MultiLineArgs };
MultiLine.storyName = '多纬度折线图';

export const LineWithOneLineDate = Template.bind({});

const LineWithOneLineDateConfig = {
  chart: {
    autoFit: true,
    height: 400,
  },
  scale: [
    {
      date: {
        range: [0, 1],
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
    render: (options: any) => {
      return <InfoCard {...options} title={formatDateByTs(options.title)} />;
    },
  },
  axises: [
    [
      'value',
      {
        label: {
          formatter: (val: string) => {
            return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          },
        },
      },
    ],
    [
      'date',
      {
        label: {
          formatter: (text: string) => {
            return formatDateByTs(text);
          },
        },
      },
    ],
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
