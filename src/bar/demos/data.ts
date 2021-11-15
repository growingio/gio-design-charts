export const data = [
  { type: '汽车', value: 34 },
  { type: '建材家居', value: 85 },
  { type: '住宿旅游', value: 103 },
  { type: '交通运输与仓储邮政', value: 142 },
  { type: '建筑房地产', value: 251 },
  { type: '教育', value: 367 },
  { type: 'IT 通讯电子', value: 491 },
  { type: '社会公共管理', value: 672 },
  { type: '医疗卫生', value: 868 },
  { type: '金融保险', value: 1234 },
];

export const dataWithMulti = [
  { name: '页面浏览的总数量', value: 120124 },
  { name: '访问推出的总数量', value: 241234 },
  { name: '步步盈增的用户量', value: 343455 },
];

export const dataWithMultiContrast = [
  { name: '页面浏览的总数量', type: '上月', value: 110124 },
  { name: '页面浏览的总数量', type: '本月', value: 120124 },
  { name: '访问推出的总数量', type: '上月', value: 281234 },
  { name: '访问推出的总数量', type: '本月', value: 241234 },
  { name: '步步盈增的用户量', type: '上月', value: 343455 },
  { name: '步步盈增的用户量', type: '本月', value: 393455 },
];

export const data4Interval = [
  { type: '汽车', value: 34 },
  { type: '建材家居', value: 85 },
  { type: '住宿旅游', value: 103 },
  { type: '交通运输与仓储邮政', value: 142, suffix: { text: '中位数: 20%' } },
  { type: '建筑房地产', value: 251 },
  { type: '教育', value: 367 },
  { type: 'IT 通讯电子', value: 491 },
  { type: '社会公共管理', value: 672 },
  { type: '医疗卫生', value: 868 },
  { type: '金融保险', value: 1234 },
];

export const dataWithMultiContrast4Interval = [
  { name: '页面浏览的总数量', type: '上月', value: 110124 },
  { name: '页面浏览的总数量', type: '本月', value: 120124 },
  { name: '访问推出的总数量', type: '上月', value: 281234, suffix: { text: '中位数: 123' } },
  { name: '访问推出的总数量', type: '本月', value: 241234, suffix: { text: '中位数: 345' } },
  { name: '步步盈增的用户量', type: '上月', value: 343455 },
  { name: '步步盈增的用户量', type: '本月', value: 393455 },
];

export const dataWithGroup4Interval = [
  { company: 'Apple', type: '整体', value: 30 },
  { company: 'Facebook', type: '整体', value: 35 },
  { company: 'Google', type: '整体', value: 1 },
  { company: 'Apple', type: '非技术岗', value: 40 },
  { company: 'Facebook', type: '非技术岗', value: 65 },
  { company: 'Google', type: '非技术岗', value: 47 },
  { company: 'Apple', type: '技术岗', value: 23, suffix: { text: '中位数: 15' } },
  { company: 'Facebook', type: '技术岗', value: 18, suffix: { text: '中位数: 25' } },
  { company: 'Google', type: '技术岗', value: 20, suffix: { text: '中位数: 35' } },
  { company: 'Apple', type: '业务岗', value: 35 },
  { company: 'Facebook', type: '业务岗', value: 30 },
  { company: 'Google', type: '业务岗', value: 25 },
];
