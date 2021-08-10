import { Element } from '@antv/g2';

/**
 * 获取两个柱状elements上端连线的中间点
 *
 * @param prev 左边柱状element
 * @param next 右边柱状element
 * @returns {x, y}
 */
export const getMiddleCoordinate = (prev: Element, next: Element) => {
  const bbox = prev.shape.getCanvasBBox();
  const nextBBox = next.shape.getCanvasBBox();
  return { x: (nextBBox.minX + bbox.maxX) / 2, y: (nextBBox.minY + bbox.minY) / 2 };
};

/**
 * 基于两个柱状elements上端连线的中间点，绘制一个次中心点的rect
 * @param prev 左边柱状element
 * @param next 右边柱状element
 * @returns {x, y, width, height}
 */
export const getMiddleRect = (prev: Element, next: Element, width: number, height: number) => {
  const { x, y } = getMiddleCoordinate(prev, next);
  return { x: x - width / 2, y: y - height / 2, width, height };
};

/**
 * 基于两个柱状elements上端连线的中间点，绘制一个次中心点的箭头选框
 * @param prev 左边柱状element
 * @param next 右边柱状element
 * @returns {x, y, width, height}
 */
export const getArrowPath = (prev: Element, next: Element, width: number, height: number) => {
  const { x, y } = getMiddleCoordinate(prev, next);
  return { x: x - width / 2, y: y - height / 2, width, height };
};
