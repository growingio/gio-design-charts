import { ComponentStory } from '@storybook/react';
import LineChart from '../../../charts/LineChart';
import { dataWithDash, dataWithOneLine } from '../line/data';
import Card from '../../components/card';

export default {
  title: 'Charts/面积图',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template: ComponentStory<typeof LineChart> = (args) => (
  <Card>
    <LineChart {...args} />
  </Card>
);

const config = {
  chart: {
    autoFit: true,
    height: 300,
  },
  scale: [
    {
      month: {
        range: [0, 1],
      },
      temperature: {
        nice: true,
      },
    },
  ],
  tooltip: {
    showCrosshairs: true,
    shared: true,
    enterable: true,
  },
  axis: [
    'temperature',
    {
      label: {
        formatter: (val: string) => {
          return val + ' °C';
        },
      },
    },
  ],
  line: {
    position: 'month*temperature',
    color: 'city',
  },
};
const LineWithArea = Template.bind({});
const LineWithAreaArgs = {
  legends: ['北京'],
  data: dataWithOneLine,
  config: {
    ...config,
    line: {
      position: 'month*temperature',
      color: 'city',
      area: 'month*temperature',
    },
  },
};

LineWithArea.args = { ...LineWithAreaArgs };
export const LineWithAreaExample = () => <LineWithArea {...LineWithAreaArgs} />;
LineWithAreaExample.storyName = '面积图';

const LineWithMultiArea = Template.bind({});
const LineWithMultiAreaArgs = {
  legends: ['北京', '哈尔滨', '石家庄'],
  data: dataWithDash,
  config: {
    ...config,
    line: {
      position: 'month*temperature',
      color: 'city',
      area: 'month*temperature',
    },
  },
};

LineWithMultiArea.args = { ...LineWithMultiAreaArgs };

export const LineWithMultiAreaExample = () => <LineWithMultiArea {...LineWithMultiAreaArgs} />;
LineWithMultiAreaExample.storyName = '复杂面积图';
