import { ComponentStory } from '@storybook/react';
import Line from '../Line';
import { dataWithOneLine, dataWithMenu, dataWithOnelineDate, contrastData, dataWithSplit } from './data';
import Card from '../../demos/card';
import Docs from './Line.mdx';
import { colors } from '../../theme';
import { LineConfig } from '../../interfaces';
import { formatDateByTs } from '../../utils/formatDate';
import ContrastLine from '../ContrastLine';
import { LooseObject } from '@antv/g-base';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { formatNumber } from '../../utils/formatNumber';
import { InfoCard } from '../../info-card';
import { useRef } from 'react';

export default {
  title: 'Charts/折线图 Line',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: Line,
  parameters: {
    docs: {
      page: Docs,
    },
  },
};

const Template: ComponentStory<typeof Line> = (args) => {
  const ref = useRef<any>();
  const onClick = () => {
    console.log(ref.current?.getInstance());
  };
  return (
    <Card>
      <button onClick={onClick}>Click</button>
      <Line {...args} ref={ref} />
    </Card>
  );
};

const scalaAxisConfig = {
  scale: {
    value: {
      nice: true,
    },
    tm: { range: [0, 1] },
  },
  axises: [
    [
      'value',
      {
        label: {
          formatter: (val: string) => formatNumber(Number(val)),
        },
      },
    ],
    ['tm', { tickLine: null }],
  ],
};
const config = {
  chart: {
    autoFit: true,
    height: 250,
  },
  scale: {
    month: {
      range: [0, 1],
    },
    value: {
      nice: true,
    },
  },
  tooltip: {
    showCrosshairs: true,
    shared: true,
    enterable: true,
  },
  axis: [
    'value',
    {
      label: {
        formatter: (val: string) => {
          return val + ' °C';
        },
      },
    },
  ],
  line: {
    position: 'month*value',
    color: 'city',
  },
};

export const BaiscLine = Template.bind({});
const BaiscLineArgs = {
  legends: ['步步盈增'],
  data: dataWithOneLine,
  config: {
    ...config,
    ...scalaAxisConfig,
    line: {
      position: 'tm*value',
      color: 'type',
    },
  },
};
BaiscLine.storyName = '基础折线图';
BaiscLine.args = { ...BaiscLineArgs };

export const MultiLine = Template.bind({});
const MultiLineArgs = {
  legends: [
    '北京的天气真热啊',
    '上海',
    '深证',
    '郑州的雨下的真大',
    '杭州',
    '兰州',
    '福州',
    '广州',
    '南宁',
    '长沙',
    '合肥',
    '南京',
    '长春',
    '哈尔滨',
    '石家庄',
  ],
  data: dataWithMenu,
  config,
};
MultiLine.args = { ...MultiLineArgs };
MultiLine.storyName = '多纬度折线图';

export const LineWithOneLineDate = Template.bind({});

const LineWithOneLineDateConfig = {
  chart: {
    autoFit: true,
    height: 400,
  },
  scale: {
    date: {
      range: [0, 1],
    },
    value: {
      // min: 0,
      // type: 'quantize',
      // type: 'quantile',
      // ticks: [0, 2000, 4000, 8000, 10000],
      // tickCount: 5,
      nice: true,
      formatter: (x: string) => String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    },
  },
  tooltip: {
    showCrosshairs: true,
    shared: true,
    enterable: true,
    render: (options: any) => {
      return <InfoCard {...options} title={formatDateByTs(options.title)} />;
    },
  },
  axises: [
    [
      'value',
      {
        label: {
          formatter: (val: string) => {
            return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          },
        },
      },
    ],
    [
      'date',
      {
        label: {
          formatter: (text: string) => {
            return formatDateByTs(text);
          },
        },
      },
    ],
  ],
  line: {
    position: 'date*value',
    color: 'metric',
  },
};
const LineWithOneLineDateArgs = {
  legends: [],
  data: dataWithOnelineDate,
  config: LineWithOneLineDateConfig,
};
LineWithOneLineDate.storyName = '时间*数字';
LineWithOneLineDate.args = { ...LineWithOneLineDateArgs };

export const SplitLine = Template.bind({});
const SplitLineConfig = {
  chart: {
    autoFit: true,
    height: 400,
  },
  scale: {
    tm: {
      range: [0, 1],
    },
    value: {
      // min: 0,
      // type: 'quantize',
      // type: 'quantile',
      // ticks: [0, 2000, 4000, 8000, 10000],
      // tickCount: 5,
      nice: true,
      formatter: (x: string) => String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    },
  },
  tooltip: {
    showCrosshairs: true,
    shared: true,
    enterable: true,
    render: (options: any) => {
      return <InfoCard {...options} title={formatDateByTs(options.title)} />;
    },
  },

  line: {
    position: 'tm*value',
    color: 'type',
    shape: 'split-line',
  },
};

const SplitLineConfigArgs = {
  legends: ['步步盈增', '步步盈增（上个月）'],
  data: dataWithSplit,
  config: SplitLineConfig,
};
SplitLine.storyName = '线图分割';
SplitLine.args = { ...SplitLineConfigArgs };

const ContrastTemplate: ComponentStory<any> = (args) => (
  <div style={{ ...args.style }}>
    <Card>
      <ContrastLine {...args} />
    </Card>
  </div>
);

export const ContrastLineExample = ContrastTemplate.bind({});
const ContrastLineExampleArgs = {
  title: '对比折线图',
  legends: [
    {
      name: '访问的总次数(上周)',
      color: colors[0],
      lineDash: true,
    },
    {
      name: '访问的总次数',
      color: colors[0],
      role: 'lead',
    },
  ],
  data: contrastData,
  config: {
    ...config,
    scale: {
      NxDLPLD7_value: {
        nice: true,
        max: 2000,
      },
      tm: { range: [0, 1], rangeAlignLeft: false },
    },
    axises: [
      [
        'NxDLPLD7_value',
        {
          label: {
            formatter: (val: string) => formatNumber(Number(val)),
          },
        },
      ],
      [
        'tm',
        {
          tickLine: null,
          label: {
            formatter: (text: string) => {
              return formatDateByTs(text);
            },
          },
        },
      ],
    ],
    tooltip: {
      showCrosshairs: true,
      shared: true,
      enterable: true,
      render(options: any) {
        const dataItems = options.data;
        dataItems.forEach((item: LooseObject) => {
          item.data.name = format(new Date(Number(item.data.tm)), 'yyyy/MM/dd', { locale: zhCN });
        });
        return <InfoCard {...options} title="环比" forwardKey="name" valueKey="value" />;
      },
    },
    line: {
      position: 'tm*NxDLPLD7_value',
      color: 'NxDLPLD7_name',
    },
  },
};

ContrastLineExample.args = { ...ContrastLineExampleArgs };
ContrastLineExample.storyName = '对比折线图';

export const ContrastLineDarkExample = ContrastTemplate.bind({});

ContrastLineDarkExample.args = {
  style: { backgroundColor: '#000', padding: 8 },
  ...ContrastLineExample.args,
  config: {
    ...(ContrastLineExample.args.config as LineConfig),
    chart: {
      ...ContrastLineExample.args.config?.chart,
      theme: 'dark',
    },
  },
};
ContrastLineDarkExample.storyName = '对比折线图(Dark)';
