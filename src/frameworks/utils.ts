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
  return {
    type: shapeConfig.color,
    legends,
    defaultStyles,
    ...customInfo,
  };
};

export const getRelateLegend = (shapeInfo: any) => {
  const { customInfo, data = {} } = shapeInfo;
  const { type = '', legends = {} } = customInfo || {};
  const name = data[type];
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
