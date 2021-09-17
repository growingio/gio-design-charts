import { ComponentStory } from '@storybook/react';
import Funnel from '../Funnel';
import GroupedFunnel from '../GroupedFunnel';
import Card from '../../demos/card';
import { dataWithMultiBar } from '../../column/demos/data';
import DrillDownCard from './drilldown-card';
import { dataWith3Columns, dataWith6Columns, dataWith7Columns, dataWithBasicFunnel, dataWithGroup } from './data';

import Docs from './Funnel.mdx';
import { MappingDatum } from '@antv/g2/lib/interface';
import { formatNumber, formatPercent } from '../..';

export default {
  title: 'Charts/漏斗图 Funnel Chart',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: Funnel,
  parameters: {
    docs: {
      page: Docs,
    },
  },
};

const position = 'type*value';
const intervalLabel = 'interval-label';

const Template: ComponentStory<typeof Funnel> = (args) => (
  <Card>
    <Funnel {...args} />
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

export const FunnelWithBasic = Template.bind({});
const FunnelWithBasicArgs = {
  legends: [],
  data: dataWithBasicFunnel,
  config: {
    ...config,
    funnel: {
      position,
      color: 'type',
    },
  },
};
FunnelWithBasic.storyName = '占位柱子';
FunnelWithBasic.args = FunnelWithBasicArgs;

export const FunnelWith3Columns = Template.bind({});
const FunnelWith3ColumnsArgs = {
  legends: [],
  data: dataWith3Columns,
  config: {
    ...config,
    axises: [
      [
        'value',
        {
          label: {
            formatter: (val: string) => formatPercent(val),
          },
        },
      ],
      ['type', { tickLine: null }],
    ],
    funnel: {
      position: 'type*value',
      // position,
      color: 'type',
      label: [
        'value',
        {
          content: (data: any) => {
            console.log(data);
            return formatNumber(data.count);
          },
          type: intervalLabel,
          style: {
            fill: '#343434',
          },
        },
      ],
    },
    tooltip: {
      enterable: true,
      showContent: true,
      // shared: true,
      showMarkers: false,
      render: (options: any) => {
        return <DrillDownCard options={options} />;
      },
    },
  },
};
FunnelWith3Columns.storyName = '基础漏斗';
FunnelWith3Columns.args = FunnelWith3ColumnsArgs;

export const FunnelWith6Columns = Template.bind({});
const FunnelWith6ColumnsArgs = {
  legends: [],
  data: dataWith6Columns,
  config: {
    ...config,
    funnel: {
      position,
      color: 'type',
      label: [
        'value',
        {
          type: intervalLabel,
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

export const FunnelWith7Columns = Template.bind({});
const FunnelWith7ColumnsArgs = {
  legends: [],
  data: dataWith7Columns,
  config: {
    ...config,
    funnel: {
      position,
      color: 'type',
      label: [
        'value',
        {
          type: intervalLabel,
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

const GroupTemplate: ComponentStory<typeof Funnel> = (args) => (
  <Card>
    <GroupedFunnel {...args} />
  </Card>
);

export const FunnelWithGroup = GroupTemplate.bind({});
const FunnelWithGroupArgs = {
  legends: ['北京', '上海', '南京', '深圳', '广东'],
  data: dataWithGroup,
  config: {
    ...config,
    tooltip: {
      enterable: true,
      showContent: true,
      // shared: true,
      showMarkers: false,
    },
    funnel: {
      position,
      color: 'city',
      adjust: [
        {
          type: 'dodge',
          marginRatio: 0,
        },
      ],
      label: [
        'value',
        {
          type: intervalLabel,
          style: {
            fill: '#343434',
          },
        },
      ],
    },
  },
};
FunnelWithGroup.storyName = '分组漏斗';
FunnelWithGroup.args = FunnelWithGroupArgs;
