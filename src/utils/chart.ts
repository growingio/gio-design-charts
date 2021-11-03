import { LooseObject } from '@antv/g-base';
import { Datum } from '@antv/g2/lib/interface';
import { isEmpty, isString, lowerCase } from 'lodash';
import { ChartConfig } from '../interfaces';
import { darkTheme } from '../theme/chart';

export const inValidConfig = (config: ChartConfig) => {
  return isEmpty(config) || !config?.chart || !config?.[config?.type] || !config?.[config?.type]?.position;
};

export const getTheme = (theme?: string | LooseObject | Datum) => {
  let customTheme = theme;
  if (isString(customTheme)) {
    customTheme = lowerCase(customTheme) === 'dark' ? darkTheme : {};
  }
  customTheme = customTheme || {};
  return customTheme;
};
