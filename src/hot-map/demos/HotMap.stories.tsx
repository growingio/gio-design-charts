import { ComponentStory } from '@storybook/react';
import HotMap from '../HotMap';
import Card from '../../demos/card';

import Docs from './HotMap.mdx';
import { formatNumber, formatPercent, InfoCard } from '../..';

export default {
  title: 'Charts/热力图 HotMap',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: HotMap,
  parameters: {
    docs: {
      page: Docs,
    },
  },
};

const intervalLabel = 'interval-label';

const Template: ComponentStory<typeof HotMap> = (args) => (
  <Card>
    <HotMap {...args} />
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

export const BaseHotMap = Template.bind({});

const sourceData = [
  {
    rowDimensionValue: 'N/A',
    colDimensionValue: 'N/A',
    userCount: 279,
    userRatio: 0.5376,
    name: '用户量',
    group: '目标群组',
  },
  {
    rowDimensionValue: 'N/A',
    colDimensionValue: '1*****0',
    userCount: 6,
    userRatio: 0.0116,
    name: '用户量',
    group: '目标群组',
  },
  {
    rowDimensionValue: 'N/A',
    colDimensionValue: '-*********8',
    userCount: 6,
    userRatio: 0.0116,
    name: '用户量',
    group: '目标群组',
  },
  {
    rowDimensionValue: 'N/A',
    colDimensionValue: '-*9',
    userCount: 6,
    userRatio: 0.1116,
    name: '用户量',
    group: '目标群组',
  },
  {
    rowDimensionValue: 'N/A',
    colDimensionValue: '1******0',
    userCount: 6,
    userRatio: 0.0117,
    name: '用户量',
    group: '目标群组',
  },

  {
    rowDimensionValue: 'N/A2',
    colDimensionValue: 'N/A',
    userCount: 279,
    userRatio: 0.4376,
    name: '用户量',
    group: '目标群组',
  },
  {
    rowDimensionValue: 'N/A2',
    colDimensionValue: '1*****0',
    userCount: 6,
    userRatio: 0.0116,
    name: '用户量',
    group: '目标群组',
  },
  {
    rowDimensionValue: 'N/A2',
    colDimensionValue: '-*********8',
    userCount: 6,
    userRatio: 0.0116,
    name: '用户量',
    group: '目标群组',
  },
  {
    rowDimensionValue: 'N/A2',
    colDimensionValue: '-*9',
    userCount: 6,
    userRatio: 0.1116,
    name: '用户量',
    group: '目标群组',
  },
  {
    rowDimensionValue: 'N/A2',
    colDimensionValue: '1******0',
    userCount: 6,
    userRatio: 0.00017,
    name: '用户量',
    group: '目标群组',
  },
].sort((a, b) => a.userRatio - b.userRatio);
const BaseHotMapArgs = {
  legends: [{ name: 'legend', color: '#62CE6C' }],
  data: {
    source: sourceData,
    rowDimensionValue: Array.from(new Set(sourceData?.map?.((item) => item.rowDimensionValue))),
    colDimensionValue: Array.from(new Set(sourceData?.map?.((item) => item.colDimensionValue))),
  },
  config: {
    chart: {
      autoFit: true,
      height: 276,
    },
    scale: [
      'userRatio',
      {
        nice: true,
      },
    ],
    axises: [['userRatio', {}]],
    hotMap: {
      xField: 'rowDimensionValue',
      yField: 'colDimensionValue',
      zField: 'userRatio',
    },
    tooltip: {
      enterable: true,
      showContent: true,
      showMarkers: false,
      clickOptions: {
        visible: true,
        offsetX: -10,
        offsetY: 62,
        fixedOffsetY: 100,
      },
      render(options) {
        const { data, onClick } = options;
        const sourceData = data?.[0]?.data;

        options.data = [
          {
            ...data[0],
            data: {
              ...sourceData,
              _name: '人数',
              _value: sourceData?.userCount,
            },
          },
          {
            ...data[0],
            data: {
              ...sourceData,
              _name: '占比',
              _value: sourceData?.userRatio,
            },
          },
        ];
        return (
          <div>
            <InfoCard {...options} title={sourceData?.name} forwardKey="_name" valueKey="_value" />
            <div>
              <button
                className="hot-map-info-card-btn"
                onClick={() => {
                  onClick?.(sourceData);
                }}
              >
                另存为群组
              </button>
            </div>
          </div>
        );
      },
    },
    type: 'hotMap',
  },
};
BaseHotMap.storyName = '热力图';
(BaseHotMap as any).args = BaseHotMapArgs;
