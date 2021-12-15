import { ComponentStory } from '@storybook/react';
import Card from '../../demos/card';
import TimeIntervalBar from '../TimeIntervalBar';

import { BarMulti, BarWithGroup, GroupContrast } from './Bar.stories';

import Bar from '../Bar';
import Docs from './Bar.mdx';
import { data4Interval, dataWithGroup4Interval, dataWithMultiContrast4Interval } from './data';

export default {
  title: 'Charts/条形图 Bar',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: Bar,
  parameters: {
    docs: {
      page: Docs,
    },
  },
};

const Template: ComponentStory<typeof TimeIntervalBar> = (args) => (
  <Card>
    <TimeIntervalBar {...args} />
  </Card>
);

export const Basic = Template.bind({});
Basic.args = { ...BarMulti.args, data: data4Interval, fullHeight: true };
Basic.storyName = 'TimeIntervalBar';

export const Contrast = Template.bind({});
Contrast.args = { ...GroupContrast.args, data: dataWithMultiContrast4Interval };
Contrast.storyName = 'TimeIntervalBar 对比';

export const Group = Template.bind({});
Group.args = { ...BarWithGroup.args, data: dataWithGroup4Interval, fullHeight: true };
Group.storyName = 'TimeIntervalBar 分组';
