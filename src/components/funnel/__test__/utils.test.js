const { getGroupData } = require('../utils');

describe('test utils', () => {
  test('test', () => {
    const data = [
      { type: '1.商品详情页｜浏览', city: '北京', value: 21734 },
      { type: '1.商品详情页｜浏览', city: '上海', value: 21000 },
      { type: '2.加入购物车', city: '北京', value: 18734, isPlaceholder: true },
      { type: '2.加入购物车', city: '上海', value: 17734, isPlaceholder: true },
      { type: '3.进入购物车', city: '北京', value: 6839 },
      { type: '3.进入购物车', city: '上海', value: 8539 },
      { type: '4.完成购买', city: '北京', value: 1320 },
      { type: '4.完成购买', city: '上海', value: 2420 },
    ];
    expect(getGroupData(data, { funnel: { color: 'city' } })).toEqual({
      source: [
        { type: '1.商品详情页｜浏览', city: '北京', value: 21734 },
        { type: '1.商品详情页｜浏览', city: '上海', value: 21000 },
        { type: '2.加入购物车', city: '北京', value: 18734, isPlaceholder: true },
        { type: '2.加入购物车', city: '上海', value: 17734, isPlaceholder: true },
        { type: '3.进入购物车', city: '北京', value: 6839 },
        { type: '3.进入购物车', city: '上海', value: 8539 },
        { type: '4.完成购买', city: '北京', value: 1320 },
        { type: '4.完成购买', city: '上海', value: 2420 },
      ],
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
          value: 6839,
          prev: {
            city: '北京',
            type: '3.进入购物车',
            value: 6839,
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
    });
  });
});
