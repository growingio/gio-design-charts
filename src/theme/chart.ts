import { colors, DEFAULT_FONT_COLOR, DEFAULT_FONT_FAMILY, DEFAULT_FONT_SIZE } from '../theme/index';

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
            fontFamily: DEFAULT_FONT_FAMILY,
            fontSize: DEFAULT_FONT_SIZE,
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
      fontFamily: DEFAULT_FONT_FAMILY,
      fill: DEFAULT_FONT_COLOR,
      fontSize: DEFAULT_FONT_SIZE,
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
      fontSize: DEFAULT_FONT_SIZE,
      fill: '#ffffff',
    },
  },
};

export default gioTheme;
