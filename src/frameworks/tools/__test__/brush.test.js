import { drawLinkPath, drawPolygon, drawText } from '../brush';

describe('test fromework brush', () => {
  test('test drawLinkPath', () => {
    expect(drawLinkPath([['M', 10, 10]])).toEqual({
      type: 'path',
      attrs: {
        opacity: 0.1,
        fill: 'l(270) 0:#ffffff 1:#5F87FF',
        path: [['M', 10, 10]],
      },
    });
  });

  test('test drawPolygon', () => {
    expect(
      drawPolygon([
        [1, 1],
        [2, 2],
      ])
    ).toEqual({
      type: 'polygon',
      attrs: {
        fill: '#fff',
        stroke: '#C4C4C4',
        points: [
          [1, 1],
          [2, 2],
        ],
      },
    });
  });

  test('test drawPolygon', () => {
    expect(drawText({ x: 10, y: 10 }, 'test')).toEqual({
      type: 'text',
      attrs: {
        x: 10,
        y: 10,
        text: 'test',
        textBaseline: 'middle',
        textAlign: 'center',
        fill: '#000',
      },
    });
  });
});
