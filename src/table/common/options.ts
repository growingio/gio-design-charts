import { S2Options, SpreadSheet } from '@antv/s2';
import { CustomTooltip } from '../components/tooltip/customTooltip';

export const SHEET_COMPONENT_DEFAULT_OPTIONS: Readonly<Partial<S2Options>> = {
  tooltip: {
    showTooltip: true,
    autoAdjustBoundary: 'body',
    col: {
      showTooltip: true,
      operation: {
        hiddenColumns: false,
        trend: false,
        sort: true,
        tableSort: true,
      },
    },
    row: {
      showTooltip: false,
    },
    data: {
      showTooltip: false,
    },
    corner: {
      showTooltip: false,
    },
    operation: {
      hiddenColumns: false,
      trend: false,
      sort: true,
      tableSort: true,
    },
    renderTooltip: (spreadsheet: SpreadSheet) => new CustomTooltip(spreadsheet),
  },
  showDefaultHeaderActionIcon: true,
} as const;
