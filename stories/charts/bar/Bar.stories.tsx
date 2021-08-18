import { ComponentStory } from '@storybook/react';
import { BarChart } from '../../../src';
import Card from '../../components/card';
import { dataWithGroup, percentData } from '../column/data';
import { data, dataWithMulti, dataWithMultiContrast } from './data';
import Docs from './Bar.mdx';

export default {
  title: 'Charts/条形图 Bar Chart',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: BarChart,
  parameters: {
    docs: {
      page: Docs,
    },
  },
};

const Template: ComponentStory<typeof BarChart> = (args) => (
  <Card>
    <BarChart {...args} />
  </Card>
);

const config = {
  chart: {
    autoFit: true,
    height: 300,
  },
  tooltip: {
    enterable: true,
    showContent: true,
    // shared: true,
  },
};

export const BarDefault = Template.bind({});
const BarDefaultArgs = {
  legends: [],
  data: dataWithMulti,
  config: {
    ...config,
    axises: [
      [
        'value',
        {
          grid: null,
          label: null,
        },
      ],
      [
        'tyep',
        {
          grid: null,
        },
      ],
    ],
    bar: {
      position: 'name*value',
      color: 'name',
      label: [
        'value',
        {
          style: {
            fill: '#8d8d8d',
          },
          offset: 10,
        },
      ],
    },
  },
};
BarDefault.args = { ...BarDefaultArgs };
// export const BarDefaultExample = () => <BarDefault {...BarDefaultArgs} />;
BarDefault.storyName = '条形图';

export const BarMulti = Template.bind({});
const BarMultiArgs = {
  legends: [
    '金融保险',
    '医疗卫生',
    '社会公共管理',
    'IT 通讯电子',
    '教育',
    '建筑房地产',
    '交通运输与仓储邮政',
    '住宿旅游',
    '建材家居',
    '汽车',
  ],
  data,
  config: {
    ...config,
    axis: [
      'value',
      {
        grid: null,
        label: null,
      },
    ],
    bar: {
      position: 'type*value',
      color: 'type',
      label: [
        'value',
        {
          style: {
            fill: '#8d8d8d',
          },
          offset: 10,
        },
      ],
    },
  },
};
BarMulti.args = { ...BarMultiArgs };
// export const BarMultiExample = () => <BarMulti {...BarMultiArgs} />;
BarMulti.storyName = '多条条形图';

export const GroupContrast = Template.bind({});
const GroupContrastArgs = {
  legends: [{ name: '本月' }, { name: '上月', dashed: true }],
  data: dataWithMultiContrast,
  config: {
    ...config,
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
          grid: null,
        },
      ],
    ],
    legend: false,
    bar: {
      position: 'name*value',
      color: 'name',
      adjust: [
        {
          type: 'dodge',
          marginRatio: 0,
          dodgeBy: 'type',
        },
      ],
      label: [
        'value',
        {
          style: {
            fill: '#8d8d8d',
          },
          offset: 10,
        },
      ],
    },
  },
};
GroupContrast.args = { ...GroupContrastArgs };
GroupContrast.storyName = '分组对比图';

export const BarWithGroup = Template.bind({});
const barWithGroupArgs = {
  legends: ['Apple', { name: 'Facebook', dashed: true }, 'Google'],
  data: dataWithGroup,
  config: {
    ...config,
    scale: ['value', { max: 70, min: 0 }],
    axis: [
      'value',
      {
        grid: null,
        label: null,
      },
    ],
    bar: {
      position: 'type*value',
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

export const StackingDiagramBar = Template.bind({});
const StackingDiagramBarArgs = {
  legends: ['Apple', 'Facebook', 'Google'],
  data: dataWithGroup,
  config: {
    ...config,
    axis: [
      'value',
      {
        grid: null,
        label: null,
      },
    ],
    scale: ['value', { max: 200, min: 0 }],
    bar: {
      position: 'type*value',
      color: 'company',
      adjust: 'stack',
    },
  },
};
StackingDiagramBar.args = StackingDiagramBarArgs;
StackingDiagramBar.storyName = '堆积条形图';

export const PercentBar = Template.bind({});
const PercentBarArgs = {
  legends: ['Apple', 'Facebook', 'Google'],
  data: percentData,
  config: {
    ...config,
    scale: ['value', { max: 100, min: 0 }],
    axis: [
      'value',
      {
        label: {
          formatter: (val: string) => {
            return `${val}%`;
          },
        },
      },
    ],
    bar: {
      position: 'type*value',
      color: 'company',
      adjust: 'stack',
    },
  },
};
PercentBar.args = PercentBarArgs;
// export const PercentBarExample = () => <PercentBar {...PercentBarArgs} />;
PercentBar.storyName = '百分比堆积条形图';
