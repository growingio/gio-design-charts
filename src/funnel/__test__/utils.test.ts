import { LooseObject } from '@antv/g-base';
import { getGroupData, getSingleData } from '../utils';

describe('funnel utils', () => {
  const data = [
    { type: '1.商品详情页｜浏览', city: '北京', value: 21734 },
    { type: '1.商品详情页｜浏览', city: '上海', value: 21000 },
    { type: '2.加入购物车', city: '北京', value: 18734, isPlaceholder: true },
    { type: '2.加入购物车', city: '上海', value: 17734, isPlaceholder: true },
    { type: '3.进入购物车', city: '北京' },
    undefined,
    undefined,
    { type: '3.进入购物车', city: '上海', value: 8539 },
    { type: '4.完成购买', city: '北京', value: 1320 },
    { type: '4.完成购买', city: '上海', value: 2420 },
  ];

  const covertData = {
    source: data,
    covert: [
      { type: '1.商品详情页｜浏览', city: '北京', value: 21734 },
      { type: '1.商品详情页｜浏览', city: '上海', value: 21000 },
      { type: '2.加入购物车', city: '北京', value: 18734, isPlaceholder: true },
      { type: '2.加入购物车', city: '上海', value: 17734, isPlaceholder: true },
      {
        type: '3.进入购物车',
        city: '北京',
        value: 21734,
        prev: {
          city: '北京',
          type: '1.商品详情页｜浏览',
          value: 21734,
        },
      },
      {},
      {},
      {
        type: '3.进入购物车',
        city: '上海',
        value: 21000,
        prev: {
          city: '上海',
          type: '1.商品详情页｜浏览',
          value: 21000,
        },
      },
      {
        type: '4.完成购买',
        city: '北京',
        value: 0,
        prev: {
          city: '北京',
          type: '3.进入购物车',
        },
      },
      {
        type: '4.完成购买',
        city: '上海',
        value: 8539,
        prev: {
          city: '上海',
          type: '3.进入购物车',
          value: 8539,
        },
      },
    ],
    texts: [],
    isGroup: true,
  };

  test('getSingleData', () => {
    const singleData = [{ type: '商品', city: '北京', value: 21734 }, { type: '详情', city: '上海' }, undefined];
    const convertSingleData = {
      source: singleData,
      covert: [
        { type: '商品', city: '北京', value: 21734 },
        {
          type: '详情',
          city: '上海',
          value: 21734,
          prev: {
            city: '北京',
            type: '商品',
            value: 21734,
          },
          column: {
            city: '上海',
            type: '详情',
          },
        },
        {
          value: 0,
          prev: {
            city: '上海',
            type: '详情',
          },
          column: {},
        },
      ],
      texts: ['0.00%', '0.00%'],
      isGroup: false,
    };
    expect(getSingleData(singleData as LooseObject[])).toEqual(convertSingleData);
  });

  test('getGroupData', () => {
    expect(getGroupData(data as LooseObject[], { funnel: { color: 'city' } })).toEqual(covertData);
  });
});
