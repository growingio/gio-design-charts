import { ComponentStory } from '@storybook/react';
import Column from '../Column';
import Card from '../../demos/card';
import { dataWithComponsive, dataWithGroupByTs, dataWithTs, percentData } from './data';
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
    // shared: true,
  },
};

export const ColumnWithTs = Template.bind({});
const ColumnWithTsArgs = {
  legends: ['步步盈增'],
  data: dataWithTs,
  config: {
    ...config,
    column: {
      position: 'ts*value',
      color: 'color',
    },
    axises: [tsLabelConfig, valueLabelConfig],
    tooltip: tooltipConfig,
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
  data: dataWithGroupByTs,
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
  data: dataWithGroupByTs,
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
