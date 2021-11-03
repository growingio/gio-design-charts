import { ComponentStory } from '@storybook/react';
import { Column } from '../../column';
import { ColumnWithGroup } from '../../column/demos/Column.stories';
import { DesignContext } from '@gio-design/utils';

import docs from './theme.mdx';
import { Funnel } from '../../funnel';
import { FunnelWith7Columns } from '../../funnel/demos/Funnel.stories';
import { FunnelProps } from '../../funnel/Funnel';
import { darkTheme } from '../../theme/chart';

export default {
  title: 'Usage/Theme',
  component: Column,
  parameters: {
    docs: {
      page: docs,
    },
  },
};

const customTheme = {
  // set default colors, althought we have set default color for each legend.
  // but it's still necessary to add default colors for theme
  components: {
    axis: {
      common: {
        label: {
          offset: 16,
          style: {
            fill: '#e8ac24',
          },
        },
        line: {
          style: {
            lineWidth: 1,
            stroke: '#e8ac24',
          },
        },
      },
    },
  },
  labels: {
    style: {
      fill: '#e8ac24',
    },
  },
};

const Template: ComponentStory<any> = (args: any) => {
  return (
    <DesignContext.Provider value={{ theme: customTheme }}>
      <Column {...args} />
    </DesignContext.Provider>
  );
};

export const Theme = Template.bind({});
Theme.args = ColumnWithGroup.args;

const DarkTheme = (args: any) => {
  const { theme } = args;
  const style = { padding: 20, backgroundColor: '#000' };
  const { config, ...rest } = FunnelWith7Columns.args as FunnelProps;
  const newConfig = {
    ...config,
    chart: {
      ...config.chart,
      theme,
    },
  };
  return (
    <div style={style}>
      <Funnel {...rest} config={newConfig} legends={['全部']} />
    </div>
  );
};

export const Dark = (args: any) => <DarkTheme {...args} />;
Dark.args = {
  theme: darkTheme,
};

export const DarkMode = (args: any) => <DarkTheme {...args} />;
DarkMode.args = {
  theme: 'dark',
};
