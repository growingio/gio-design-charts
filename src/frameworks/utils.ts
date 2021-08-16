import { getDodgeBy, hasContrastDodge } from '../components/column/settings';
import { IChartConfig, IChartOptions } from '../interface';

export const getShapeConfig = (config: IChartConfig, type?: string) => {
  if (type) {
    return config[type] || {};
  }
  if (config.type) {
    return config[config.type] || {};
  }
  return config.bar || config.column || config.line || config.funnel || {};
};

export const setCustomInfo = (options: IChartOptions, config: IChartConfig = {}, info: any = {}) => {
  const { legends, data, defaultStyles } = options;
  const shapeConfig = getShapeConfig(config);
  const customInfo = { ...info };
  if (info.isStack) {
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

export const getRelateLegend = (shapeInfo: any) => {
  const { customInfo, data = {} } = shapeInfo;
  const { type = '', dodgeBy, contrastDodge, legends = {} } = customInfo || {};
  const name = data[type];
  const legendByDodge = legends?.[data?.[dodgeBy]];
  if (contrastDodge && dodgeBy && legendByDodge) {
    // for dodgeBy, we needn't color
    const { color, ...others } = legendByDodge || {};
    return others;
  }
  return legends?.[name] || {};
};

export const getDefaultStyles = (shapeInfo: any) => {
  return shapeInfo?.customInfo?.defaultStyles || {};
};

export const isUseDash = (shapeInfo: any) => {
  return !!shapeInfo?.customInfo?.useDash;
};

export const isStack = (shapeInfo: any) => {
  return !!shapeInfo?.customInfo?.isStack;
};

export const isTopBar = (shapeInfo: any) => {
  const type = shapeInfo?.customInfo?.type;
  const name = getTopName(shapeInfo);
  return name === shapeInfo?.data?.[type];
};

export const getTopName = (shapeInfo: any) => {
  const type = shapeInfo?.customInfo?.type;
  const topData = shapeInfo?.customInfo?.topData;
  return topData?.[type];
};
