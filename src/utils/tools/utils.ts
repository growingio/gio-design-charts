import { Element } from '@antv/g2';

export const getLinkPath = (prev: Element, next: Element): (string | number)[][] => {
  const bbox = prev.shape.getCanvasBBox();
  const nextBBox = next.shape.getCanvasBBox();
  return [
    ['M', bbox.maxX, bbox.minY + 2],
    ['L', nextBBox.minX, nextBBox.minY + 2],
    ['L', nextBBox.minX, nextBBox.maxY],
    ['L', bbox.maxX, bbox.maxY],
    ['L', bbox.maxX, bbox.minY],
    ['Z'],
  ];
};

/**
 * 获取两个柱状elements上端连线的中间点
 *
 * @param prev 左边柱状element
 * @param next 右边柱状element
 * @returns {x, y}
 */
export const getMiddleCoordinate = (prev: Element, next: Element): { x: number; y: number } => {
  const bbox = prev.shape.getCanvasBBox();
  const nextBBox = next.shape.getCanvasBBox();
  return { x: (nextBBox.minX + bbox.maxX) / 2, y: (nextBBox.minY + bbox.minY) / 2 };
};

/**
 * 基于中心点，绘制一个矩形
 * @param prev 左边柱状element
 * @param next 右边柱状element
 * @returns {x, y, width, height}
 */
export const getMiddleRect = (point: { x: number; y: number }, width: number, height: number) => {
  const { x, y } = point;
  return { x: x - width / 2, y: y - height / 2, width, height };
};

/**
 * 基于中心点，绘制一个箭头多边形
 * @param point the center point for arrow polygon
 * @param width the width of the whole polygon
 * @param height the height of the whole polygon
 * @returns
 */
export const getArrowPolygon = (point: { x: number; y: number }, width: number, height: number): [number, number][] => {
  const { x, y } = point;
  return [
    [x - width * 0.45, y - height * 0.5],
    [x + width * 0.3, y - height * 0.5],
    [x + width * 0.5, y],
    [x + width * 0.3, y + height * 0.5],
    [x - width * 0.45, y + height * 0.5],
    [x - width * 0.45, y - height * 0.5],
  ];
};
