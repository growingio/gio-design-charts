import { ComponentStory } from '@storybook/react';
import Funnel from '../Funnel';
import GroupedFunnel from '../GroupedFunnel';
import Card from '../../demos/card';
import DrillDownCard from './drilldown-card';
import {
  contrastData,
  contrastGroupedData,
  dataWith3Columns,
  dataWith6Columns,
  dataWith7Columns,
  dataWithBasicFunnel,
  dataWithGroup,
} from './data';

import Docs from './Funnel.mdx';
import { formatNumber, formatPercent, InfoCard } from '../..';

export default {
  title: 'Charts/漏斗图 Funnel',
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
  tooltip: {
    enterable: true,
    showContent: true,
    shared: true,
    showMarkers: false,
    render: (options: any) => {
      return <InfoCard {...options} valueKey="count" />;
    },
  },
};

const configLabel = [
  'value',
  {
    content: (data: any) => {
      return formatNumber(data.count);
    },
    type: intervalLabel,
    style: {
      fill: '#343434',
    },
  },
];

export const FunnelWith3Columns = Template.bind({});
const FunnelWith3ColumnsArgs = {
  legends: [],
  data: dataWith3Columns,
  config: {
    ...config,
    funnel: {
      position: 'type*value',
      // position,
      color: 'type',
      label: configLabel,
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
      label: configLabel,
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
      label: configLabel,
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
    funnel: {
      position,
      color: 'city',
      adjust: [
        {
          type: 'dodge',
          marginRatio: 0,
        },
      ],
      label: configLabel,
    },
  },
};
FunnelWithGroup.storyName = '分组漏斗';
FunnelWithGroup.args = FunnelWithGroupArgs;

export const CustomFunnel = Template.bind({});
const CustomFunnelArgs = {
  ...FunnelWith6ColumnsArgs,
  data: contrastData,
  config: {
    ...FunnelWith6ColumnsArgs.config,
    axises: [
      [
        'contrastRate',
        {
          label: {
            formatter: (val: string) => formatPercent(val),
          },
        },
      ],
      ['type', { tickLine: null }],
    ],
    funnel: {
      ...FunnelWith6ColumnsArgs.config.funnel,
      position: 'type*contrastRate',
      contrast: 'contrastRate',
      label: [
        'contrastRate',
        {
          content: (data: any) => {
            return formatNumber(data.value);
          },
          type: intervalLabel,
          style: {
            fill: '#343434',
          },
        },
      ],
    },
  },
};
CustomFunnel.args = CustomFunnelArgs;
CustomFunnel.storyName = '自定义contrast字段';

export const CustomGroupedFunnel = GroupTemplate.bind({});
const CustomGroupedFunnelArgs = {
  ...FunnelWithGroupArgs,
  data: contrastGroupedData,
  config: {
    ...FunnelWithGroupArgs.config,
    axises: [
      [
        'contrastRate',
        {
          label: {
            formatter: (val: string) => formatPercent(val),
          },
        },
      ],
      ['type', { tickLine: null }],
    ],
    funnel: {
      ...FunnelWithGroupArgs.config.funnel,
      position: 'type*contrastRate',
      contrast: 'contrastRate',
      label: [
        'contrastRate',
        {
          content: (data: any) => {
            return formatNumber(data.value);
          },
          type: intervalLabel,
          style: {
            fill: '#343434',
          },
        },
      ],
    },
  },
};
CustomGroupedFunnel.args = CustomGroupedFunnelArgs;
CustomGroupedFunnel.storyName = '自定义contrast字段(分组)';

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
