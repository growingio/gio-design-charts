import { DEFAULT_FONT_COLOR, DEFAULT_FONT_FAMILY, DEFAULT_FONT_SIZE } from '../../../theme';
import { drawLinkPath, drawPolygon, drawText } from '../brush';

describe('test fromework brush', () => {
  test('call drawLinkPath', () => {
    expect(drawLinkPath([['M', 10, 10]])).toEqual({
      type: 'path',
      attrs: {
        opacity: 0.1,
        fill: 'l(270) 0:#ffffff 1:#5F87FF',
        path: [['M', 10, 10]],
      },
    });
  });

  test('call drawPolygon', () => {
    expect(
      drawPolygon([
        [1, 1],
        [2, 2],
      ])
    ).toEqual({
      type: 'polygon',
      attrs: {
        fill: '#fff',
        stroke: '#5F87FF',
        points: [
          [1, 1],
          [2, 2],
        ],
      },
    });
  });

  test('call drawText', () => {
    expect(drawText({ x: 10, y: 10 }, 'test')).toEqual({
      type: 'text',
      attrs: {
        x: 10,
        y: 10,
        text: 'test',
        textBaseline: 'middle',
        textAlign: 'center',
        fill: DEFAULT_FONT_COLOR,
        fontFamily: DEFAULT_FONT_FAMILY,
        fontSize: DEFAULT_FONT_SIZE,
      },
    });
  });
});
