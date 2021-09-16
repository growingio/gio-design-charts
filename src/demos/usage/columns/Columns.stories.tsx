import { ComponentStory } from '@storybook/react';
import { Column, analysisSourceData, AnalysisOptions, formatNumber } from '../../..';
import Card from '../../card';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

import activeMemberData from '../data/active-members.json';

export default {
  title: 'Usage/柱状图',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: Column,
  parameters: {
    docs: {
      page: null,
    },
  },
};

const Template: ComponentStory<typeof Column> = (args) => (
  <Card>
    <Column {...args} />
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
  data: analysisSourceData(activeMemberData, { chart: 'column', fetch: { type: '活跃人数' } } as AnalysisOptions),
  config: {
    ...config,
    column: {
      position: 'tm*NxDLPLD7',
      color: 'type',
    },
    scale: {
      NxDLPLD7: { nice: true },
    },
    axises: [
      [
        'NxDLPLD7',
        {
          label: {
            formatter: (text: string) => {
              return formatNumber(text);
            },
          },
        },
      ],
      [
        'tm',
        {
          label: {
            formatter: (text: string) => {
              return format(new Date(Number(text)), 'MM/dd EEE', { locale: zhCN });
            },
          },
        },
      ],
    ],
  },
};
ColumnWithTm.args = { ...ColumnWithTmArgs };
ColumnWithTm.storyName = 'Timestamp';
