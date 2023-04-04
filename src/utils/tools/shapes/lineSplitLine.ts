import { Point } from '@antv/g-base';
import { IGroup, registerShape } from '@antv/g2';
import { ShapeInfo, ShapeVertices } from '@antv/g2/lib/interface';
import { isEmpty } from 'lodash';

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
  if (points2[0]) {
    points1.push(points2[0]);
  }
  return [points1, points2];
};

registerShape('line', 'split-line', {
  draw(cfg: ShapeInfo, container: IGroup) {
    const group = container.addGroup();
    const [solidLinePoints, dashLinePoints] = splitData(cfg.points as ShapeVertices, cfg.data);

    if (solidLinePoints.length === 1) {
      group.addShape('circle', {
        attrs: {
          x: (solidLinePoints[0] as Point)?.x,
          y: (solidLinePoints[0] as Point)?.y,
          r: 2,
          // cfg?.style?.stroke 为通过style()设定的stroke颜色
          // cfg.color 为默认的颜色
          stroke: cfg?.style?.stroke || cfg.color,
          fill: cfg?.style?.stroke || cfg.color,
          lineWidth: 2,
        },
      });
    } else if (solidLinePoints.length > 1) {
      const solidPath = [];
      for (let i = 0; i < solidLinePoints.length; i++) {
        let pre = 'L';
        if (i === 0) {
          pre = 'M';
        }
        if (!solidLinePoints[i]) {
          if (i === 1) {
            group.addShape('circle', {
              attrs: {
                x: (solidLinePoints[0] as Point)?.x,
                y: (solidLinePoints[0] as Point)?.y,
                r: 2,
                // cfg?.style?.stroke 为通过style()设定的stroke颜色
                // cfg.color 为默认的颜色
                stroke: cfg?.style?.stroke || cfg.color,
                fill: cfg?.style?.stroke || cfg.color,
                lineWidth: 2,
              },
            });
          }
        } else {
          solidPath.push([pre, (solidLinePoints[i] as Point)?.x, (solidLinePoints[i] as Point)?.y]);
        }
      }
      group.addShape('path', {
        attrs: {
          path: solidPath,
          // cfg?.style?.stroke 为通过style()设定的stroke颜色
          // cfg.color 为默认的颜色
          stroke: cfg?.style?.stroke || cfg.color,
          lineWidth: 2,
        },
      });
    }

    if (dashLinePoints.length > 0) {
      const dashPath = [];
      for (let i = 0; i < dashLinePoints.length; i++) {
        let pre = 'L';
        if (i === 0) {
          pre = 'M';
        }
        dashPath.push([pre, (dashLinePoints[i] as Point).x, (dashLinePoints[i] as Point).y]);
      }
      group.addShape('path', {
        attrs: {
          path: dashPath,
          stroke: cfg?.style?.stroke || cfg.color,
          lineWidth: 2,
          lineDash: [5, 2],
          opacity: 0.7,
        },
      });
    }

    return group;
  },
});
