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
import React, { useMemo, useState } from 'react';

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
    height: 400,
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
  legends: [{ name: 'legend', color: '#62CE6C' }],
  data: dataWith3Columns,
  config: {
    ...config,
    funnel: {
      position: 'type*value',
      // position,
      color: 'color',
      label: configLabel,
    },
    tooltip: {
      enterable: true,
      showContent: true,
      // shared: true,
      showMarkers: false,
      clickOffset: 62,
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
  legends: ['全部'],
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

const UpdateCom = React.memo(() => {
  const cfg = useMemo(
    () => ({
      ...config,
      funnel: {
        position,
        color: 'city',
        adjust: ['dodge'],
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
    }),
    []
  );
  const [newData, setData] = useState(dataWithGroup);
  const [newLegends, setLegends] = useState([{ name: '北京', alias: '北京 Alias' }, '上海', '南京', '深圳', '广东']);
  const update = () => {
    setData(
      [
        { type: '1.商品详情页｜浏览', city: '乌鲁木齐', count: 84213342, value: 1 },
        { type: '2.加入购物车', city: '乌鲁木齐', count: 18734, value: 0.8619674243121377 },
        { type: '3.进入购物车', city: '乌鲁木齐', count: 6839, value: 0.31466826170976353 },
        { type: '4.完成购买', city: '乌鲁木齐', count: 20, value: 0.0043433330265943 },
      ].concat(newData)
    );
    (newLegends || []).unshift('乌鲁木齐');
    setLegends(newLegends);
  };
  return (
    <Card>
      <button onClick={update}>Update222</button>
      <GroupedFunnel data={newData} config={cfg} legends={newLegends} />
    </Card>
  );
});

const GroupTemplate: ComponentStory<typeof Funnel> = (args) => {
  return (
    <Card>
      <GroupedFunnel {...args} />
      {/* <UpdateCom /> */}
    </Card>
  );
};

export const FunnelWithGroup = GroupTemplate.bind({});
const FunnelWithGroupArgs = {
  legends: [{ name: '北京', alias: '北京 Alias' }, '上海', '南京', '深圳', '广东'],
  data: dataWithGroup,
  config: {
    ...config,
    funnel: {
      position,
      color: 'city',
      adjust: ['dodge'],
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
