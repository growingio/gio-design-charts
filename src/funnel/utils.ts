import { ChartConfig } from '../interfaces';

export const getSingleData = (data: any[], config?: ChartConfig) => {
  const contrastKey = config?.funnel?.contrast || 'value';
  const covertData = [] as any[];
  const texts = [] as string[];
  let prev = {} as any;
  data.forEach((item: any, index: number) => {
    if (index === 0) {
      covertData.push({ ...item });
      prev = item;
    } else if (item?.isPlaceholder) {
      covertData.push({ ...item });
    } else {
      texts.push(`${((item?.[contrastKey] / prev[contrastKey] || 0) * 100).toFixed(2)}%`);
      covertData.push({ ...item, [contrastKey]: prev[contrastKey] || 0, prev: { ...prev }, column: { ...item } });
      prev = item;
    }
  });
  return {
    source: data,
    covert: covertData,
    texts,
    isGroup: false,
  };
};

export const getGroupData = (data: any[], config: ChartConfig) => {
  const covertData = [] as any[];
  const forwardKey = config?.funnel?.color;
  const contrastKey: string = config?.funnel?.contrast || 'value';
  if (forwardKey) {
    const prevs = {} as any;
    data.forEach((item: any) => {
      const prevItem = prevs[item?.[forwardKey]];
      if (prevItem) {
        if (!item.isPlaceholder) {
          prevs[item[forwardKey]] = item;
          covertData.push({ ...item, [contrastKey]: prevItem[contrastKey] || 0, prev: { ...prevItem } });
        } else {
          covertData.push({ ...item });
        }
      } else {
        if (!item?.isPlaceholder) {
          prevs[item?.[forwardKey]] = item;
        }
        covertData.push({ ...item });
      }
    });
  }
  return { source: data, covert: covertData, texts: [], isGroup: true };
};
