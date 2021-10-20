import { ComponentStory } from '@storybook/react';
import { Column } from '../../column';
import { ColumnWithGroup } from '../../column/demos/Column.stories';
import { DesignContext } from '@gio-design/utils';

import docs from './theme.mdx';

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
