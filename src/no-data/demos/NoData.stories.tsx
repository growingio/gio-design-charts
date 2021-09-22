import { ComponentStory } from '@storybook/react';
import Card from '../../demos/card';
import NotCreated from '../NotCreated';
import NoResult from '../NoResult';
import Docs from './NoData.mdx';

export default {
  title: 'Components/No Data',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: NotCreated,
  parameters: {
    docs: {
      page: Docs,
    },
  },
};

const Template: ComponentStory<typeof NotCreated> = (args) => (
  <Card>
    <NotCreated {...args} />
  </Card>
);

const NoResultTemplate: ComponentStory<typeof NoResult> = (args) => (
  <Card>
    <NoResult {...args} />
  </Card>
);

export const NotCreatedDashboardPageUsage = Template.bind({});
NotCreatedDashboardPageUsage.args = {
  description: '你还没有属于自己的看板，快去新建一个吧',
  button: (
    <button
      style={{
        height: 40,
        width: 96,
        backgroundColor: '#3867F4',
        color: '#ffffff',
        borderRadius: 4,
        border: 'none',
        cursor: 'pointer',
      }}
    >
      新建看板
    </button>
  ),
};
NotCreatedDashboardPageUsage.storyName = '无看板数据';

export const NotCreatedPageUsage = Template.bind({});
NotCreatedPageUsage.args = {
  size: 'small',
  description: '暂无结果',
  button: (
    <button
      style={{
        height: 30,
        width: 96,
        backgroundColor: '#3867F4',
        color: '#ffffff',
        borderRadius: 4,
        border: 'none',
        cursor: 'pointer',
      }}
    >
      新 建
    </button>
  ),
};
NotCreatedPageUsage.storyName = '无看板数据(小尺寸)';

export const NotCreatedDashboardPageOnly = Template.bind({});
NotCreatedDashboardPageOnly.args = {};
NotCreatedDashboardPageOnly.storyName = '无看板数据(仅图片)';

export const NotCreatedPageOnly = Template.bind({});
NotCreatedPageOnly.args = {
  size: 'small',
};
NotCreatedPageOnly.storyName = '无看板数据(小尺寸、仅图片)';

export const NoResultUsage = NoResultTemplate.bind({});
NoResultUsage.args = {};
NoResultUsage.storyName = '无结果';
