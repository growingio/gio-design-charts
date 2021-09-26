import { ComponentStory } from '@storybook/react';
import { ChartProps } from '../../interfaces';
import { Area } from '../../area';
import { AreaStack } from '../../area/demos/Area.stories';
import Card from '../../demos/card';
import Docs from './ErrorBoundary.mdx';

export default {
  title: 'Components/ErrorBoundary',
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

const { config } = AreaStack.args as ChartProps;
export const ErrorBoundary = Template.bind({});
ErrorBoundary.args = {
  ...AreaStack.args,
  config: {
    ...config,
    tooltip: {
      render: () => {
        throw new Error('This is an error for tesing Error Boundary');
      },
    },
  },
};
ErrorBoundary.storyName = 'Default';

export const ErrorBoundaryCustom = Template.bind({});
ErrorBoundaryCustom.args = {
  ...ErrorBoundary.args,
  errorTemplate: () => (
    <div
      data-testid="custom-error-boundary"
      style={{
        textAlign: 'center',
        height: '300px',
        lineHeight: '300px',
        fontSize: '40px',
        fontWeight: 'bold',
        color: '#1ea7fd70',
      }}
    >
      Custom Error Boundary
    </div>
  ),
};
ErrorBoundaryCustom.storyName = '自定义';
