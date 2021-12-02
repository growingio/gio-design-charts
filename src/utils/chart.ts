import { LooseObject } from '@antv/g-base';
import { Datum } from '@antv/g2/lib/interface';
import { cloneDeep, isEmpty, isString, lowerCase, merge } from 'lodash';
import { ChartConfig, ChartOptions } from '../interfaces';
import { DEFAULT_HEIGHT, LEGEND_HEIGHT } from '../theme';
import gioTheme, { darkTheme, darkViewTheme, viewTheme } from '../theme/chart';

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

export const getDefaultTheme = (theme?: LooseObject, config?: ChartConfig) => {
  const customTheme = getTheme(config?.chart?.theme);
  return merge(cloneDeep(gioTheme), cloneDeep(theme), customTheme);
};

export const getDefaultViewTheme = (config?: ChartConfig) => {
  const isDark = config?.chart?.theme === 'dark';
  return merge(cloneDeep(gioTheme), isDark ? darkViewTheme : viewTheme);
};

export const fixedHeight = (options: ChartOptions, config: ChartConfig) => {
  const { hasLegend, hasTitle } = options;
  const basicConfig = config.chart || {};
  const defaultHeight = basicConfig.height || DEFAULT_HEIGHT;
  if (config.size === 'tiny') {
    return defaultHeight;
  }
  return defaultHeight - (hasLegend ? LEGEND_HEIGHT : 0) - (hasTitle ? LEGEND_HEIGHT : 0);
};
