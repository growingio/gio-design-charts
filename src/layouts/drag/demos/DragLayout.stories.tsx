import DragLayout from '../DragLayout';
import { ComponentStory } from '@storybook/react';

import DragBar from '../../../bar/DragBar';
import Card from '../../../demos/card';
import { ScrollGroupContrast, ScrollPercentBar } from '../../../bar/demos/Bar.stories';

export default {
  title: 'Components/Layouts/Drag',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: DragLayout,
  parameters: {
    docs: {
      page: null,
    },
  },
};

const ScrollTemplate: ComponentStory<typeof DragBar> = (args) => (
  <Card>
    <DragBar {...args} />
  </Card>
);

export const Example = ScrollTemplate.bind({});
Example.args = { ...ScrollPercentBar.args };

export const GroupedExample = ScrollTemplate.bind({});
GroupedExample.args = { ...ScrollGroupContrast.args };
