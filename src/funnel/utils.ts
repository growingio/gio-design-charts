import { LooseObject } from '@antv/component';
import { ChartConfig } from '../interfaces';

export const getSingleData = (data: LooseObject[], config?: ChartConfig) => {
  const contrastKey = config?.funnel?.contrast || 'value';
  const covertData = [] as LooseObject[];
  const texts = [] as string[];
  let prev = {} as LooseObject;
  data.forEach((item: LooseObject, index: number) => {
    if (index === 0) {
      covertData.push({ ...item });
      prev = item;
    } else if (item?.isPlaceholder) {
      covertData.push({ ...item });
    } else {
      texts.push(`${((item?.[contrastKey] / prev[contrastKey] || 0) * 100).toFixed(2)}%`);
      covertData.push({
        ...item,
        // [contrastKey]: prev[contrastKey] || 0,
        [contrastKey]:
          item?.[contrastKey] < 0.01 ? prev?.[contrastKey] - item?.[contrastKey] : prev?.[contrastKey] || 0,
        prev: { ...prev },
        column: { ...item },
      });
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

const getCovertData = (data: LooseObject[], forwardKey: string, contrastKey: string) => {
  const covertData = [] as LooseObject[];
  if (forwardKey) {
    const prevs = {} as LooseObject;
    data.forEach((item: LooseObject) => {
      const prevItem = prevs[item?.[forwardKey]];
      if (prevItem) {
        if (!item.isPlaceholder) {
          prevs[item[forwardKey]] = item;
          covertData.push({
            ...item,
            // [contrastKey]: prevItem[contrastKey] || 0,
            [contrastKey]:
              item?.[contrastKey] < 0.01 ? prevItem?.[contrastKey] - item?.[contrastKey] : prevItem?.[contrastKey] || 0,
            prev: { ...prevItem },
            column: { ...item },
          });
        } else {
          covertData.push({ ...item, column: { ...item } });
        }
      } else {
        if (!item?.isPlaceholder) {
          prevs[item?.[forwardKey]] = item;
        }
        covertData.push({ ...item });
      }
    });
  }
  return covertData;
};

export const getGroupData = (data: LooseObject[], config: ChartConfig) => {
  const forwardKey = config?.funnel?.color;
  const contrastKey: string = config?.funnel?.contrast || 'value';
  const covertData = getCovertData(data, forwardKey, contrastKey);
  return { source: data, covert: covertData, texts: [], isGroup: true };
};
