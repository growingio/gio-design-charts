import { ComponentStory } from '@storybook/react';
import { AreaConfig } from '../../interfaces';
import { Area } from '../../area';
import { AreaStack } from '../../area/demos/Area.stories';
import Card from '../../demos/card';
import Docs from './NoData.mdx';

export default {
  title: 'Components/No Data',
  component: Area,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    docs: {
      page: Docs,
    },
  },
};

const Template: ComponentStory<typeof Area> = (args) => (
  <Card>
    <Area {...args} />
  </Card>
);

const { config } = AreaStack.args as AreaConfig;
export const NoData = Template.bind({});
NoData.args = {
  ...AreaStack.args,
  config: {
    ...config,
    chart: {
      ...config.chart,
      height: 500,
    },
  },
  data: [],
};
NoData.storyName = 'Default';

export const NoDataCustom = Template.bind({});
NoDataCustom.args = {
  ...AreaStack.args,
  data: [],
  noData: () => {
    return (
      <div
        style={{
          textAlign: 'center',
          height: '300px',
          lineHeight: '300px',
          fontSize: '100px',
          fontWeight: 'bold',
          color: '#1ea7fd70',
        }}
      >
        Custom No Data
      </div>
    );
  },
};
NoDataCustom.storyName = '自定义NoData';
