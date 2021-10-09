import { TriggerItem } from '../info-card/InfoCardBox';
import { Legend, Legends, ChartOptions, ChartConfig, ChartType } from '../interfaces';
import { BAR_TEXTURE, COLUMN_TEXTURE } from '../theme';
import { getDodgeBy } from './interval';
import { getShapeConfig } from './tools/configUtils';

export const getBackgroundImage = (type: string | ChartType) => ({
  backgroundImage: `url("${type === ChartType.COLUMN ? COLUMN_TEXTURE : BAR_TEXTURE}")`,
  backgroundRepeat: 'repeat',
  backgroundSize: '6px 6px',
});

export const getInfoCardStyles = (
  options: ChartOptions,
  config: ChartConfig,
  item: TriggerItem,
  legends: Legends,
  firstPosition: string
) => {
  // Get legend config
  const shapeConfig = getShapeConfig(config);
  const dodgeBy = getDodgeBy(shapeConfig);
  const legendName = item.data?.[dodgeBy] || item.name;
  const legend = legends?.[legendName] || {};

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
  return [legend, color];
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
