import { ChartConfig } from '../../interface';

export const getSingleData = (data: any[]) => {
  const covertData = [] as any[];
  const texts = [] as string[];
  let prev = {} as any;
  data.map((item: any, index: number) => {
    if (index === 0) {
      covertData.push({ ...item });
      prev = item;
    } else if (item?.isPlaceholder) {
      covertData.push({ ...item });
    } else {
      texts.push(`${((item?.value / prev?.value || 0) * 100).toFixed(2)}%`);
      covertData.push({ ...item, value: prev?.value || 0, prev: { ...prev }, column: {...item} });
      // covertData.push({ ...item, value: prev?.value || 0, prev: { ...prev } });
      prev = item;
    }
    return item;
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
  if (forwardKey) {
    const prevs = {} as any;
    data.map((item: any) => {
      const prevItem = prevs[item[forwardKey]];
      if (prevItem) {
        if (!item?.isPlaceholder) {
          prevs[item[forwardKey]] = item;
          covertData.push({ ...item, value: prevItem?.value || 0, prev: { ...prevItem } });
        } else {
          covertData.push({ ...item });
        }
      } else {
        if (!item?.isPlaceholder) {
          prevs[item[forwardKey]] = item;
        }
        covertData.push({ ...item });
      }
      return item;
    });
  }
  return {
    source: data,
    covert: covertData,
    texts: [],
    isGroup: true,
  };
};
