import { LooseObject } from '@antv/g-base';
import { get } from 'lodash';
import { ChartConfig } from '../../interfaces';
import { getShapeConfig } from '../tools/configUtils';

export const getAxisFields = (position: string) => {
  if (position.indexOf('*') === -1) {
    return [position];
  }
  return position.split('*');
};

export const getTextFormatter = (config?: ChartConfig) => {
  const shapeConfig = getShapeConfig(config);
  const [xField] = getAxisFields(shapeConfig?.position);
  let xFieldConfig = {};
  if (config?.axis === false) {
    return;
  }
  if (config?.axis) {
    if (xField === get(config?.axis, '[0]')) {
      return get(config?.axis, '[1].label.formatter');
    }
  }
  config?.axises?.forEach((axis: [string, LooseObject]) => {
    if (axis?.[0] === xField) {
      xFieldConfig = axis?.[1];
    }
  });
  return get(xFieldConfig, 'label.formatter');
};
