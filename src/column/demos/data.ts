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

export const dataWithTs = (days = 70, color = '步步盈增') => {
  const data: { ts: string; value: number; color: string }[] = [];
  const startDate = new Date('2021-08-07');

  for (let i = 0; i < days; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    const ts = currentDate.toISOString().split('T')[0];
    const value = (i === 5 || i === 15 || i === 25) ? 0 : Math.round(Math.random() * 12000 + 1000);
    data.push({ ts, value, color });
  }

  return data;
};

export const dataWithActive = [
  {
    tm: 1628870400000,
    NxDLPLD7: 793,
    type: '活跃人数',
  },
  {
    tm: 1628956800000,
    NxDLPLD7: 756,
    type: '活跃人数',
  },
  {
    tm: 1629043200000,
    NxDLPLD7: 1866,
    type: '活跃人数',
  },
  {
    tm: 1629129600000,
    NxDLPLD7: 483,
    type: '活跃人数',
  },
  {
    tm: 1629216000000,
    NxDLPLD7: 1381,
    type: '活跃人数',
  },
  {
    tm: 1629302400000,
    NxDLPLD7: 918,
    type: '活跃人数',
  },
  {
    tm: 1629388800000,
    NxDLPLD7: 1618,
    type: '活跃人数',
  },
];

export const dataWithComponsive = [
  { ts: '2021-08-07', value: 7923, color: '步步盈增' },
  { ts: '2021-08-07', value: 10102, color: '步步盈增(对比)' },
  { ts: '2021-08-08', value: 7029, color: '步步盈增' },
  { ts: '2021-08-08', value: 8410, color: '步步盈增(对比)' },
  { ts: '2021-08-09', value: 7892, color: '步步盈增' },
  { ts: '2021-08-09', value: 12300, color: '步步盈增(对比)' },
  { ts: '2021-08-10', value: 3782, color: '步步盈增' },
  { ts: '2021-08-10', value: 11023, color: '步步盈增(对比)' },
  { ts: '2021-08-11', value: 7982, color: '步步盈增' },
  { ts: '2021-08-11', value: 13589, color: '步步盈增(对比)' },
  { ts: '2021-08-12', value: 5893, color: '步步盈增' },
  { ts: '2021-08-12', value: 11234, color: '步步盈增(对比)' },
];

export const dataWithGroupByTs = (days = 25) => {
  const cities = ['北京', '上海', '天津'];
  const data: { city: string; ts: string; value: number }[] = [];
  const startDate = new Date('2021-08-07');

  for (let i = 0; i < days; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    const ts = currentDate.toISOString().split('T')[0];

    cities.forEach((city) => {
      const baseValue = Math.random() * 10000 + 3000;
      const value = Math.round(baseValue);
      data.push({ city, ts, value });
    });
  }

  return data;
};

export const dataWithGroup = [
  { company: 'Apple', type: '整体', value: 30 },
  { company: 'Facebook', type: '整体', value: 35 },
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

export const percentData = [
  { company: 'Facebook', type: '整体', value: 96 },
  { company: 'Apple', type: '整体', value: 0 },
  { company: 'Google', type: '整体', value: 4 },
  { company: 'Apple', type: '非技术岗', value: 25 },
  { company: 'Facebook', type: '非技术岗', value: 42 },
  { company: 'Google', type: '非技术岗', value: 33 },
  { company: 'Apple', type: '技术岗', value: 37 },
  { company: 'Facebook', type: '技术岗', value: 29 },
  { company: 'Google', type: '技术岗', value: 34 },
  { company: 'Apple', type: '业务岗', value: 38 },
  { company: 'Facebook', type: '业务岗', value: 35 },
  { company: 'Google', type: '业务岗', value: 27 },
];

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
