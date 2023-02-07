import { DEFAULT_FONT_COLOR, DEFAULT_FONT_FAMILY, DEFAULT_FONT_SIZE } from '../../theme';
import { ShapeCfg } from '@antv/g-base/lib/types';

export const drawLinkPath = (path: (string | number)[][], color: string = '#5F87FF'): ShapeCfg => {
  return {
    type: 'path',
    attrs: {
      opacity: 0.1,
      // fill: '#5F87FF',
      fill: `l(270) 0:#ffffff 1:${color}`,
      path,
    },
  };
};

export const drawPolygon = (points: [number, number][], color: string = '#5F87FF'): ShapeCfg => {
  return {
    type: 'polygon',
    attrs: {
      points,
      fill: '#fff',
      stroke: color,
    },
  };
};

export const drawText = (point: { x: number; y: number }, text: string): ShapeCfg => {
  return {
    type: 'text',
    attrs: {
      ...point,
      text,
      textBaseline: 'middle',
      textAlign: 'center',
      fontSize: DEFAULT_FONT_SIZE,
      fontFamily: DEFAULT_FONT_FAMILY,
      fill: DEFAULT_FONT_COLOR,
    },
  };
};
