import { IGroup, registerShape } from "@antv/g2";

import { DEFAULT_MIN_HEIGHT, BAR_TEXTURE } from "../../theme";
import { getRelateLegend, isStack, isTopBar, isUseDash } from "../utils";

export function getFillAttrs(shapeInfo: any) {
  return {
    ...shapeInfo.defaultStyle,
    ...shapeInfo.style,
    fill: shapeInfo.color,
    fillOpacity: shapeInfo.opacity,
  };
}

// 重新绘制rect，设置最小高度
function getRectAttrs(points: any[]) {
  const width = Math.abs(points[0].x - points[2].x);
  const height = Math.abs(points[0].y - points[2].y);

  return {
    x: (points[0].x + points[1].x) / 2,
    y:
      height <= DEFAULT_MIN_HEIGHT && height !== 0
        ? points[1].y - (DEFAULT_MIN_HEIGHT - height)
        : points[1].y,
    width: width - 4,
    height:
      height <= DEFAULT_MIN_HEIGHT && height !== 0
        ? DEFAULT_MIN_HEIGHT
        : height,
  };
}

// interval.shape("company", ["default-element"]);
// 在此registerShape中，定义如下：
// 1. 默认的最低高度
// 2. 矩形自带圆角
// 3. 实现加载条纹图片
// 参考 https://g2.antv.vision/zh/examples/column/stack#rounded-stacked
registerShape("interval", "column-element", {
  draw(shapeInfo: any, container: IGroup) {
    const legend = getRelateLegend(shapeInfo);
    const useDash = isUseDash(shapeInfo);
    const attrs = getFillAttrs(shapeInfo);
    const group = container.addGroup();
    const points = (this as any).parsePoints(shapeInfo.points); // 转换为画布坐标

    const styles =
      useDash && legend.dashed
        ? { fill: `p(a)${BAR_TEXTURE}` }
        : { fill: legend.color || shapeInfo.color };

    const newAttrs = {
      ...attrs,
      ...getRectAttrs(points), // 获取 rect 绘图信息
      ...styles,
    };

    const { radius, ...otherAttrs } = newAttrs;

    const stack = isStack(shapeInfo);
    const topBar = isTopBar(shapeInfo);
    // 在堆积图中，最上面的rect需要有圆角，在中间和下面的rect，是不需要圆角的
    // 最上面的rect，取决于传入data的第一条数据
    // 所以，当rect是堆积图，并且不是最高的bar，则需要隐藏radius
    let radiusObj: any = { radius };
    radiusObj = stack && !topBar ? {} : radiusObj;

    // 当高度为0时，对应的value数值为0，则不需要显示默认的高度，这是需要取消radius的设定，防止多余的渲染
    radiusObj = newAttrs.height === 0 || newAttrs.width === 0 ? {} : radiusObj;
    group.addShape("rect", {
      attrs: { ...otherAttrs, ...radiusObj },
    });
    return group;
  },
});
