import React from 'react';
import { customMerge, DEFAULT_OPTIONS, S2Options } from '@antv/s2';
import { SHEET_COMPONENT_DEFAULT_OPTIONS } from '../common';


export const getSheetComponentOptions = (
  ...options: Partial<S2Options>[]
): S2Options =>
  customMerge(DEFAULT_OPTIONS, SHEET_COMPONENT_DEFAULT_OPTIONS, ...options);
