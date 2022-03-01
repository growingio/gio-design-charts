import { isMobile, isWindows } from '@antv/s2';
import { ThemeConfig } from '..';
import { FONT_FAMILY, PALETTE_MAP, MINI_BAR_CHART_HEIGHT } from './constant';
const { basicColors, semanticColors } = PALETTE_MAP.default;
export const themeDefault: ThemeConfig = {
  palette: PALETTE_MAP.default,
  theme: {
    // ------------- Headers -------------------
    cornerCell: {
      bolderText: {
        fontFamily: FONT_FAMILY,
        fontSize: 12,
        fontWeight: isWindows() ? 'bold' : 500,
        fill: basicColors[0],
        opacity: 1,
        textBaseline: 'middle',
      },
      text: {
        fontFamily: FONT_FAMILY,
        fontSize: 12,
        fontWeight: 'normal',
        fill: basicColors[0],
        opacity: 1,
        textBaseline: 'middle',
      },
      cell: {
        // ----------- background color -----------
        backgroundColor: basicColors[7],
        backgroundColorOpacity: 1,
        // ----------- border color --------------
        horizontalBorderColor: basicColors[2],
        horizontalBorderColorOpacity: 1,
        verticalBorderColor: basicColors[2],
        verticalBorderColorOpacity: 1,
        // ----------- border width --------------
        horizontalBorderWidth: 1,
        verticalBorderWidth: 1,
        // -------------- layout -----------------
        padding: {
          top: 0,
          right: 8,
          bottom: 0,
          left: 8,
        },
      },
      icon: {
        fill: basicColors[3],
        size: 10,
        margin: {
          right: 4,
          left: 4,
        },
      },
    },
    rowCell: {
      bolderText: {
        fontFamily: FONT_FAMILY,
        fontSize: 12,
        fontWeight: isWindows() ? 'bold' : 520,
        fill: basicColors[0],
        linkTextFill: basicColors[0],
        opacity: 1,
        textAlign: 'left',
        textBaseline: 'middle',
      },
      text: {
        fontFamily: FONT_FAMILY,
        fontSize: 12,
        fontWeight: 'normal',
        fill: basicColors[0],
        linkTextFill: basicColors[0],
        opacity: 1,
        textBaseline: 'middle',
        textAlign: 'left',
      },
      cell: {
        // ----------- background color -----------
        backgroundColor: basicColors[1],
        backgroundColorOpacity: 1,
        // ----------- bottom border color --------------
        horizontalBorderColor: basicColors[2],
        horizontalBorderColorOpacity: 1,
        verticalBorderColor: basicColors[2],
        verticalBorderColorOpacity: 1,
        // ----------- bottom border width --------------
        horizontalBorderWidth: 1,
        verticalBorderWidth: 1,
        // -------------- layout -----------------
        padding: {
          top: 0,
          right: 10,
          bottom: 0,
          left: 10,
        },
        /* ---------- interaction state ----------- */
        interactionState: {
          // -------------- hover -------------------
          hover: {
            backgroundColor: basicColors[7],
            backgroundOpacity: 0.3,
          },
          // -------------- selected -------------------
          selected: {
            backgroundColor: basicColors[7],
            backgroundOpacity: 0.3,
          },
          // -------------- unselected -------------------
          unselected: {
            backgroundOpacity: 0.3,
            textOpacity: 0.3,
            opacity: 0.3,
          },
        },
      },
      icon: {
        fill: basicColors[0],
        size: 10,
        margin: {
          right: 4,
          left: 4,
        },
      },
      seriesNumberWidth: 80,
    },
    colCell: {
      bolderText: {
        fontFamily: FONT_FAMILY,
        fontSize: 12,
        fontWeight: isWindows() ? 'bold' : 520,
        fill: basicColors[0],
        opacity: 1,
        textAlign: 'center',
        textBaseline: 'middle',
      },
      text: {
        fontFamily: FONT_FAMILY,
        fontSize: 12,
        fontWeight: 'normal',
        fill: basicColors[0],
        opacity: 1,
        textAlign: 'center',
        textBaseline: 'middle',
      },
      cell: {
        // ----------- background color -----------
        backgroundColor: basicColors[7],
        backgroundColorOpacity: 1,
        // ----------- border color --------------
        horizontalBorderColor: basicColors[2],
        horizontalBorderColorOpacity: 1,
        verticalBorderColor: basicColors[2],
        verticalBorderColorOpacity: 1,
        // ----------- border width --------------
        horizontalBorderWidth: 1,
        verticalBorderWidth: 1,
        // -------------- layout -----------------
        padding: {
          top: 0,
          right: 8,
          bottom: 0,
          left: 8,
        },
        /* ---------- interaction state ----------- */
        interactionState: {
          // -------------- hover -------------------
          hover: {
            backgroundColor: basicColors[7],
            backgroundOpacity: 0.3,
          },
          // -------------- selected -------------------
          selected: {
            backgroundColor: basicColors[7],
            backgroundOpacity: 0.3,
          },
          // -------------- unselected -------------------
          unselected: {
            backgroundOpacity: 0.3,
            textOpacity: 0.3,
            opacity: 0.3,
          },
        },
      },
      icon: {
        fill: basicColors[3],
        size: 10,
        margin: {
          top: 6,
          right: 4,
          bottom: 6,
          left: 4,
        },
      },
    },
    // ------------- DataCell -------------------
    dataCell: {
      bolderText: {
        fontFamily: FONT_FAMILY,
        fontSize: 12,
        fontWeight: isWindows() ? 'bold' : 520,
        fill: basicColors[0],
        opacity: 1,
        textAlign: 'right',
        textBaseline: 'middle',
      },
      text: {
        fontFamily: FONT_FAMILY,
        fontSize: 12,
        fontWeight: 'normal',
        fill: basicColors[0],
        opacity: 1,
        textAlign: 'right',
        textBaseline: 'middle',
      },
      cell: {
        // ----------- background color -----------
        crossBackgroundColor: basicColors[1],
        backgroundColor: basicColors[6],
        backgroundColorOpacity: 1,
        // ----------- border color --------------
        horizontalBorderColor: basicColors[2],
        horizontalBorderColorOpacity: 1,
        verticalBorderColor: basicColors[2],
        verticalBorderColorOpacity: 1,
        // ----------- border width --------------
        horizontalBorderWidth: 1,
        verticalBorderWidth: 1,
        // -------------- layout -----------------
        padding: {
          top: 0,
          right: 8,
          bottom: 0,
          left: 8,
        },
        /* ---------- interaction state ----------- */
        interactionState: {
          // -------------- hover -------------------
          hover: {
            backgroundColor: basicColors[7],
            backgroundOpacity: 0.3,
          },
          // -------------- keep hover -------------------
          hoverFocus: {
            backgroundColor: basicColors[7],
            backgroundOpacity: 0.3,
            borderColor: basicColors[9],
            borderWidth: 1,
            borderOpacity: 1,
          },
          // -------------- selected -------------------
          selected: {
            backgroundColor: basicColors[7],
            backgroundOpacity: 0.6,
          },
          // -------------- unselected -------------------
          unselected: {
            backgroundColor: basicColors[9],
            backgroundOpacity: 0.3,
            textOpacity: 0.3,
            opacity: 0.3,
          },
          // -------------- prepare select --------------
          prepareSelect: {
            borderColor: basicColors[9],
            borderOpacity: 1,
            borderWidth: 1,
          },
        },

        // ------------- mini chart ---------------
        miniBarChartHeight: MINI_BAR_CHART_HEIGHT,
        miniBarChartFillColor: basicColors[7],
      },
      icon: {
        fill: basicColors[0],
        downIconColor: semanticColors.red,
        upIconColor: semanticColors.green,
        size: 10,
        margin: {
          right: 4,
          left: 4,
        },
      },
    },
    // resize active area
    resizeArea: {
      size: 3,
      background: basicColors[9],
      backgroundOpacity: 0,
      guideLineColor: basicColors[9],
      guideLineDash: [3, 3],
      /* ---------- interaction state ----------- */
      interactionState: {
        hover: {
          backgroundColor: basicColors[9],
          backgroundOpacity: 1,
        },
      },
    },
    // ------------- scrollBar -------------------
    scrollBar: {
      trackColor: 'rgba(0,0,0,0.01)',
      thumbHoverColor: 'rgba(0,0,0,0.25)',
      thumbColor: 'rgba(0,0,0,0.15)',
      size: 4,
      hoverSize: 4,
      lineCap: 'round',
    },
    // ------------- split line -----------------
    splitLine: {
      horizontalBorderColor: basicColors[10],
      horizontalBorderColorOpacity: 0.2,
      horizontalBorderWidth: 3,
      verticalBorderColor: basicColors[10],
      verticalBorderColorOpacity: 0.2,
      verticalBorderWidth: 3,
      showShadow: true,
      shadowWidth: 8,
      shadowColors: {
        left: 'rgba(0,0,0,0.1)',
        right: 'rgba(0,0,0,0)',
      },
    },
    // ------------- prepareSelectMask -----------------
    prepareSelectMask: {
      backgroundColor: basicColors[9],
      backgroundOpacity: 0.2,
    },
    // ------------- canvas background
    background: {
      color: basicColors[6],
      opacity: 1,
    },
  }
}