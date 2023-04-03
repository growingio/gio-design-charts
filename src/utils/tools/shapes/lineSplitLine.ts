import { Point } from '@antv/g-base';
import { IGroup, registerShape } from '@antv/g2';
import { ShapeInfo, ShapeVertices } from '@antv/g2/lib/interface';

const splitData = (points: ShapeVertices, data?: any) => {
  let marker = 0;
  let findDivide = false;
  while (marker < data?.length && !findDivide) {
    if (data?.[marker]?.divide) {
      findDivide = true;
      break;
    }
    ++marker;
  }
  const points1 = [];
  const points2 = [];
  for (let i = 0; i < points?.length; i++) {
    const d = points?.[i];
    if (i < marker) {
      points1.push(d);
    } else {
      points2.push(d);
    }
  }
  points1.push(points2[0]);

  return [points1, points2];
};

registerShape('line', 'split-line', {
  draw(cfg: ShapeInfo, container: IGroup) {
    const group = container.addGroup();
    const pointArrs = splitData(cfg.points as ShapeVertices, cfg.data);
    const path1 = [];
    for (let i = 0; i < pointArrs[0].length; i++) {
      let pre = 'L';
      if (i === 0) {
        pre = 'M';
      }
      path1.push([pre, (pointArrs[0][i] as Point)?.x, (pointArrs[0][i] as Point)?.y]);
    }
    group.addShape('path', {
      attrs: {
        path: path1,
        // cfg?.style?.stroke 为通过style()设定的stroke颜色
        // cfg.color 为默认的颜色
        stroke: cfg?.style?.stroke || cfg.color,
        lineWidth: 2,
      },
    });

    const path2 = [];
    for (let i = 0; i < pointArrs[1].length; i++) {
      let pre = 'L';
      if (i === 0) {
        pre = 'M';
      }
      path2.push([pre, (pointArrs[1][i] as Point).x, (pointArrs[1][i] as Point).y]);
    }
    group.addShape('path', {
      attrs: {
        path: path2,
        stroke: cfg?.style?.stroke || cfg.color,
        lineWidth: 2,
        lineDash: [5, 2],
        opacity: 0.7,
      },
    });

    return group;
  },
});
