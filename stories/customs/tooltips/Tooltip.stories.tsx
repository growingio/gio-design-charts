import { ComponentStory } from '@storybook/react';
import { BarChart, FunnelChart, FunnelGroupChart, InfoCard } from '../../../src';
import { dataWithGroup } from '../../charts/funnel/data';
import Card from '../../components/card';

export default {
  title: 'Customs/自定义Tooltips',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: BarChart,
};

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
    showMarkers: false,
    render: (options: any) => {
      return <span>test</span>;
    },
  },
  funnel: {
    position: 'type*value',
    color: 'city',
    adjust: [
      {
        type: 'dodge',
        marginRatio: 0,
      },
    ],
    label: [
      'value',
      {
        type: 'interval-label',
        style: {
          fill: '#343434',
        },
      },
    ],
  },
};

const Template: ComponentStory<typeof FunnelChart> = (args) => (
  <Card>
    <FunnelGroupChart {...args} />
  </Card>
);

const basicConfig = {
  legends: ['北京', '上海', '南京', '深圳', '广东'],
  data: dataWithGroup,
  isGroup: true,
  config: {
    ...config,
    tooltip: {
      enterable: true,
      showContent: true,
      // shared: true,
      showMarkers: false,
      render: (options: any) => {
        return (
          <div style={{ textAlign: 'center', fontSize: 16, lineHeight: '20px' }}>
            <span>
              你可以通过 <span style={{ fontWeight: 500, color: 'blue' }}>config.tooltip.render()</span> 自定义tooltip
            </span>
          </div>
        );
      },
    },
  },
};

export const CustomTooltip = Template.bind({});
CustomTooltip.storyName = '自定义Tooltip';
CustomTooltip.args = basicConfig;

export const InfoCardTooltip = Template.bind({});
InfoCardTooltip.storyName = 'InfoCard式的Tooltip';
InfoCardTooltip.args = {
  ...basicConfig,
  config: {
    ...basicConfig.config,
    tooltip: {
      ...basicConfig.config.tooltip,
      render: (options: any) => {
        return <InfoCard {...options} />;
      },
    },
  },
};

export const InfoCardCustomTooltip = Template.bind({});
InfoCardCustomTooltip.storyName = '扩展InfoCard的Tooltip';
InfoCardCustomTooltip.args = {
  ...basicConfig,
  config: {
    ...basicConfig.config,
    tooltip: {
      ...basicConfig.config.tooltip,
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
