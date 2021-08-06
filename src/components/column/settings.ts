import { AdjustOption } from '@antv/g2/lib/interface';
import { IShape } from '../../interface';

export const defaultGroupInterval = {
  interval: {
    // see @antv/g2/lib/geometry/interval.d.ts/IntervalCfg
    dodgePadding: 8,
    // intervalPadding: 40,
    maxColumnWidth: 40,
    minColumnWidth: 20,
  },
};
export const defaultInterval = {
  interval: {
    // see @antv/g2/lib/geometry/interval.d.ts/IntervalCfg
    intervalPadding: 40,
    maxColumnWidth: 40,
    minColumnWidth: 20,
  },
};

/**
 *
 * @param config {IShape}
 * @returns
 */
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
