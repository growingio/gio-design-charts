import { ComponentStory } from '@storybook/react';
import FunnelChart from '../../../charts/FunnelChart';
import Card from '../../components1/card';
import { dataWithMultiBar } from '../column/data';

export default {
  title: 'Charts/漏斗图 Funnel Chart',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template: ComponentStory<typeof FunnelChart> = (args) => (
  <Card>
    <FunnelChart {...args} />
  </Card>
);

const config = {
  chart: {
    autoFit: true,
    height: 300,
  },
  scale: ['value', { nice: true }],
  tooltip: {
    enterable: true,
    showContent: true,
    // shared: true,
  },
};

const FunnelWithLink = Template.bind({});
const FunnelWithLinkArgs = {
  legends: ['Apple', 'Google', '阿里巴巴', '腾讯', '百度', '网易', 'Microsoft', '字节跳动'],
  data: dataWithMultiBar,
  config: {
    ...config,
    funnel: {
      position: 'company*value',
      color: 'company',
    },
  },
};
FunnelWithLink.storyName = '漏斗图探索';
FunnelWithLink.args = FunnelWithLinkArgs;

export const FunnelWithLinkExample = () => <FunnelWithLink {...FunnelWithLinkArgs} />;

FunnelWithLinkExample.storyName = '漏斗图探索';
