import { ComponentStory } from '@storybook/react';
import Bar from '../Bar';
import ScrollBar from '../ScrollBar';

import Card from '../../demos/card';
import { dataWithGroup, percentData } from '../../column/demos/data';
import { data, dataWithMulti, dataWithMultiContrast } from './data';
import Docs from './Bar.mdx';
import { cloneDeep } from 'lodash';
import { formatNumber } from '../..';
import { AdjustType } from '@antv/g2/lib/interface';

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
const position = 'type*value';
const Template: ComponentStory<typeof Bar> = (args) => (
  <Card>
    <Bar {...args} />
  </Card>
);

const ScrollTemplate: ComponentStory<typeof Bar> = (args) => (
  <Card>
    <ScrollBar {...args} />
  </Card>
);

const config = {
  tooltip: {
    enterable: false,
    showMarkers: false,
    position: 'right',
    offset: 5,
    // shared: true,
  },
};

const labelConfig = [
  'value',
  {
    content: (labelData: any) => {
      return formatNumber(labelData.value);
    },
    offset: 6,
  },
];

export const BarDefault = Template.bind({});
const BarDefaultArgs = {
  legends: [],
  data: dataWithMulti,
  config: {
    ...config,

    chart: {
      autoFit: true,
      height: 300,
    },
    axises: [
      [
        'value',
        {
          grid: null,
          label: null,
          line: null,
        },
      ],
      [
        'name',
        {
          grid: null,
          tickLine: null,
          line: null,
        },
      ],
    ],
    bar: {
      position: 'name*value',
      color: 'name',
      label: labelConfig,
    },
  },
};
BarDefault.args = { ...BarDefaultArgs };
BarDefault.storyName = '条形图';

export const ScrollBarDefault = ScrollTemplate.bind({});
ScrollBarDefault.args = cloneDeep(BarDefaultArgs);
ScrollBarDefault.storyName = '条形图(滚动模式)';

export const BarMulti = Template.bind({});
const BarMultiArgs = {
  legends: [],
  data,
  config: {
    ...config,

    chart: {
      autoFit: true,
      height: 300,
    },
    axises: [
      [
        'value',
        {
          grid: null,
          label: null,
        },
      ],
      [
        'type',
        {
          line: null,
          tickLine: null,
        },
      ],
    ],
    bar: {
      position,
      color: 'type',
      label: labelConfig,
    },
  },
};
BarMulti.args = { ...BarMultiArgs };
BarMulti.storyName = '多条条形图';

export const ScrollBarMulti = ScrollTemplate.bind({});
ScrollBarMulti.args = cloneDeep(BarMultiArgs);
ScrollBarMulti.storyName = '多条条形图(滚动模式)';

export const GroupContrast = Template.bind({});
const GroupContrastArgs = {
  legends: [{ name: '本月' }, { name: '上月', dashed: true }],
  data: dataWithMultiContrast,
  config: {
    ...config,
    chart: {
      autoFit: true,
      height: 300,
    },
    axises: [
      [
        'value',
        {
          grid: null,
          label: null,
        },
      ],
      [
        'name',
        {
          line: null,
          tickLine: null,
        },
      ],
    ],
    legend: false,
    bar: {
      position: 'name*value',
      color: 'name',
      adjust: [
        {
          type: 'dodge' as AdjustType,
          marginRatio: 0,
          dodgeBy: 'type',
        },
      ],
      label: labelConfig,
    },
  },
};
GroupContrast.args = { ...GroupContrastArgs };
GroupContrast.storyName = '分组对比图';

export const ScrollGroupContrast = ScrollTemplate.bind({});
ScrollGroupContrast.args = cloneDeep(GroupContrastArgs);
ScrollGroupContrast.storyName = '分组对比图(滚动模式)';

export const BarWithGroup = Template.bind({});
const barWithGroupArgs = {
  legends: ['Apple', { name: 'Facebook', dashed: true }, 'Google'],
  data: dataWithGroup,
  config: {
    ...config,
    chart: {
      autoFit: true,
      height: 300,
    },
    scale: ['value', { max: 70, min: 0 }],
    axises: [
      [
        'value',
        {
          grid: null,
          label: null,
        },
      ],
      [
        'type',
        {
          line: null,
          tickLine: null,
        },
      ],
    ],
    bar: {
      position,
      color: 'company',
      adjust: [
        {
          type: 'dodge',
          marginRatio: 0,
        },
      ],
    },
  },
};
BarWithGroup.args = barWithGroupArgs;
BarWithGroup.storyName = '分组条形图';

export const ScrollBarWithGroup = ScrollTemplate.bind({});
ScrollBarWithGroup.args = cloneDeep(barWithGroupArgs);
ScrollBarWithGroup.storyName = '分组条形图(滚动模式)';

export const StackingDiagramBar = Template.bind({});
const StackingDiagramBarArgs = {
  legends: ['Apple', 'Facebook', 'Google'],
  data: dataWithGroup,
  config: {
    ...config,
    chart: {
      autoFit: true,
      height: 300,
    },
    axises: [
      [
        'value',
        {
          grid: null,
          label: null,
        },
      ],
      [
        'type',
        {
          line: null,
          tickLine: null,
        },
      ],
    ],
    scale: ['value', { max: 200, min: 0 }],
    bar: {
      position,
      color: 'company',
      adjust: 'stack',
    },
  },
};
StackingDiagramBar.args = StackingDiagramBarArgs;
StackingDiagramBar.storyName = '堆积条形图';

export const ScrollStackingDiagramBar = ScrollTemplate.bind({});
ScrollStackingDiagramBar.args = cloneDeep(StackingDiagramBarArgs);
ScrollStackingDiagramBar.storyName = '堆积条形图(滚动模式)';

export const PercentBar = Template.bind({});
const PercentBarArgs = {
  legends: ['Apple', 'Facebook', 'Google'],
  data: percentData,
  config: {
    ...config,
    chart: {
      autoFit: true,
      height: 300,
    },
    scale: ['value', { max: 100, min: 0 }],
    axises: [
      [
        'value',
        {
          grid: null,
          label: null,
          // label: {
          //   formatter: (val: string) => {
          //     return `${val}%`;
          //   },
          // },
        },
      ],
      [
        'type',
        {
          line: null,
          tickLine: null,
        },
      ],
    ],
    bar: {
      position,
      color: 'company',
      adjust: 'stack',
    },
  },
};
PercentBar.args = PercentBarArgs;
PercentBar.storyName = '百分比堆积条形图';

export const ScrollPercentBar = ScrollTemplate.bind({});
ScrollPercentBar.args = cloneDeep(PercentBarArgs);
ScrollPercentBar.storyName = '百分比堆积条形图(滚动模式)';
