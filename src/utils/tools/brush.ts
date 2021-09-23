import { DEFAULT_FONT_COLOR } from '../../theme';
import { ShapeCfg } from '@antv/g-base/lib/types';

export const drawLinkPath = (path: (string | number)[][]): ShapeCfg => {
  return {
    type: 'path',
    attrs: {
      opacity: 0.1,
      // fill: '#5F87FF',
      fill: 'l(270) 0:#ffffff 1:#5F87FF',
      path,
    },
  };
};

export const drawPolygon = (points: [number, number][]): ShapeCfg => {
  return {
    type: 'polygon',
    attrs: {
      points,
      fill: '#fff',
      stroke: '#C4C4C4',
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
      fill: DEFAULT_FONT_COLOR,
    },
  };
};
