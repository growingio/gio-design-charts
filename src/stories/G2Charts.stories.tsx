import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LineChart, BarChart } from '../G2';

import lineChartData from '../data/lineChart';
import barChartData from '../data/barChart';
import { LINEDASH_1 } from '../G2/interface';

export default {
  title: 'Example/G2 Charts',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof LineChart>;

const LineTemplate: ComponentStory<typeof LineChart> = (args) => (
  <LineChart {...args} />
);

export const Line = LineTemplate.bind({});
Line.args = {
  name: 'Line Chart',
  data: lineChartData,
  legends: [
    'Tokyo',
    {
      name: 'London',
      lineDash: LINEDASH_1,
    },
  ],
};

const BarTemplate: ComponentStory<typeof BarChart> = (args) => (
  <BarChart {...args} />
);

export const Bar = BarTemplate.bind({});
Bar.args = {
  data: barChartData,
  legends: ['Apple', 'Facebook', 'Google'],
};
