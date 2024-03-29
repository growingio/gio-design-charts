import { LooseObject } from '@antv/component';
import { ChartConfig } from '../interfaces';
import { formatNumber, formatPercent } from '../utils';

export const getFixedFieldY = (y: string) => `__${y}`;

/**
 *
 * @param src 当前环节的留存量；
 * @param dst 当前环节的总量（留存量+流失量）
 * @returns 修复后的留存量和总量（仅作为数据展示的）
 */
const fixedYAxisValue = (src: number = 0, dst: number = 0) => {
  if (src === dst) {
    return [src, dst];
  }
  // 绘制留存图是按照数据比例来计算的，则value值应该不大于1；最小间隔按照1%来计算；
  const MAX_VALUE = 1;
  const D_VALUE = 0.015;
  // 默认首先修改总量值；
  const fixedDst = Math.min(MAX_VALUE, dst + D_VALUE);
  // 留存值，和总量值应该至少相差D_VALUE，且不能小于0；
  let fixedSrc = Math.min(src, fixedDst - D_VALUE);
  if (fixedDst - D_VALUE <= 0) {
    fixedSrc = src;
  }
  fixedSrc = Math.max(0, fixedSrc);

  return [fixedSrc, fixedDst];
};

export const getSingleData = (data: LooseObject[], config?: ChartConfig) => {
  const yAxis = config?.funnel?.contrast || 'value';
  const fieldY = getFixedFieldY(yAxis);
  const covertData = [] as LooseObject[];
  const texts = [] as string[];
  let prev = {} as LooseObject;
  data.forEach((item: LooseObject, index: number) => {
    if (!item) {
      return;
    }
    item[fieldY] = item[yAxis];
    if (index === 0) {
      covertData.push({ ...item });
      item.__rate = 1;
      prev = item;
    } else if (item?.isPlaceholder) {
      covertData.push({ ...item });
    } else {
      const rate: number = item?.[yAxis] / prev[yAxis] || 0;
      texts.push(formatPercent(rate) as string);
      const covertYAxisVal = item?.[fieldY] < 0.01 ? prev?.[fieldY] - item?.[fieldY] : prev?.[fieldY] || 0;
      const [src, dst] = fixedYAxisValue(item?.[fieldY], covertYAxisVal);
      covertData.push({
        ...item,
        [fieldY]: dst,
        prev: { ...prev },
        column: { ...item },
      });
      if (item) {
        item[fieldY] = src;
      }

      item.__rate = rate;
      prev = item;
    }
  });

  return {
    source: data,
    covert: covertData,
    texts,
    elementCount: data?.length ?? 0,
    isGroup: false,
  };
};

const getCovertData = (data: LooseObject[], forwardKey: string, yAxis: string) => {
  const covertData = [] as LooseObject[];
  const fieldY = getFixedFieldY(yAxis);
  if (forwardKey) {
    const prefixItems = {} as LooseObject;
    data.forEach((item: LooseObject) => {
      if (!item) {
        return;
      }
      item[fieldY] = item[yAxis];
      const prevItem = prefixItems[item?.[forwardKey]];
      if (prevItem) {
        if (!item.isPlaceholder) {
          prefixItems[item[forwardKey]] = item;
          const covertYAxisVal = item?.[fieldY] < 0.01 ? prevItem?.[fieldY] - item?.[fieldY] : prevItem?.[fieldY] || 0;
          const rate = (item?.[yAxis] / prevItem?.[yAxis]) || 0
          const [src, dst] = fixedYAxisValue(item[fieldY], covertYAxisVal);
          covertData.push({
            ...item,
            [fieldY]: dst,
            prev: { ...prevItem },
            column: { ...item },
          });
          item.__rate = rate
          if (item) {
            item[fieldY] = src;
          }
        } else {
          covertData.push({ ...item, column: { ...item } });
        }
      } else {
        if (!item?.isPlaceholder) {
          prefixItems[item?.[forwardKey]] = item;
        }
        item.__rate = 1;
        covertData.push({ ...item, __rate: 1 });
      }
    });
  }
  return covertData;
};

export const getGroupData = (data: LooseObject[], config: ChartConfig) => {
  const forwardKey = config?.funnel?.color;
  const yAxis: string = config?.funnel?.contrast || 'value';
  const covertData = getCovertData(data, forwardKey, yAxis);
  return { source: data, covert: covertData, texts: [], isGroup: true };
};
