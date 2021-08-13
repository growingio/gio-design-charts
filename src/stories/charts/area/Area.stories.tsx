import { ComponentStory } from '@storybook/react';
import { AreaChart } from '../../../index';
import { dataWithDash, dataWithOneLine } from '../line/data';
import Card from '../../components/card';
import Docs from './Area.mdx';
import { percentData } from '../column/data';

export default {
  title: 'Charts/面积图 Area Chart',
  component: AreaChart,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    docs: {
      page: Docs,
    },
  },
};

const Template: ComponentStory<typeof AreaChart> = (args) => (
  <Card>
    <AreaChart {...args} />
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
      temperature: {
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
    'temperature',
    {
      label: {
        formatter: (val: string) => {
          return val + ' °C';
        },
      },
    },
  ],
};
export const LineWithArea = Template.bind({});
LineWithArea.storyName = '面积图';
const LineWithAreaArgs = {
  legends: ['北京'],
  data: dataWithOneLine,
  config: {
    ...config,
    area: {
      position: 'month*temperature',
      color: 'city',
      area: 'month*temperature',
    },
  },
};

LineWithArea.args = { ...LineWithAreaArgs };

export const LineWithMultiArea = Template.bind({});
LineWithMultiArea.storyName = '堆积面积图';
const LineWithMultiAreaArgs = {
  legends: ['长春', '哈尔滨', '石家庄'],
  data: dataWithDash,
  config: {
    ...config,
    area: {
      position: 'month*temperature',
      color: 'city',
      area: 'month*temperature',
      adjust: ['stack'],
    },
  },
};

LineWithMultiArea.args = { ...LineWithMultiAreaArgs };

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
