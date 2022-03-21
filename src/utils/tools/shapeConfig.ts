import { Shape } from '@antv/component/lib/annotation';
import { ChartConfig } from '../../interfaces';

export const getShapeConfig = (config: ChartConfig = {}, type?: string) => {
  if (type) {
    return config[type] || {};
  }
  if (config.type) {
    return config[config.type] || {};
  }
  return config.bar || config.column || config.line || config.funnel || ({} as Shape);
};
