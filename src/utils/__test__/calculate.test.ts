import { DEFAULT_APPEND_PADDING, DEFAULT_CHART_HEIGHT } from '../../theme';
import { calculateBarHeight, calculateColumnWidth, DEFAULT_MIN_COLUMN_WIDTH, DEFAULT_MAX_COLUMN_WIDTH, DEFAULT_INTERVAL_PADDING, DEFAULT_DODGE_PADDING, DEFAULT_PADDING } from '../calculate';

describe('test calculateBarHeight', () => {
  test('call calculateBarHeight without config', () => {
    expect(calculateBarHeight(null as any, [])).toBe(DEFAULT_CHART_HEIGHT);
  });
});

describe('test calculateColumnWidth', () => {
  test('call calculateColumnWidth without config', () => {
    const result = calculateColumnWidth(null as any, []);
    expect(result.width).toBe((DEFAULT_MIN_COLUMN_WIDTH + DEFAULT_INTERVAL_PADDING) * 1 + DEFAULT_APPEND_PADDING + DEFAULT_PADDING);
    expect(result.needScroll).toBe(false);
  });

  test('non-grouped chart should calculate correct width', () => {
    const config = { type: 'column', column: { position: 'x*y', color: 'category' } };
    const data = [
      { x: 'A', y: 10 },
      { x: 'B', y: 20 },
      { x: 'C', y: 30 },
    ];
    const result = calculateColumnWidth(config as any, data, 200);
    const expectedWidth = (DEFAULT_MIN_COLUMN_WIDTH + DEFAULT_INTERVAL_PADDING) * 3 + DEFAULT_APPEND_PADDING + DEFAULT_PADDING;
    expect(result.width).toBe(expectedWidth);
  });

  test('grouped chart should calculate correct width with dodge', () => {
    const config = { type: 'column', column: { position: 'x*y', color: 'category', adjust: ['dodge'] } };
    const data = [
      { x: 'A', y: 10, category: 'cat1' },
      { x: 'A', y: 20, category: 'cat2' },
      { x: 'B', y: 15, category: 'cat1' },
      { x: 'B', y: 25, category: 'cat2' },
    ];
    const result = calculateColumnWidth(config as any, data, 200);
    const groupCount = 2;
    const maxRowCount = 2;
    const expectedWidth = ((DEFAULT_MIN_COLUMN_WIDTH + DEFAULT_DODGE_PADDING) * maxRowCount - DEFAULT_DODGE_PADDING + DEFAULT_INTERVAL_PADDING) * groupCount + DEFAULT_APPEND_PADDING + DEFAULT_PADDING;
    expect(result.width).toBe(expectedWidth);
  });

  test('should return needScroll true when calculated width > container width', () => {
    const config = { type: 'column', column: { position: 'x*y', color: 'category' } };
    const data = [
      { x: 'A', y: 10 },
      { x: 'B', y: 20 },
      { x: 'C', y: 30 },
      { x: 'D', y: 40 },
      { x: 'E', y: 50 },
      { x: 'F', y: 60 },
      { x: 'G', y: 70 },
      { x: 'H', y: 80 },
      { x: 'I', y: 90 },
      { x: 'J', y: 100 },
    ];
    const containerWidth = 100;
    const result = calculateColumnWidth(config as any, data, containerWidth);
    expect(result.needScroll).toBe(true);
  });

  test('should use custom config when provided', () => {
    const config = {
      type: 'column',
      column: { position: 'x*y', color: 'category' },
      customSizeConfig: {
        minColumnWidth: 20,
        maxColumnWidth: 50,
        intervalPadding: 30,
        dodgePadding: 10,
      },
    };
    const data = [
      { x: 'A', y: 10 },
      { x: 'B', y: 20 },
    ];
    const result = calculateColumnWidth(config as any, data, 500);
    const expectedWidth = (20 + 30) * 2 + DEFAULT_APPEND_PADDING + DEFAULT_PADDING;
    expect(result.width).toBe(expectedWidth);
    expect(result.columnWidth).toBe(50);
  });

  test('should use min column width when scroll is triggered', () => {
    const config = {
      type: 'column',
      column: { position: 'x*y', color: 'category' },
      customSizeConfig: {
        minColumnWidth: 15,
        maxColumnWidth: 60,
      },
    };
    const data = [
      { x: 'A', y: 10 },
      { x: 'B', y: 20 },
      { x: 'C', y: 30 },
    ];
    const result = calculateColumnWidth(config as any, data, 50);
    expect(result.needScroll).toBe(true);
    expect(result.columnWidth).toBe(15);
  });
});
