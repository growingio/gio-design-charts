import { ComponentStory } from '@storybook/react';
import Area from '../Area';
import { dataWithOneLine } from '../../line/demos/data';
import Card from '../../demos/card';
import Docs from './Area.mdx';
import { stackAreaData, stackAreaPrecentData } from './data';
import { formatNumber, formatPercent, InfoCard } from '../..';

export default {
  title: 'Charts/面积图 Area',
  component: Area,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    docs: {
      page: Docs,
    },
  },
};

const position = 'month*value';

const Template: ComponentStory<typeof Area> = (args) => (
  <Card>
    <Area {...args} />
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
          return formatNumber(Number(val));
        },
      },
    },
  ],
};

export const AreaStack = Template.bind({});
AreaStack.storyName = '堆积面积图';
const AreaStackArgs = {
  legends: [
    { name: '步步盈增', color: '#5F87FF' },
    { name: '访问退出', color: '#FFDD63' },
    { name: '页面浏览', color: '#DB7892' },
  ],
  data: stackAreaData,
  config: {
    ...config,
    scale: ['tm', { range: [0, 1] }],
    axises: [
      [
        'value',
        {
          label: {
            formatter: (val: string) => {
              return formatNumber(Number(val));
            },
          },
        },
      ],
      [
        'tm',
        {
          tickLine: null,
        },
      ],
    ],
    tooltip: {
      shared: true,
      render: (options: any) => {
        const title = options.data?.[0]?.data?.tm || options.title;
        return <InfoCard {...options} title={title} />;
      },
    },
    area: {
      position: 'tm*value',
      color: 'type',
      area: position,
      adjust: ['stack'],
    },
  },
};

AreaStack.args = { ...AreaStackArgs };

export const PercentArea = Template.bind({});
const PercentAreaArgs = {
  legends: ['步步盈增｜北京', '步步盈增｜上海', '访问退出｜北京', { name: '访问退出｜上海', color: '#FFB7AE' }],
  data: stackAreaPrecentData,
  config: {
    ...config,
    axises: [
      [
        'value',
        {
          label: {
            formatter: (val: string) => formatPercent(val),
          },
        },
      ],
      [
        'tm',
        {
          tickLine: null,
        },
      ],
    ],
    scale: [
      {
        tm: {
          range: [0, 1],
        },
        value: {
          nice: true,
        },
      },
    ],
    tooltip: {
      shared: true,
      formatter: (val: string) => formatPercent(val, 2, true),
      render: (options: any) => {
        const title = options.data?.[0]?.data?.tm || options.title;
        return <InfoCard {...options} title={title} />;
      },
    },
    area: {
      position: 'tm*value',
      color: 'type',
      adjust: ['stack'],
    },
  },
};

PercentArea.args = { ...PercentAreaArgs };
PercentArea.storyName = '百分比面积图';
