import { ComponentStory } from '@storybook/react';
import { Line } from '../../../line';
import { BaiscLine } from '../../../line/demos/Line.stories';
import Card from '../../../demos/card';
import Docs from './Loading.mdx';

export default {
  title: 'Components/Loading',
  component: Line,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
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

export const Loading = Template.bind({});
Loading.args = {
  ...BaiscLine.args,
  loading: true,
};
Loading.storyName = 'Default';
