import { getDodgeBy, hasContrastDodge } from '../interval';
import { ChartConfig, ChartOptions, Shape, CustomInfo, ChartType } from '../../interfaces';
import { ShapeInfo } from '@antv/g2/lib/interface';
import { LooseObject } from '@antv/g-base';

export const getShapeConfig = (config: ChartConfig = {}, type?: string) => {
  if (type) {
    return config[type] || {};
  }
  if (config.type) {
    return config[config.type] || {};
  }
  return config.bar || config.column || config.line || config.funnel || ({} as Shape);
};

export const setCustomInfo = (options: ChartOptions, config: ChartConfig = {}, info: CustomInfo = {}): CustomInfo => {
  const { legends, data, defaultStyles } = options;
  const shapeConfig = getShapeConfig(config);
  const customInfo = { ...info };
  if (info.isStack && Array.isArray(data)) {
    customInfo['topData'] = data?.[0];
  }
  const dodgeBy = getDodgeBy(shapeConfig);
  const contrastDodge = hasContrastDodge(shapeConfig);
  return {
    type: shapeConfig.color,
    dodgeBy,
    contrastDodge,
    legends,
    defaultStyles,
    ...customInfo,
  };
};

export const getRelateLegend = (shapeInfo: ShapeInfo) => {
  const { customInfo, data = {} } = shapeInfo;
  const { type = '', dodgeBy, contrastDodge, legends = {} } = customInfo || {};
  const name = data[type];
  const dodgeByValue = data[dodgeBy];
  const legendByDodge = legends[dodgeByValue];
  if (contrastDodge && dodgeBy && legendByDodge) {
    // for dodgeBy, we needn't color
    const { color, ...others } = legendByDodge;
    return others;
  }
  return legends[name] || {};
};

export const getDefaultStyles = (shapeInfo: ShapeInfo) => {
  return shapeInfo?.customInfo?.defaultStyles || {};
};

export const getChartType = (shapeInfo: ShapeInfo) => {
  return shapeInfo?.customInfo?.chartType || ChartType.COLUMN;
};

export const isUseDash = (shapeInfo: ShapeInfo) => {
  return !!shapeInfo?.customInfo?.useDash;
};

export const isStack = (shapeInfo: ShapeInfo) => {
  return !!shapeInfo?.customInfo?.isStack;
};

export const isTopBar = (shapeInfo: ShapeInfo) => {
  const type = shapeInfo?.customInfo?.type;
  const name = getTopName(shapeInfo);
  const data = shapeInfo?.data as LooseObject;
  return name === data?.[type];
};

export const getTopName = (shapeInfo: ShapeInfo) => {
  const type = shapeInfo?.customInfo?.type;
  const topData = shapeInfo?.customInfo?.topData;
  return topData?.[type];
};
