import { IChartConfig, IChartOptions } from "../interface";

export const getShapeConfig = (config: IChartConfig, type?: string) => {
  if (type) {
    return config[type] || {};
  }
  return config.bar || config.column || config.line || {};
};

export const setCustomInfo = (
  options: IChartOptions,
  config: IChartConfig = {},
  info: any = {}
) => {
  const { legends, data } = options;
  const shapeConfig = getShapeConfig(config);
  const customInfo = { ...info };
  if (info.isStack) {
    customInfo["topData"] = data?.[0];
  }
  return {
    type: shapeConfig.color,
    legends,
    ...customInfo,
  };
};

export const getRelateLegend = (shapeInfo: any) => {
  const { customInfo, data = {} } = shapeInfo;
  const { type = "", legends = {} } = customInfo || {};
  const name = data[type];
  return legends[name] || {};
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
