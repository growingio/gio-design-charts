import { ComponentStory } from '@storybook/react';
import Area from '../Area';
import { dataWithDash, dataWithOneLine } from '../../line/demos/data';
import Card from '../../demos/card';
import Docs from './Area.mdx';
import { percentData } from '../../column/demos/data';

export default {
  title: 'Charts/面积图 Area Chart',
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
          return val + ' °C';
        },
      },
    },
  ],
};
export const AreaWithSample = Template.bind({});
AreaWithSample.storyName = '面积图';
const AreaWithSampleArgs = {
  legends: ['北京'],
  data: dataWithOneLine,
  config: {
    ...config,
    area: {
      position,
      color: 'city',
      area: position,
    },
  },
};

AreaWithSample.args = { ...AreaWithSampleArgs };

export const AreaStack = Template.bind({});
AreaStack.storyName = '堆积面积图';
const AreaStackArgs = {
  legends: ['长春', '哈尔滨', '石家庄'],
  data: dataWithDash,
  config: {
    ...config,
    area: {
      position,
      color: 'city',
      area: position,
      adjust: ['stack'],
    },
  },
};

AreaStack.args = { ...AreaStackArgs };

export const PercentArea = Template.bind({});
const PercentAreaArgs = {
  legends: ['Facebook', 'Apple', 'Google'],
  data: percentData,
  config: {
    ...config,
    axis: [
      'value',
      {
        label: {
          formatter: (val: string) => {
            return val + '%';
          },
        },
      },
    ],
    scale: [
      {
        type: {
          range: [0, 1],
        },
        value: {
          nice: true,
        },
      },
    ],
    area: {
      position: 'type*value',
      color: 'company',
      adjust: ['stack'],
    },
  },
};

PercentArea.args = { ...PercentAreaArgs };
PercentArea.storyName = '百分比面积图';
