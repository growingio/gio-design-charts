import { ComponentStory } from '@storybook/react';
import { ComparativeFunnelChart } from '../../../components/funnel';
import { FunnelChart } from '../../../index';
import Card from '../../components/card';
import { dataWithMultiBar } from '../column/data';

import { dataWith3Columns, dataWith6Columns, dataWith7Columns, dataWithBasicFunnel } from './data';

export default {
  title: 'Charts/漏斗图 Funnel Chart',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template: ComponentStory<typeof FunnelChart> = (args) => (
  <Card>
    <FunnelChart {...args} />
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
    shared: true,
  },
};

export const FunnelWithLink = Template.bind({});
const FunnelWithLinkArgs = {
  legends: ['Apple', 'Google', '阿里巴巴', '腾讯', '百度', '网易', 'Microsoft', '字节跳动'],
  data: dataWithMultiBar,
  config: {
    ...config,
    funnel: {
      position: 'company*value',
      color: 'company',
    },
  },
};
FunnelWithLink.storyName = '漏斗图探索';
FunnelWithLink.args = FunnelWithLinkArgs;

const ComparativeTemplate: ComponentStory<typeof FunnelChart> = (args) => (
  <Card>
    <ComparativeFunnelChart {...args} />
  </Card>
);

export const FunnelWithBasic = ComparativeTemplate.bind({});
const FunnelWithBasicArgs = {
  legends: [],
  data: dataWithBasicFunnel,
  config: {
    ...config,
    funnel: {
      position: 'type*value',
      color: 'type',
    },
  },
};
FunnelWithBasic.storyName = '占位柱子';
FunnelWithBasic.args = FunnelWithBasicArgs;

export const FunnelWith3Columns = ComparativeTemplate.bind({});
const FunnelWith3ColumnsArgs = {
  legends: [],
  data: dataWith3Columns,
  config: {
    ...config,
    funnel: {
      position: 'type*value',
      color: 'type',
      label: [
        'value',
        {
          type: 'interval-label',
          style: {
            fill: '#343434',
          },
        },
      ],
    },
  },
};
FunnelWith3Columns.storyName = '基础漏斗';
FunnelWith3Columns.args = FunnelWith3ColumnsArgs;

export const FunnelWith6Columns = ComparativeTemplate.bind({});
const FunnelWith6ColumnsArgs = {
  legends: [],
  data: dataWith6Columns,
  config: {
    ...config,
    funnel: {
      position: 'type*value',
      color: 'type',
      label: [
        'value',
        {
          type: 'interval-label',
          style: {
            fill: '#343434',
          },
        },
      ],
    },
  },
};
FunnelWith6Columns.storyName = '6个事件漏斗';
FunnelWith6Columns.args = FunnelWith6ColumnsArgs;

export const FunnelWith7Columns = ComparativeTemplate.bind({});
const FunnelWith7ColumnsArgs = {
  legends: [],
  data: dataWith7Columns,
  config: {
    ...config,
    funnel: {
      position: 'type*value',
      color: 'type',
      label: [
        'value',
        {
          type: 'interval-label',
          style: {
            fill: '#343434',
          },
        },
      ],
    },
  },
};
FunnelWith7Columns.storyName = '7个事件漏斗';
FunnelWith7Columns.args = FunnelWith7ColumnsArgs;
