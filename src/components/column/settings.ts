import { AdjustOption } from '@antv/g2/lib/interface';
import { Shape } from '../../interface';

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
 * @param config {Shape}
 * @returns
 */
export const hasDodge = (config: Shape) => {
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

/**
 *
 * @param config {Shape}
 * @returns
 */
export const getDodgeBy = (config: Shape) => {
  const color = config?.color;
  const adjust = config?.adjust;
  const dodge = 'dodge';
  if (Array.isArray(adjust)) {
    for (let a of adjust) {
      if (typeof a === 'object' && a?.type === dodge && a?.dodgeBy) {
        return a?.dodgeBy;
      }
    }
  }
  return color;
};

/**
 *
 * @param config {Shape}
 * @returns
 */
export const hasContrastDodge = (config: Shape) => {
  const color = config?.color;
  const dodgeBy = getDodgeBy(config);
  return color !== dodgeBy;
};
