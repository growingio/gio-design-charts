import { ComponentStory } from '@storybook/react';
import Bubble from '../Bubble';
import Card from '../../demos/card';
import { data } from './data';
import { darkTheme } from '../../theme/chart';
import { InfoCard } from '../..';
import { cloneDeep } from 'lodash';

export default {
  title: 'Charts/气泡图 Bubble',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: Bubble,
  parameters: {
    docs: {
      page: null,
    },
  },
};

const Template: ComponentStory<any> = (args) => (
  <div style={args.style}>
    <Card>
      <Bubble {...args} />
    </Card>
  </div>
);

export const Basic = Template.bind({});
Basic.args = {
  legends: data.map((item) => item.Country),
  data,
  config: {
    chart: {
      autoFit: true,
      height: 400,
    },
    tooltip: {
      showMarkers: false,
      showCrosshairs: false,
      clickOptions: {
        visible: true,
        // offsetX: 10,
        offsetY: 10,
        // fixedOffsetY: 10,
      },
      render: (options: any) => {
        const itemData = options.data?.[0] || {};
        const newData = [
          {
            ...cloneDeep(itemData),
            data: { ...itemData, showValue: itemData.data?.Population, showTitle: '人口' },
          },
          {
            ...cloneDeep(itemData),
            data: { ...itemData, showValue: itemData.data?.LifeExpectancy, showTitle: '预期寿命' },
          },
          {
            ...cloneDeep(itemData),
            data: { ...itemData, showValue: itemData.data?.GDP, showTitle: 'GDP' },
          },
        ];
        return (
          <InfoCard
            {...options}
            title={itemData.data?.Country}
            data={newData}
            forwardKey="showTitle"
            valueKey="showValue"
          />
        );
      },
    },
    scale: {
      GDP: {
        nice: true,
      },
      LifeExpectancy: {
        nice: true,
        // min: 0,
      },
    },
    axises: [
      [
        'GDP',
        {
          title: {
            text: '访问的总人数',
          },
        },
      ],
      [
        'LifeExpectancy',
        {
          title: {
            text: '访问的总次数',
          },
        },
      ],
    ],
    bubble: {
      position: 'GDP*LifeExpectancy',
      color: 'Country',
      size: 'Population',
    },
  },
};

export const SameSize = Template.bind({});
const { size, ...withoutSizeBubbleCfg } = Basic.args.config.bubble;
SameSize.args = {
  ...Basic.args,
  config: {
    ...Basic.args.config,
    bubble: { ...withoutSizeBubbleCfg },
  },
};

export const Dark = Template.bind({});
Dark.args = {
  style: { backgroundColor: '#000', padding: 10 },
  ...Basic.args,
  config: {
    ...Basic.args.config,
    chart: {
      ...Basic.args.config.chart,
      theme: darkTheme,
    },
  },
};
