import React from 'react';
import { customMerge, DEFAULT_OPTIONS, S2Options } from '@antv/s2';

export const SHEET_COMPONENT_DEFAULT_OPTIONS: Readonly<Partial<S2Options>> = {
  tooltip: {
    showTooltip: true,
    autoAdjustBoundary: 'body',
    operation: {
      hiddenColumns: true,
      trend: false,
      sort: true,
    },
  },
  showDefaultHeaderActionIcon: true,
} as const;
export const getSheetComponentOptions = (
  ...options: Partial<S2Options>[]
): S2Options =>
  customMerge(DEFAULT_OPTIONS, SHEET_COMPONENT_DEFAULT_OPTIONS, ...options);
