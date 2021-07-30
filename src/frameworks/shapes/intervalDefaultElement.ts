import { IGroup, registerShape } from "@antv/g2";

// import { parseRadius, clamp } from "@antv/util";
import { parseRadius } from "@antv/g2/lib/geometry/shape/interval/util";
import { getRelateLegend } from "../utils";

const minHeight = 4;

function getFillAttrs(cfg: any) {
  return {
    ...cfg.defaultStyle,
    ...cfg.style,
    fill: cfg.color,
    fillOpacity: cfg.opacity,
  };
}

function getRectPath(points: any[]) {
  const path = [];
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    if (point) {
      const action = i === 0 ? "M" : "L";
      path.push([action, point.x, point.y]);
    }
  }
  const first = points[0];
  path.push(["L", first.x, first.y]);
  path.push(["z"]);
  return path;
}

// function addRadius(path: any[]) {
//   const radius = [0, 4, 0, 0];
//   const [r1, r2, r3, r4] = parseRadius(radius, 10);
//   const temp = [];
//   // temp.push(["M", path[0][1], path[1][2] + r1]);
//   // r1 !== 0 && temp.push(["A", r1, r1, 0, 0, 1, path[0][1] + r1, path[1][2]]);
//   // temp.push(["L", path[1][1] - r2, path[1][2]]);
//   // r2 !== 0 && temp.push(["A", r2, r2, 0, 0, 1, path[1][1], path[1][2] + r2]);
//   // temp.push(["L", path[1][1], path[0][2] - r3]);
//   // r3 !== 0 && temp.push(["A", r3, r3, 0, 0, 1, path[1][1] - r3, path[0][2]]);
//   // temp.push(["L", path[0][1] + r4, path[0][2]]);
//   // r4 !== 0 && temp.push(["A", r4, r4, 0, 0, 1, path[0][1], path[0][2] - r4]);
//   // temp.push(["z"]);
//   temp.push(["M", path[0][1], path[0][2] + r1]);
//   r1 !== 0 && temp.push(["A", r1, r1, 0, 0, 1, path[0][1] + r1, path[0][2]]);
//   temp.push(["L", path[1][1] - r2, path[1][2]]);
//   r2 !== 0 && temp.push(["A", r2, r2, 90, 0, 1, path[1][1] + r2, path[1][2]]);
//   temp.push(["L", path[2][1], path[2][2] - r3]);
//   r3 !== 0 && temp.push(["A", r3, r3, 0, 0, 1, path[2][1] - r3, path[2][2]]);
//   temp.push(["L", path[3][1] + r4, path[3][2]]);
//   r4 !== 0 && temp.push(["A", r4, r4, 0, 0, 1, path[3][1], path[3][2] - r4]);
//   temp.push(["L", path[4][1], path[4][2]]);
//   temp.push(["z"]);
//   return temp;
// }

function getRectAttrs(points: any[], shapeInfo: any) {
  const width = Math.abs(points[0].x - points[2].x);
  const height = Math.abs(points[0].y - points[2].y);
  return {
    x: shapeInfo.x - width / 2,
    y: height <= minHeight ? shapeInfo.y - (minHeight - height) : shapeInfo.y,
    width: width - 4,
    height: height <= minHeight ? minHeight : height,
  };
}

// interval.shape("company", ["default-element"]);
// 在此registerShape中，定义如下：
// 1. 默认的最低高度
// 2. 矩形自带圆角
// 3. 实现加载条纹图片
// 参考 https://g2.antv.vision/zh/examples/column/stack#rounded-stacked
registerShape("interval", "default-element", {
  draw(shapeInfo: any, container: IGroup) {
    const legend = getRelateLegend(shapeInfo);
    console.log(legend);
    const attrs = getFillAttrs(shapeInfo);
    const group = container.addGroup();
    const points = (this as any).parsePoints(shapeInfo.points); // 转换为画布坐标

    const styles = legend.dashed
      ? {
          fill: "p(n)/acorn_PNG37019.png",
        }
      : {};

    group.addShape("rect", {
      attrs: {
        ...attrs,
        ...getRectAttrs(points, shapeInfo), // 获取 rect 绘图信息
        ...styles,
      },
    });

    return group;
  },
});

// 设置柱状图最低的高度
// 参考 https://g2.antv.vision/zh/examples/column/stack#rounded-stacked
// registerShape("interval", "min-height", {
//   draw(shapeInfo: any, container: IGroup) {
//     const attrs = getFillAttrs(shapeInfo);
//     let path = getRectPath(shapeInfo.points);
//     path = (this as any).parsePath(path);
//     const temp = [];
//     temp.push(["M", path[0][1], path[0][2]]);
//     temp.push([
//       "L",
//       path[1][1],
//       path[0][2] - path[1][2] < minHeight ? path[0][2] - minHeight : path[1][2],
//     ]);
//     temp.push([
//       "L",
//       path[2][1],
//       path[3][2] - path[2][2] < minHeight ? path[3][2] - minHeight : path[2][2],
//     ]);
//     temp.push(["L", path[3][1], path[3][2]]);
//     temp.push(["L", path[4][1], path[4][2]]);
//     temp.push(["z"]);
//     const group = container.addGroup();
//     group.addShape("path", {
//       attrs: {
//         ...attrs,
//         path: addRadius(temp),
//         radius: [4, 4, 0, 0],
//       },
//     });
//     return group;
//   },
// });
