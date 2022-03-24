import { LooseObject } from '@antv/g-base';
import { AdjustOption } from '@antv/g2/lib/interface';
import { ChartOptions } from '..';
import { Shape } from '../interfaces';
import { getAxisFields } from './frameworks/axis';

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
    // dodgePadding: 8,
    // intervalPadding: 40,
    // maxColumnWidth: 40,
    minColumnWidth: 40,
  },
};

/**
 *
 * @param config {Shape}
 * @returns
 */
export const hasAdjust = (config: Shape, adjustType: 'stack' | 'dodge') => {
  const adjust = config?.adjust;
  if (adjust === adjustType) {
    return true;
  }
  if (Array.isArray(adjust)) {
    for (const a of adjust) {
      if (typeof a === 'string' && a === adjustType) {
        return true;
      }
      if (typeof a === 'object' && a?.type === adjustType) {
        return true;
      }
    }
  }
  if (typeof adjust === 'object' && (adjust as AdjustOption)?.type === adjustType) {
    return true;
  }
  return false;
};

/**
 *
 * @param config {Shape}
 * @returns
 */
export const hasDodge = (config: Shape) => {
  return hasAdjust(config, 'dodge');
};

/**
 *
 * @param config {Shape}
 * @returns
 */
export const hasStack = (config: Shape) => {
  return hasAdjust(config, 'stack');
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
    for (const a of adjust) {
      if (typeof a === 'object' && a?.type === dodge && a.dodgeBy) {
        return a.dodgeBy;
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

/**
 * When render group bar/column chart，adjust type is dodge
 * There is an problem to create interval with dodgePadding.
 * But it's necessary to render chart which multi group
 *
 * Know: whether there is only one group and adjust type is dodge
 * @return {boolean}
 */
export const isSingleDodge = (options: ChartOptions, config: Shape) => {
  const data = options.data || [];
  const [xField] = getAxisFields(config.position);
  if (xField) {
    const groups = Array.from(new Set(data.map((item: LooseObject) => item[xField])));
    return groups.length <= 1;
  }
  /* istanbul ignore next */
  return false;
};
