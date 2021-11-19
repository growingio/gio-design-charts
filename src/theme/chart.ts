import { TextOption } from '@antv/g2/lib/interface';
import { colors, DEFAULT_FONT_COLOR, DEFAULT_FONT_FAMILY, DEFAULT_FONT_SIZE } from '../theme/index';

/**
 * Throught https://theme-set.antv.vision/ to update the theme for Chart.
 *
 * Reference: @antv/g2/src/theme/util/create-by-style-sheet.ts
 * See: https://sourcegraph.com/github.com/antvis/G2/-/blob/src/theme/util/create-by-style-sheet.ts
 */
export const gioTheme = {
  // set default colors, althought we have set default color for each legend.
  // but it's still necessary to add default colors for theme
  styleSheet: {
    paletteQualitative10: colors,
    paletteQualitative20: [...colors, ...colors],
  },
  components: {
    axis: {
      common: {
        title: {
          style: {
            fontFamily: DEFAULT_FONT_FAMILY,
            fontSize: DEFAULT_FONT_SIZE,
            fill: DEFAULT_FONT_COLOR,
          },
        },
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
    offset: 10,
    style: {
      fontFamily: DEFAULT_FONT_FAMILY,
      fill: DEFAULT_FONT_COLOR,
      fontSize: DEFAULT_FONT_SIZE,
    },
  },
  gio: {
    annotation: {
      text: {
        title: {
          position: ['50%', '50%'],
          style: {
            fontSize: 14,
            fill: '#313E75',
            lineWidth: 2,
            textAlign: 'center',
          },
          offsetY: -12,
        } as TextOption,
        count: {
          position: ['50%', '50%'],
          style: {
            fontSize: 20,
            fill: '#313E75',
            textAlign: 'center',
          },
          offsetY: 12,
        } as TextOption,
      },
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
          style: {
            fontFamily: DEFAULT_FONT_FAMILY,
            fill: '#ffffff',
          },
        },
        line: {
          style: {
            fontFamily: DEFAULT_FONT_FAMILY,
            stroke: '#ffffff',
          },
        },
      },
    },
  },
  labels: {
    style: {
      fontFamily: DEFAULT_FONT_FAMILY,
      fontSize: DEFAULT_FONT_SIZE,
      fill: '#ffffff',
    },
  },
};
export const darkViewTheme = {
  // set default colors, althought we have set default color for each legend.
  // but it's still necessary to add default colors for theme
  components: {
    axis: {
      common: {
        label: {
          style: {
            fill: '#000',
          },
        },
        line: {
          style: {
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

export const darkTheme = {
  gio: {
    legend: {
      color: '#ffffff',
    },
    annotation: {
      text: {
        title: {
          style: {
            fill: '#ffffff',
          },
        } as TextOption,
        count: {
          style: {
            fill: '#ffffff',
          },
        } as TextOption,
      },
    },
  },
  components: {
    axis: {
      common: {
        title: {
          style: {
            fill: '#ffffff',
          },
        },
        label: {
          offset: 16,
          style: {
            fill: '#ffffff',
          },
        },
        line: {
          style: {
            stroke: '#434343',
          },
        },
        grid: {
          line: {
            style: {
              stroke: '#434343',
            },
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
