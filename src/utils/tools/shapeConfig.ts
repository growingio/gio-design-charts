import { Shape } from '@antv/component/lib/annotation';
import { ChartConfig, ChartType } from '../../interfaces';

export const getShapeConfig = (config: ChartConfig = {}, type?: string) => {
  if (type) {
    if (type === ChartType.DoubleAxes) {
      return config.column || config.line;
    }
    return config[type] || {};
  }

  if (config.type === ChartType.DoubleAxes) {
    return config.column || config.line;
  }
  if (config.type) {
    return config[config.type] || {};
  }
  return config.bar || config.column || config.line || config.funnel || ({} as Shape);
};
