import { ComponentStory } from '@storybook/react';
import { ColumnChart } from '../../../index';
import Card from '../../components/card';
import { dataWithComponsive, dataWithGroup, dataWithMultiBar, dataWithOneBar, dataWithTs, percentData } from './data';
import Docs from './Column.mdx';
import moment from 'moment';
import { colors } from '../../../theme';

export default {
  title: 'Charts/柱状图 Column Chart',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: ColumnChart,
  parameters: {
    docs: {
      page: Docs,
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

export const ColumnWithOne = Template.bind({});
const ColumnWithOneArgs = {
  legends: ['Apple'],
  data: dataWithOneBar,
  config: {
    ...config,
    column: {
      position: 'type*value',
      color: 'company',
    },
  },
};
ColumnWithOne.args = { ...ColumnWithOneArgs };
ColumnWithOne.storyName = '基础图';

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
    axis: [
      'ts',
      {
        label: {
          formatter: (text: string, item: any, index: number) => {
            return moment(text).format('MM/DD ddd');
          },
        },
      },
    ],
  },
};
ColumnWithTs.args = { ...ColumnWithTsArgs };
ColumnWithTs.storyName = '单色多维度';

export const ColumnWithMulti = Template.bind({});
const ColumnWithMultiArgs = {
  // legends: ['Apple', 'Google', '阿里巴巴', '腾讯', '百度', '网易', 'Microsoft', '字节跳动'],
  data: dataWithMultiBar,
  config: {
    ...config,
    column: {
      position: 'company*value',
      color: 'company',
    },
  },
};
ColumnWithMulti.args = ColumnWithMultiArgs;
ColumnWithMulti.storyName = '无图例多维度';

export const ColumnWithComponsive = Template.bind({});
const ColumnWithComponsiveArgs = {
  legends: [
    { name: '步步盈增', color: colors[0] },
    { name: '步步盈增(对比)', dashed: true, color: colors[0] },
  ],
  data: dataWithComponsive,
  config: {
    ...config,
    column: {
      position: 'ts*value',
      color: 'color',
      adjust: [
        {
          type: 'dodge',
          marginRatio: 0,
        },
      ],
    },
  },
};
ColumnWithComponsive.args = ColumnWithComponsiveArgs;
ColumnWithComponsive.storyName = '分组多维度';

export const ColumnWithGroup = Template.bind({});
const ColumnWithGroupArgs = {
  legends: ['Apple', { name: 'Facebook', dashed: true }, 'Google'],
  data: dataWithGroup,
  config: {
    ...config,
    column: {
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
ColumnWithGroup.args = ColumnWithGroupArgs;
ColumnWithGroup.storyName = '分组多维度柱状图';

export const StackingDiagramColumn = Template.bind({ title: '堆积图' });
const StackingDiagramColumnArgs = {
  legends: ['Apple', 'Facebook', 'Google'],
  data: dataWithGroup,
  config: {
    ...config,
    column: {
      position: 'type*value',
      color: 'company',
      adjust: 'stack',
    },
  },
};
StackingDiagramColumn.args = StackingDiagramColumnArgs;
// export const StackingDiagramColumnExample = () => <StackingDiagramColumn {...StackingDiagramColumnArgs} />;
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
      position: 'type*value',
      color: 'company',
      adjust: 'stack',
    },
  },
};
PercentColumn.args = PercentColumnArgs;
// export const PercentColumnExample = () => <PercentColumn {...PercentColumnArgs} />;
PercentColumn.storyName = '百分比柱状图';

// const GroupAndStackColumn = Template.bind({});
// const GroupAndStackColumnArgs = {
//   legends: [],
//   data: dataWithGroupStack,
//   config: {
//     ...config,
//     column: {
//       position: "type*value",
//       color: "company",
//       adjust: "stack",
//     },
//   },
// };
// GroupAndStackColumn.args = GroupAndStackColumnArgs;
// export const GroupAndStackColumnExample = () => (
//   <GroupAndStackColumn {...GroupAndStackColumnArgs} />
// );
// GroupAndStackColumn.storyName = "分组堆积柱状图";
