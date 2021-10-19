import { ComponentStory } from '@storybook/react';
import Area from '../../area/Area';
import Card from '../../demos/card';
import { cloneDeep } from 'lodash';
import { useState } from 'react';
import { AreaStack } from '../../area/demos/Area.stories';

export default {
  title: 'Usage/Data数据修改',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: Area,
  parameters: {
    docs: {
      page: null,
    },
  },
};

const Template: ComponentStory<typeof Area> = (args) => {
  const { data: chartData, config: chartConfig } = args;
  const [data, setData] = useState(chartData);
  const [config, setConfig] = useState(chartConfig);
  const [, reRender] = useState(0);
  const update = () => {
    data.forEach((item) => {
      item.value = item.value + 1001;
    });
    setData(data);
    reRender(new Date().getTime());
  };

  const updateConfig = () => {
    config.tm = new Date().getTime();
    setConfig({ ...config });
    reRender(new Date().getTime());
  };
  return (
    <Card>
      <button onClick={update}>Update Data</button>
      <button onClick={updateConfig}>Update Config</button>
      <Area {...args} data={data} config={config} />
    </Card>
  );
};
export const UpdateData = Template.bind({});
UpdateData.args = cloneDeep(AreaStack.args);
