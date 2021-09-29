import { colors, DEFAULT_FONT_COLOR } from '.';

/**
 * Throught https://theme-set.antv.vision/ to update the theme for Chart.
 *
 * Reference: @antv/g2/src/theme/util/create-by-style-sheet.ts
 */
export const gioTheme = {
  // set default colors, althought we have set default color for each legend.
  // but it's still necessary to add default colors for theme
  styleSheet: {
    paletteQualitative10: colors,
  },
  components: {
    axis: {
      common: {
        label: {
          offset: 16,
          style: {
            fill: DEFAULT_FONT_COLOR,
          },
        },
        line: {
          style: {
            lineWidth: 1,
            stroke: '#EBEDF5',
          },
        },
        grid: {
          line: {
            type: 'line',
            style: {
              stroke: '#EBEDF5',
              lineWidth: 1,
            },
          },
          alignTick: true,
          animate: true,
        },
        tickLine: null,
        subTickLine: null,
      },
    },
    tooltip: {
      crosshairs: {
        line: {
          style: { stroke: '#ebedf5' },
        },
      },
    },
  },
  labels: {
    style: {
      fill: DEFAULT_FONT_COLOR,
    },
  },
};

export const viewTheme = {
  // set default colors, althought we have set default color for each legend.
  // but it's still necessary to add default colors for theme
  components: {
    axis: {
      common: {
        label: {
          offset: 16,
          style: {
            fill: '#ffffff',
          },
        },
        line: {
          style: {
            lineWidth: 1,
            stroke: '#ffffff',
          },
        },
      },
    },
  },
  labels: {
    style: {
      fill: '#ffffff',
    },
  },
};

export default gioTheme;
