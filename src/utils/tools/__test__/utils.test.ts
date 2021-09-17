import { getMiddleCoordinate, getLinkPath, getMiddleRect, getArrowPolygon } from '../utils';

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
      [135, 50],
      [155, 100],
      [135, 150],
      [55, 150],
      [55, 50],
    ]);
  });
});
