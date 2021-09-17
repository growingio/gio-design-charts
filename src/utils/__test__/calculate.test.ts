import { calculateBarHeight, calculateColumnWidth } from '../calculate';

describe('test calculateBarHeight', () => {
  test('call calculateBarHeight without config', () => {
    expect(calculateBarHeight(null as any, [])).toBeFalsy();
  });
});

describe('test calculateColumnWidth', () => {
  test('call calculateColumnWidth without config', () => {
    expect(calculateColumnWidth(null as any, [])).toBeFalsy();
  });
});
