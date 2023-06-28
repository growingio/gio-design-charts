import { ComponentStory } from '@storybook/react';
import DoubleAxes from '../DoubleAxes';
import Card from '../../demos/card';
import { data, updatedData } from './data';
import { InfoCard } from '../../info-card';
import { cloneDeep } from 'lodash';
import { useState } from 'react';

export default {
  title: 'Charts/双轴图 DoubleAxes',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: DoubleAxes,
  parameters: {
    docs: {
      page: null,
    },
  },
};

const Template: ComponentStory<any> = (args) => {
  const [chartData, setChartData] = useState(data);
  const updateData = () => {
    setChartData(updatedData);
  };
  return (
    <div style={args.style}>
      <button onClick={updateData}>Update</button>
      <Card>
        <DoubleAxes {...args} data={chartData} />
      </Card>
    </div>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  legends: ['参与人数', '触发人数', { name: '参与率(%)', type: 'line' }, { name: '出发率(%)', type: 'line' }],
  data,
  config: {
    chart: {
      autoFit: true,
      height: 400,
    },
    scale: {
      lineValue: { nice: true, min: 0 },
    },
    axises: [['lineValue', { label: null, grid: null }]],
    tooltip: {
      showMarkers: false,
      showCrosshairs: false,
      shared: true,
      render: (options: any) => {
        return <InfoCard {...options} title="用户量" data={options?.data} />;
      },
    },
    column: {
      position: 'time*col',
      color: 'label',
      adjust: 'dodge',
    },
    line: {
      position: 'time*lineValue',
      color: 'lineLabel',
    },
  },
};

// export const Dark = Template.bind({});
// Dark.args = {
//   style: { backgroundColor: '#000', padding: 10 },
//   ...Basic.args,
//   config: {
//     ...Basic.args.config,
//     chart: {
//       ...Basic.args.config.chart,
//       theme: darkTheme,
//     },
//   },
// };
