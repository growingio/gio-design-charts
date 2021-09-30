import { ComponentStory } from '@storybook/react';
import TinyArea from '../TinyArea';
import Card from '../../demos/card';
import Docs from './TinyArea.mdx';

export default {
  title: 'Charts/迷你面积图 TinyArea',
  component: TinyArea,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    docs: {
      page: Docs,
    },
  },
};

const Template: ComponentStory<typeof TinyArea> = (args) => (
  <Card>
    <TinyArea {...args} />
  </Card>
);

export const Usage = Template.bind({});
Usage.args = {
  data: [264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513, 546, 983, 340, 539, 243, 226, 192],
  config: {
    chart: {
      autoFit: true,
      height: 60,
    },
  },
};
Usage.storyName = 'Default';
