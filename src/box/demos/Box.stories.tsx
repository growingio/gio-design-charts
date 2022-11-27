import { ComponentStory } from '@storybook/react';
import Box from '../Box';
import Card from '../../demos/card';
import Docs from './Box.mdx';
import { basicBoxData, groupBoxData } from './data';
import { InfoCard } from '../..';
import { colors } from '../../theme';

export default {
  title: 'Charts/箱型图 Box',
  component: Box,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    docs: {
      page: Docs,
    },
  },
};

const Template: ComponentStory<typeof Box> = (args) => (
  <Card>
    <Box {...args} />
  </Card>
);

const config = {
  chart: {
    autoFit: true,
    height: 300,
  },
};

export const BasicBox = Template.bind({});
BasicBox.storyName = '基础箱型图';
const BasicBoxArgs = {
  title: '基础箱型图',
  legends: [],
  data: basicBoxData,
  config: {
    ...config,
    scale: {
      range: {
        max: 35,
        min: 0,
        nice: true,
      },
      avg: {
        max: 35,
        min: 0,
        nice: true,
      },
      x: {
        nice: true,
      },
    },
    axis: ['avg', false],
    box: {
      position: 'x*range',
      color: 'Species',
    },
    point: {
      position: 'x*avg',
      color: 'Species',
    },
    tooltip: {
      shared: true,
      showMarkers: false,
      render: (options: any) => {
        const title = options.data?.[0]?.data?.x;
        const data = options.data?.[0]?.data.range.map((d, i) => {
          return {
            data: {
              math: ['最小值', '下四分位', '中位数', '上四分位', '最大值', '平均数'][i],
              value: d,
            },
          };
        });
        data?.push({ data: { math: '平均值', value: options.data?.[0]?.data.avg } });

        return <InfoCard forwardKey={'math'} valueKey={'value'} data={data} title={title} />;
      },
    },
  },
};

BasicBox.args = { ...BasicBoxArgs };

const legends = ['setosa', 'versicolor', 'virginica'];
export const GroupBox = Template.bind({});
GroupBox.storyName = '分组箱型图';
const GroupBoxArgs = {
  title: '分组箱型图',
  legends: legends,
  data: groupBoxData,
  config: {
    ...config,
    scale: {
      range: {
        max: 8,
        min: 0,
        nice: true,
      },
      avg: {
        max: 8,
        min: 0,
        nice: true,
      },
    },
    axis: ['avg', false],
    box: {
      position: 'x*range',
      color: 'Species',
      adjust: { type: 'dodge', dodgeBy: 'Species' },
    },
    point: {
      position: 'x*avg',
      color: 'Species',
      adjust: { type: 'dodge', dodgeBy: 'Species' },
    },
    tooltip: {
      shared: true,
      showMarkers: false,
      // showCrosshairs: true,
      // formatter: (val: string) => formatPercent(val, 2, true),
      render: (options: any) => {
        const title = `${options.data?.[0]?.data?.Species}-${options.data?.[0]?.data?.x}`;
        const data = options.data?.[0]?.data.range.map((d, i) => {
          return {
            data: {
              math: ['最小值', '下四分位', '中位数', '上四分位', '最大值'][i],
              value: d,
            },
          };
        });
        data?.push({ data: { math: '平均值', value: options.data?.[0]?.data.avg } });
        return <InfoCard forwardKey={'math'} valueKey={'value'} data={data} title={title} />;
      },
    },
  },
};

GroupBox.args = { ...GroupBoxArgs };
