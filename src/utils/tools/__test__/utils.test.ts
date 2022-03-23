import { DEFAULT_FONT_COLOR } from '../../../theme';
import { getMiddleCoordinate, getLinkPath, getMiddleRect, getArrowPolygon, getColorByGroupModel } from '../utils';

describe('test fromework utils', () => {
  test('call getLinkPath', () => {
    const mockElement1 = {
      shape: {
        getCanvasBBox: () => {
          return { maxX: 100, maxY: 100, minX: 10, minY: 10 };
        },
      },
    };
    const mockElement2 = {
      shape: {
        getCanvasBBox: () => {
          return { maxX: 200, maxY: 200, minX: 150, minY: 150 };
        },
      },
    };
    expect(getLinkPath(mockElement1 as any, mockElement2 as any)).toEqual([
      ['M', 100, 12],
      ['L', 150, 152],
      ['L', 150, 200],
      ['L', 100, 100],
      ['L', 100, 10],
      ['Z'],
    ]);
  });

  test('call getMiddleCoordinate', () => {
    const mockElement1 = {
      shape: {
        getCanvasBBox: () => {
          return { maxX: 100, maxY: 100, minX: 10, minY: 10 };
        },
      },
    };
    const mockElement2 = {
      shape: {
        getCanvasBBox: () => {
          return { maxX: 200, maxY: 200, minX: 150, minY: 150 };
        },
      },
    };
    expect(getMiddleCoordinate(mockElement1 as any, mockElement2 as any)).toEqual({ x: 125, y: 80 });
  });

  test('call getMiddleRect', () => {
    expect(getMiddleRect({ x: 100, y: 100 }, 100, 100)).toEqual({ x: 50, y: 50, width: 100, height: 100 });
  });

  test('call getArrowPolygon', () => {
    expect(getArrowPolygon({ x: 100, y: 100 }, 100, 100)).toEqual([
      [55, 50],
      [130, 50],
      [150, 100],
      [130, 150],
      [55, 150],
      [55, 50],
    ]);
  });

  test('call getColorByGroupModel with default', () => {
    const model = {} as any;
    const color = getColorByGroupModel(model);
    expect(color).toBe(DEFAULT_FONT_COLOR);
  });

  test('call getColorByGroupModel with model.color', () => {
    const model = { color: '#F1F1F1' } as any;
    const color = getColorByGroupModel(model);
    expect(color).toBe('#F1F1F1');
  });

  test('call getColorByGroupModel with model.style.fill', () => {
    const model = { style: { fill: '#F1F1F1' } } as any;
    const color = getColorByGroupModel(model);
    expect(color).toBe('#F1F1F1');
  });
});
