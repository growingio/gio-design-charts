export const dataWithOneBar = [{ company: 'Apple', type: '整体', value: 30 }];

export const dataWithMultiBar = [
  { company: 'Apple', value: 10 },
  { company: 'Google', value: 13 },
  { company: '阿里巴巴', value: 60 },
  { company: '腾讯', value: 24 },
  { company: '百度', value: 46 },
  { company: '网易', value: 36 },
  { company: 'Microsoft', value: 12 },
  { company: '字节跳动', value: 5 },
];

export const dataWithGroup = [
  { company: 'Facebook', type: '整体', value: 35 },
  { company: 'Apple', type: '整体', value: 0 },
  { company: 'Google', type: '整体', value: 1 },
  { company: 'Apple', type: '非技术岗', value: 40 },
  { company: 'Facebook', type: '非技术岗', value: 65 },
  { company: 'Google', type: '非技术岗', value: 47 },
  { company: 'Apple', type: '技术岗', value: 23 },
  { company: 'Facebook', type: '技术岗', value: 18 },
  { company: 'Google', type: '技术岗', value: 20 },
  { company: 'Apple', type: '业务岗', value: 35 },
  { company: 'Facebook', type: '业务岗', value: 30 },
  { company: 'Google', type: '业务岗', value: 25 },
];

const getPercentData = (data: any[], type: string) => {
  const totalMapping = {} as any;
  data.map((item: any) => {
    totalMapping[item[type]] = (totalMapping[item[type]] || 0) + item.value;
    return item;
  });
  const newData = [] as any[];

  data.map((item: any) => {
    const value = Number((item.value / totalMapping[item[type]]).toFixed(2)) * 100 - 1;
    newData.push({
      ...item,
      value: value > 0 ? value : 0,
    });
    return item;
  });
  return newData as any[];
};

export const percentData = getPercentData(dataWithGroup, 'type');

export const dataWithGroupStack = [
  {
    type: '上月',
    category: '投入',
    北京: 1,
    天津: 2,
    上海: 3,
    重庆: 4,
    深圳: 5,
  },
  {
    type: '本月',
    category: '投入',
    北京: 1,
    天津: 2,
    上海: 3,
    重庆: 4,
    深圳: 5,
  },
  {
    type: '上月',
    category: '产出',
    北京: 1,
    天津: 2,
    上海: 3,
    重庆: 4,
    深圳: 5,
  },
  {
    type: '本月',
    category: '产出',
    北京: 1,
    天津: 2,
    上海: 3,
    重庆: 4,
    深圳: 5,
  },
  {
    type: '上月',
    category: '收益',
    北京: 1,
    天津: 2,
    上海: 3,
    重庆: 4,
    深圳: 5,
  },
  {
    type: '本月',
    category: '收益',
    北京: 1,
    天津: 2,
    上海: 3,
    重庆: 4,
    深圳: 5,
  },
  {
    type: '上月',
    category: '利润',
    北京: 1,
    天津: 2,
    上海: 3,
    重庆: 4,
    深圳: 5,
  },
  {
    type: '本月',
    category: '利润',
    北京: 1,
    天津: 2,
    上海: 3,
    重庆: 4,
    深圳: 5,
  },
];
