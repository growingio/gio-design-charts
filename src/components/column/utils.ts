import { AdjustOption } from '@antv/g2/lib/interface';
import { IShape } from '../../interface';

export const hasDodge = (config: IShape) => {
  const adjust = config?.adjust;
  const dodge = 'dodge';
  if (adjust === dodge) {
    return true;
  }
  if (Array.isArray(adjust)) {
    for (let a of adjust) {
      if (typeof a === 'string' && a === dodge) {
        return true;
      }
      console.log(typeof a);
      if (typeof a === 'object' && a?.type === dodge) {
        return true;
      }
    }
  }
  if (typeof adjust === 'object' && (adjust as AdjustOption)?.type === dodge) {
    return true;
  }
  return false;
};
