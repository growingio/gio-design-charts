import { ComponentStory } from '@storybook/react';
import Gauge from '../Gauge';
import Card from '../../demos/card';
import { darkTheme } from '../../theme/chart';

export default {
  title: 'Charts/仪表图 Gauge',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: Gauge,
  parameters: {
    docs: {
      page: null,
    },
  },
};

const Template: ComponentStory<any> = (args) => (
  <div style={args.style}>
    <Card>
      <Gauge {...args} />
    </Card>
  </div>
);

export const Basic = Template.bind({});
Basic.args = {
  data: [{ value: 1834412, max: 2234412 }],
  config: {
    chart: {
      autoFit: true,
      height: 400,
    },
    gauge: {
      position: 'value',
      // title: '占比: 79.6%',
      // subTitle: 52496,
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
