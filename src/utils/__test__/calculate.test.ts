import { DEFAULT_APPEND_PADDING, DEFAULT_CHART_HEIGHT } from '../../theme';
import { calculateBarHeight, calculateColumnWidth } from '../calculate';

describe('test calculateBarHeight', () => {
  test('call calculateBarHeight without config', () => {
    expect(calculateBarHeight(null as any, [])).toBe(200);
  });
});

describe('test calculateColumnWidth', () => {
  test('call calculateColumnWidth without config', () => {
    expect(calculateColumnWidth(null as any, [])).toBe(DEFAULT_APPEND_PADDING);
  });
});
