import { ComponentStory } from '@storybook/react';
import { ColumnChart, analysisSourceData } from '../../../src';
import Card from '../../components/card';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

import activeMemberData from '../data/active-members.json';

export default {
  title: 'Usage/柱状图',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: ColumnChart,
  parameters: {
    docs: {
      page: null,
    },
  },
};

const Template: ComponentStory<typeof ColumnChart> = (args) => (
  <Card>
    <ColumnChart {...args} />
  </Card>
);

const config = {
  chart: {
    autoFit: true,
    height: 300,
  },
  scale: ['value', { nice: true }],
  tooltip: {
    enterable: true,
    showContent: true,
    // shared: true,
  },
};

export const ColumnWithTm = Template.bind({});
const ColumnWithTmArgs = {
  legends: ['活跃人数'],
  data: analysisSourceData(activeMemberData, { chart: 'column', fetch: { type: '活跃人数' } }),
  config: {
    ...config,
    column: {
      position: 'tm*NxDLPLD7',
      color: 'type',
    },
    scale: {
      NxDLPLD7: { nice: true },
      tm: {
        type: 'identity',
      },
    },
    axis: [
      'tm',
      {
        label: {
          formatter: (text: string, item: any, index: number) => {
            return format(new Date(Number(text)), 'MM/dd EEE', { locale: zhCN });
          },
        },
      },
    ],
  },
};
ColumnWithTm.args = { ...ColumnWithTmArgs };
ColumnWithTm.storyName = 'Timestamp';
