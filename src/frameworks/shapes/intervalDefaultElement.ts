import { IGroup, registerShape } from '@antv/g2';

import { DEFAULT_MIN_HEIGHT, BAR_TEXTURE } from '../../theme';
import { getRelateLegend, isStack, isTopBar, isUseDash } from '../utils';

export function getFillAttrs(shapeInfo: any) {
  return {
    ...shapeInfo.defaultStyle,
    ...shapeInfo.style,
    fill: shapeInfo.color,
    fillOpacity: shapeInfo.opacity,
  };
}

// 重新绘制rect，设置最小高度
function getBarRectAttrs(points: any[], stack?: boolean) {
  let width = Math.abs(points[0].x - points[2].x);
  const height = Math.abs(points[0].y - points[2].y);
  const defualtWidth = stack ? 0 : DEFAULT_MIN_HEIGHT;
  width = width < DEFAULT_MIN_HEIGHT ? (width === 0 ? width : defualtWidth) : width - 1;
  return { x: points[0].x, y: points[0].y - height, width, height };
}

// 重新绘制rect，设置最小高度
function getRectAttrs(points: any[], stack?: boolean) {
  const width = Math.abs(points[0].x - points[2].x);
  let height = Math.abs(points[0].y - points[2].y);
  const defualtHeight = stack ? height : DEFAULT_MIN_HEIGHT;
  height = height < DEFAULT_MIN_HEIGHT ? (height === 0 ? 0 : defualtHeight) : height - 1;
  return {
    x: (points[0].x + points[1].x) / 2,
    y: height <= DEFAULT_MIN_HEIGHT && height !== 0 ? points[1].y - 1 : points[1].y,
    width,
    height,
  };
}

function drawRect(main: any, shapeInfo: any, container: IGroup, handleRectAttrs: any) {
  const legend = getRelateLegend(shapeInfo);
  const useDash = isUseDash(shapeInfo);
  const attrs = getFillAttrs(shapeInfo);
  const group = container.addGroup();
  const points = main.parsePoints(shapeInfo.points); // 转换为画布坐标
  const stack = isStack(shapeInfo);
  const topBar = isTopBar(shapeInfo);

  const styles = useDash && legend.dashed ? { fill: `p(a)${BAR_TEXTURE}` } : { fill: legend.color || shapeInfo.color };

  const newAttrs = {
    ...attrs,
    ...handleRectAttrs(points, stack), // 获取 rect 绘图信息
    ...styles,
  };

  const { radius, strokeWidth, ...otherAttrs } = newAttrs;

  // 在堆积图中，最上面的rect需要有圆角，在中间和下面的rect，是不需要圆角的
  // 最上面的rect，取决于传入data的第一条数据
  // 所以，当rect是堆积图，并且不是最高的bar，则需要隐藏radius
  let radiusObj: any = { radius };
  let strokeWidthObj: any = {};
  radiusObj = stack && !topBar ? {} : radiusObj;

  // 当高度为0时，对应的value数值为0，则不需要显示默认的高度，这是需要取消radius的设定，防止多余的渲染
  radiusObj = newAttrs.height === 0 || newAttrs.width === 0 ? {} : radiusObj;
  if (newAttrs.height === 0 || newAttrs.width === 0) {
    radiusObj = { strokeWidth: 0 };
  } else {
    strokeWidthObj = { strokeWidth: 0 };
    radiusObj = radiusObj;
  }
  group.addShape('rect', {
    attrs: { ...otherAttrs, ...radiusObj },
  });
  return group;
}

// interval.shape("company", ["default-element"]);
// 在此registerShape中，定义如下：
// 1. 默认的最低高度
// 2. 矩形自带圆角
// 3. 实现加载条纹图片
// 参考 https://g2.antv.vision/zh/examples/column/stack#rounded-stacked
registerShape('interval', 'column-element', {
  draw(shapeInfo: any, container: IGroup) {
    return drawRect(this as any, shapeInfo, container, getRectAttrs);
  },
});

registerShape('interval', 'bar-element', {
  draw(shapeInfo: any, container: IGroup) {
    return drawRect(this as any, shapeInfo, container, getBarRectAttrs);
  },
});
