import { ComponentStory } from '@storybook/react';
import { Area } from '../../../area';
import { AreaStack } from '../../../area/demos/Area.stories';
import Card from '../../../demos/card';
import Docs from './Loading.mdx';

export default {
  title: 'Components/Loading',
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

const Template: ComponentStory<typeof Area> = (args) => (
  <Card>
    <Area {...args} />
  </Card>
);

export const Loading = Template.bind({});
Loading.args = {
  ...AreaStack.args,
  loading: true,
};
Loading.storyName = 'Default';
