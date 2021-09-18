import { ComponentStory } from '@storybook/react';
import { Bar, ChartProps, Funnel, GroupedFunnel, InfoCard } from '../..';
import Card from '../../demos/card';

import { FunnelWithGroup } from '../../funnel/demos/Funnel.stories';
import Docs from './InfoCard.mdx';

export default {
  title: 'Customs/自定义Tooltips',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: Bar,
  parameters: {
    docs: {
      page: Docs,
    },
  },
};

const Template: ComponentStory<typeof Funnel> = (args) => (
  <Card>
    <GroupedFunnel {...args} />
  </Card>
);

const { config, legends, data } = FunnelWithGroup.args as ChartProps;

export const CustomTooltip = Template.bind({});
CustomTooltip.storyName = '自定义Tooltip';
CustomTooltip.args = FunnelWithGroup.args;

export const InfoCardTooltip = Template.bind({});
InfoCardTooltip.storyName = 'InfoCard式的Tooltip';
InfoCardTooltip.args = {
  legends,
  data,
  config: {
    ...config,
    tooltip: {
      ...config.tooltip,
      render: (options: any) => {
        return <InfoCard {...options} />;
      },
    },
  },
};

export const InfoCardCustomTooltip = Template.bind({});
InfoCardCustomTooltip.storyName = '扩展InfoCard的Tooltip';
InfoCardCustomTooltip.args = {
  legends,
  data,
  config: {
    ...config,
    tooltip: {
      ...config.tooltip,
      render: (options: any) => {
        const { trigger } = options;
        return (
          <InfoCard
            {...options}
            injectComponent={() => {
              return (
                <div style={{ textAlign: 'center', fontSize: 16, lineHeight: '20px' }}>
                  <div>更多的自定义tooltip</div>
                  <div>
                    触发tooltip方式：<span style={{ fontWeight: 500, color: 'red' }}>{trigger}</span>
                  </div>
                </div>
              );
            }}
          />
        );
      },
    },
  },
};
