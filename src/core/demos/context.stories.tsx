import { ComponentStory } from '@storybook/react';
import { Column } from '../../column';
import { ColumnWithGroup } from '../../column/demos/Column.stories';
import { DesignContext } from '@gio-design/utils';

export default {
  title: 'Usage/Provider',
  component: Column,
  parameters: {
    docs: {
      page: null,
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
    <DesignContext.Provider value={{ theme: customTheme } as any}>
      <Column {...args} />
    </DesignContext.Provider>
  );
};

export const ThemeProvider = Template.bind({});
ThemeProvider.args = ColumnWithGroup.args;
