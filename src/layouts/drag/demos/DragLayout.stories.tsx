import DragLayout from '../DragLayout';
import { ComponentStory } from '@storybook/react';

import DragBar from '../../../bar/DragBar';
import Card from '../../../demos/card';
import { ScrollGroupContrast, ScrollPercentBar } from '../../../bar/demos/Bar.stories';

import Docs from './DragLayout.mdx';
import { useState } from 'react';

export default {
  title: 'Components/Layouts/Drag',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: DragLayout,
  parameters: {
    docs: {
      page: Docs,
    },
  },
};

const ScrollTemplate: ComponentStory<typeof DragBar> = (args) => {
  const { data, config } = args;
  const [reData, setReData] = useState(data);
  const onRes = () => {
    setReData([...reData.reverse()]);
  };
  return (
    <Card>
      <button onClick={onRes}>Reverse</button>
      <DragBar {...args} data={reData} config={{ ...config }} />
    </Card>
  );
};

export const Example = ScrollTemplate.bind({});
Example.args = { ...ScrollPercentBar.args, title: '拖拽条形图' };
Example.storyName = '拖拽条形图';

export const GroupedExample = ScrollTemplate.bind({});
GroupedExample.args = { ...ScrollGroupContrast.args };
GroupedExample.storyName = '拖拽分组条形图';

export const TitleGroupedExample = ScrollTemplate.bind({});
TitleGroupedExample.args = { ...ScrollGroupContrast.args, content: { title: '步步盈增的用户总量', total: 213678 } };
TitleGroupedExample.storyName = '多维度拖拽条形图';
