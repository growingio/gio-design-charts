import { ComponentStory } from '@storybook/react';
import Donut from '../Donut';
import Card from '../../demos/card';
import { data } from './data';
import { darkTheme } from '../../theme/chart';
import { InfoCard } from '../..';
import { cloneDeep } from 'lodash';

export default {
  title: 'Charts/环形图 Donut',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: Donut,
  parameters: {
    docs: {
      page: null,
    },
  },
};

const Template: ComponentStory<any> = (args) => (
  <div style={args.style}>
    <Card>
      <Donut {...args} />
    </Card>
  </div>
);

export const Basic = Template.bind({});
Basic.args = {
  legends: ['北京', '上海', '杭州', '重庆', '天津', '武汉', '兰州', '太原'],
  data: {
    title: '总计',
    count: '14.23万',
    source: data,
  },
  config: {
    chart: {
      autoFit: true,
      height: 400,
    },
    tooltip: {
      showMarkers: false,
      showCrosshairs: false,
      render: (options: any) => {
        const itemData = options.data?.[0] || {};
        const newData = [
          {
            ...cloneDeep(itemData),
            data: { ...itemData, showValue: itemData.data?.count, showTitle: itemData.data?.name },
          },
          {
            ...cloneDeep(itemData),
            data: { ...itemData, showValue: `${itemData.data?.percent * 100}%`, showTitle: '占比' },
          },
        ];
        return <InfoCard {...options} title="用户量" data={newData} forwardKey="showTitle" valueKey="showValue" />;
      },
    },
    donut: {
      position: 'percent',
      color: 'name',
      adjust: 'stack',
      label: {
        field: 'percent',
        callback: (percent: any) => {
          return {
            content: (dataItem: any) => {
              return `${dataItem.name}: ${percent * 100}%`;
            },
          };
        },
      },
    },
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
