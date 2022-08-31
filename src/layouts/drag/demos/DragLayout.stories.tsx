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
Example.args = {
  ...ScrollPercentBar.args,
  title: '拖拽条形图',
  data: [
    {
      enumValue: '6',
      x: '自然社交',
      y: 14889,
      ratio: 0.5101,
      avgOrderValue: 174.2,
      sumOrderValue: 484636.06,
      collection: null,
      stepConfig: null,
      name: '',
    },
    {
      enumValue: '1',
      x: '付费社交',
      y: 5220,
      ratio: 0.1788,
      avgOrderValue: 147.96,
      sumOrderValue: 293993.23,
      collection: null,
      stepConfig: null,
      name: '',
    },
    {
      enumValue: '0',
      x: '付费搜索',
      y: 3972,
      ratio: 0.1361,
      avgOrderValue: 159.75,
      sumOrderValue: 282113.06,
      collection: null,
      stepConfig: null,
      name: '',
    },
    {
      enumValue: '2',
      x: '付费购物',
      y: 3443,
      ratio: 0.118,
      avgOrderValue: 209.21,
      sumOrderValue: 271757.81,
      collection: null,
      stepConfig: null,
      name: '',
    },
    {
      enumValue: '3',
      x: '付费视频',
      y: 1091,
      ratio: 0.0374,
      avgOrderValue: 231.67,
      sumOrderValue: 94523.12,
      collection: null,
      stepConfig: null,
      name: '',
    },
    {
      enumValue: '4',
      x: '展示广告',
      y: 405,
      ratio: 0.0139,
      avgOrderValue: 226.48,
      sumOrderValue: 43710.36,
      collection: null,
      stepConfig: null,
      name: '',
    },
    {
      enumValue: '5',
      x: '移动推送通知',
      y: 169,
      ratio: 0.0058,
      avgOrderValue: 207.44,
      sumOrderValue: 19499.49,
      collection: null,
      stepConfig: null,
      name: '',
    },
  ],
  config: {
    chart: {
      autoFit: true,
      height: 276,
    },
    scale: {
      y: {
        nice: true,
      },
      x: {
        type: 'cat',
      },
      tm: {},
    },
    bar: {
      // x （自变量），y（因变量）
      position: `x*y`,
      color: 'name',
      label: [
        'y',
        {
          content: (labelData: any) => `${labelData.y} 人 (${(labelData.ratio * 100).toFixed(2)}%)`,
          offset: 6,
          // offsetX: 20,
          layout: {
            type: 'fixed-overlap',
            cfg: { width: '400px' },
          },
          type: 'interval-bar-label',
        },
      ],
      // adjust,
    },
    interval: {
      dodgePadding: 4,
      maxColumnWidth: 20,
      minColumnWidth: 20,
    },
    axises: [
      [
        'y',
        {
          grid: null,
          line: null,
          label: null,
        },
      ],
      [
        'x',
        {
          grid: null,
          line: null,
          tickLine: null,
          label: {
            // formatter: (text: string) => (needConversionTm ? formatDateByTs(Number(text)) : text),
          },
        },
      ],
    ],
  },
};
Example.storyName = '拖拽条形图';

export const GroupedExample = ScrollTemplate.bind({});
GroupedExample.args = { ...ScrollGroupContrast.args };
GroupedExample.storyName = '拖拽分组条形图';

export const TitleGroupedExample = ScrollTemplate.bind({});
TitleGroupedExample.args = { ...ScrollGroupContrast.args, content: { title: '步步盈增的用户总量', total: 213678 } };
TitleGroupedExample.storyName = '多维度拖拽条形图';
