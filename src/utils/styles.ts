import { isString, lowerCase } from 'lodash';
import { TriggerItem } from '../info-card/InfoCardBox';
import { Legend, ChartOptions, ChartConfig, ChartType } from '../interfaces';
import { BAR_TEXTURE, COLUMN_TEXTURE } from '../theme';
import { getDodgeBy } from './interval';
import { getShapeConfig } from '../utils/tools/shapeConfig';
import { LegendObject } from '../legends/useLegends';
import { Chart } from '@antv/g2';

export const getBackgroundImage = (type: string | ChartType) => ({
  backgroundImage: `url("${type === ChartType.COLUMN ? COLUMN_TEXTURE : BAR_TEXTURE}")`,
  backgroundRepeat: 'repeat',
  backgroundSize: '6px 6px',
});

export const getInfoCardStyles = (
  options: ChartOptions,
  config: ChartConfig,
  item: TriggerItem,
  legendObject: LegendObject,
  firstPosition: string
) => {
  // Get legend config
  const shapeConfig = getShapeConfig(config);
  const dodgeBy = getDodgeBy(shapeConfig);
  const legendName = config?.type === ChartType.DoubleAxes ? item.name : item.data?.[dodgeBy] || item.name;
  const legend = legendObject?.getLegend(legendName) || {};

  const singleColor = options?.singleColor;
  // Get default color
  const defaultStyles = options?.defaultStyles;
  let color = defaultStyles?.color;

  // // Get legend color
  if (shapeConfig.color === firstPosition) {
    // if color is equal with first position, it's ok to use default item color
    color = color || item.color;
  } else {
    // if color isn't equal with first position, it's ok to use color in legend
    color = color || legend.color || item.color;
  }
  return [legend, singleColor || color];
};

export const getLegendStyles = (legend: Legend, color: string) => {
  const { lineDash, dashed, type } = legend;
  const backgroundImage = dashed ? getBackgroundImage(type as string) : {};
  return lineDash
    ? {
        border: `1px dashed ${color}`,
        height: 0,
        width: '12px',
        ...backgroundImage,
      }
    : { backgroundColor: color, ...backgroundImage };
};

export const getThemeColor = (config?: ChartConfig) => {
  const theme = config?.chart?.theme;
  let color = '';
  if (isString(theme)) {
    color = lowerCase(theme) === 'dark' ? '#fff' : '';
  } else {
    color = theme?.gio?.legend?.color || '';
  }
  return color;
};

export const isDarkTheme = (config?: ChartConfig) => {
  const theme = config?.chart?.theme;
  if (isString(theme)) {
    return lowerCase(theme) === 'dark';
  } else {
    return !!theme?.gio?.legend?.color;
  }
};
