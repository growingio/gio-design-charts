import { colors, DEFAULT_FONT_COLOR } from '.';

/**
 * Throught https://theme-set.antv.vision/ to update the theme for Chart.
 *
 * Reference: @antv/g2/src/theme/util/create-by-style-sheets.ts
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
  },
};

export default gioTheme;
