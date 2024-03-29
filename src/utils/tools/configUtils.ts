import { getDodgeBy, hasContrastDodge } from '../interval';
import { ChartConfig, ChartOptions, CustomInfo, ChartType } from '../../interfaces';
import { ShapeInfo } from '@antv/g2/lib/interface';
import { LooseObject } from '@antv/g-base';
import { getAxisFields } from '../frameworks/axis';
import { getShapeConfig } from './shapeConfig';

export const setCustomInfo = (options: ChartOptions, config: ChartConfig = {}, info: CustomInfo = {}): CustomInfo => {
  const { legendObject, data, defaultStyles } = options;
  const shapeConfig = getShapeConfig(config);
  const customInfo = { ...info };
  if (info.isStack && Array.isArray(data)) {
    customInfo['topData'] = data?.[0];
  }
  const [xField, yField] = getAxisFields(shapeConfig.position);
  const dodgeBy = getDodgeBy(shapeConfig);
  const contrastDodge = hasContrastDodge(shapeConfig);
  return {
    type: shapeConfig.color,
    dodgeBy,
    contrastDodge,
    legendObject,
    defaultStyles,
    xField,
    yField,
    zField: shapeConfig.color,
    ...customInfo,
  };
};

export const getRelateLegend = (shapeInfo: ShapeInfo) => {
  const { customInfo, data = {} } = shapeInfo;
  const { type = '', dodgeBy, contrastDodge, legendObject } = customInfo || {};
  const name = data[type];
  const dodgeByValue = data[dodgeBy];
  const legendByDodge = legendObject?.mapping?.[dodgeByValue] || {};
  if (contrastDodge && dodgeBy && legendByDodge) {
    // for dodgeBy, we needn't color
    const { color, ...others } = legendByDodge;
    return others;
  }
  return legendObject?.mapping?.[name] || {};
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

export const getReactValue = (shapeInfo: ShapeInfo): number => {
  const yField = shapeInfo?.customInfo?.yField;
  return (shapeInfo?.data as LooseObject)?.[yField] || 0;
};
