import { ComponentStory } from '@storybook/react';
import { BarChart } from '../../../index';
import Card from '../../components/card';
import { dataWithGroup, percentData } from '../column/data';
import { data } from './data';
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
  scale: ['value', { max: 1400, min: 0, alias: '销量（百万）' }],
  tooltip: {
    enterable: true,
    showContent: true,
    // shared: true,
  },
};

export const BarDefault = Template.bind({});
const BarDefaultArgs = {
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
BarDefault.args = { ...BarDefaultArgs };
// export const BarDefaultExample = () => <BarDefault {...BarDefaultArgs} />;
BarDefault.storyName = '条形图';

export const BarWithGroup = Template.bind({});
const barWithGroupArgs = {
  legends: ['Apple', { name: 'Facebook', dashed: true }, 'Google'],
  data: dataWithGroup,
  config: {
    ...config,
    scale: ['value', { max: 70, min: 0 }],
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
// export const BarWithGroupExample = () => <BarWithGroup {...barWithGroupArgs} />;
// BarWithGroupExample.storyName = '分组条形图';

export const StackingDiagramBar = Template.bind({});
const StackingDiagramBarArgs = {
  legends: ['Apple', 'Facebook', 'Google'],
  data: dataWithGroup,
  config: {
    ...config,
    scale: ['value', { max: 200, min: 0 }],
    bar: {
      position: 'type*value',
      color: 'company',
      adjust: 'stack',
    },
  },
};
StackingDiagramBar.args = StackingDiagramBarArgs;
// export const StackingDiagramBarExample = () => <StackingDiagramBar {...StackingDiagramBarArgs} />;
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
