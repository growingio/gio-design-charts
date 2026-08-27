import { ComponentStory } from '@storybook/react';
import Column from '../ScrollColumn';
import Card from '../../demos/card';
import { dataWithComponsive, dataWithGroupByTs, dataWithTs, percentData,dataWithDualAxis } from './data';
import Docs from './Column.mdx';
import { colors, formatNumber, InfoCard } from '../..';
import formatDateByTs from '../../utils/formatDate';

export default {
  title: 'Charts/柱状图 Column',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: Column,
  parameters: {
    docs: {
      page: Docs,
    },
  },
};

const tooltipConfig = {
  showMarkers: false,
  render: (options: any) => {
    const ts = options.data?.[0]?.data?.ts;
    return <InfoCard {...options} title={formatDateByTs(new Date(ts).getTime())} />;
  },
};

const tsLabelConfig = [
  'ts',
  {
    label: {
      formatter: (text: string, item: any, index: number) => {
        return formatDateByTs(new Date(text).getTime());
      },
    },
  },
];

const valueLabelConfig = ['value', { label: { formatter: (val: string) => formatNumber(Number(val)) } }];

const Template: ComponentStory<typeof Column> = (args) => (
  <Card>
    <Column {...args} />
  </Card>
);

const position = 'type*value';

const config = {
  chart: {
    autoFit: true,
    height: 300,
  },
  scale: ['value', { nice: true }],
  tooltip: {
    enterable: true,
    showContent: true,
    showMarkers: false,
    // shared: true,
  },
};

export const ColumnWithTs = Template.bind({});
const ColumnWithTsArgs = {
  legends: ['步步盈增'],
  data: dataWithTs(20),
  config: {
    ...config,
    column: {
      position: 'ts*value',
      color: 'color',
    },
    axises: [tsLabelConfig, valueLabelConfig],
    tooltip: tooltipConfig,
    // customSizeConfig: {
    //   maxColumnWidth: 200,
    //   minColumnWidth: 20,
    // },
  },
};
ColumnWithTs.args = { ...ColumnWithTsArgs };
ColumnWithTs.storyName = '单色多维度';

export const ColumnWithMulti = Template.bind({});

const { legends, ...otherArgs } = ColumnWithTsArgs;
const ColumnWithMultiArgs = { ...otherArgs };
ColumnWithMulti.args = ColumnWithMultiArgs;
ColumnWithMulti.storyName = '单色多维度(无图例)';

export const ColumnWithComponsive = Template.bind({});
const ColumnWithComponsiveArgs = {
  legends: [
    { name: '步步盈增', color: colors[0] },
    { name: '步步盈增(对比)', dashed: true, color: colors[0] },
  ],
  data: dataWithComponsive,
  config: {
    ...config,
    axises: [tsLabelConfig, valueLabelConfig],
    tooltip: tooltipConfig,
    column: {
      position: 'ts*value',
      color: 'color',
      adjust: ['dodge'],
    },
  },
};
ColumnWithComponsive.args = ColumnWithComponsiveArgs;
ColumnWithComponsive.storyName = '分组多维度';

export const ColumnWithGroup = Template.bind({});
const ColumnWithGroupArgs = {
  legends: ['北京', '上海', '天津'],
  data: dataWithGroupByTs(20),
  config: {
    ...config,
    axises: [tsLabelConfig, valueLabelConfig],
    tooltip: tooltipConfig,
    column: {
      position: 'ts*value',
      color: 'city',
      adjust: ['dodge'],
    },
  },
};
ColumnWithGroup.args = ColumnWithGroupArgs;
ColumnWithGroup.storyName = '分组多维度柱状图';

export const StackingDiagramColumn = Template.bind({ title: '堆积图' });
const StackingDiagramColumnArgs = {
  legends: ['北京', '上海', '天津'],
  data: dataWithGroupByTs(10),
  config: {
    ...config,
    axises: [tsLabelConfig, valueLabelConfig],
    tooltip: tooltipConfig,
    column: {
      position: 'ts*value',
      color: 'city',
      adjust: 'stack',
    },
  },
};
StackingDiagramColumn.args = StackingDiagramColumnArgs;
StackingDiagramColumn.storyName = '堆积多维度柱状图';

export const PercentColumn = Template.bind({ title: '堆积图' });
const PercentColumnArgs = {
  legends: ['Apple', 'Facebook', 'Google'],
  data: percentData,
  config: {
    ...config,
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
    column: {
      position,
      color: 'company',
      adjust: 'stack',
    },
  },
};
PercentColumn.args = PercentColumnArgs;
PercentColumn.storyName = '百分比柱状图';

// 双 y 轴柱状图 demo：主柱（value，左轴）与 column2 第二组柱（value2，右轴）分组显示。
// 为了让左右轴柱子分组对齐而非重叠：主柱与 column2 必须使用相同的 dodge 分组字段
// （此处用 'series'），且同一 x 上分组数一致，因此将原始数据拆分为每系列独立行。
const dualAxisColumnData = dataWithDualAxis.flatMap((d) => [
  { tm: d.tm, series: d.type1, value: d.value, value2: null },
  { tm: d.tm, series: d.type2, value: null, value2: d.value2 },
]);

export const ColumnWithDualAxis = Template.bind({});
const ColumnWithDualAxisArgs = {
  legends: ['指标1', '指标2'],
  data: dualAxisColumnData,
  config: {
    ...config,
    tooltip: {
      ...config.tooltip,
      shared: false,
      render: (options: any) => {
        return <InfoCard {...options} data={options?.data} forwardKey={null} />;
      },
    },
    column: {
      position: 'tm*value',
      color: 'series',
      adjust: 'dodge',
    },
    column2: {
      position: 'tm*value2',
      color: 'series',
      adjust: 'dodge',
    },
  },
};
ColumnWithDualAxis.args = ColumnWithDualAxisArgs;
ColumnWithDualAxis.storyName = '双Y轴柱状图';
