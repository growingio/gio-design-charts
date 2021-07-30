import { IChartConfig, IChartOptions } from "../interface";

export const setCustomInfo = (options: IChartOptions, config: IChartConfig) => {
  const { legends } = options;

  const shapeConfig = config.bar || config.line || {};
  return {
    type: shapeConfig.color,
    legends,
  };
};

export const getRelateLegend = (shapeInfo: any) => {
  console.log(shapeInfo);
  const { customInfo, data = {} } = shapeInfo;
  const { type = "", legends = {} } = customInfo || {};
  const name = data[type];
  return legends[name] || {};
};
