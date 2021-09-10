import { calculateBarHeight, calculateColumnWidth } from '../calculate';

describe('test calculateBarHeight', () => {
  test('test calculateBarHeight without config', () => {
    expect(calculateBarHeight(null as any, [])).toBeFalsy();
  });
});

describe('test calculateColumnWidth', () => {
  test('test calculateColumnWidth without config', () => {
    expect(calculateColumnWidth(null as any, [])).toBeFalsy();
  });
});
