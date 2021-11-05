import { Point } from '@antv/component';
import { registerShape } from '@antv/g2';
import { Shape } from '@antv/g2/lib/interface';

const sliceNumber = 0.001;

// 自定义 other 的图形，增加两条线
registerShape('interval', 'slice-shape', {
  draw(cfg, container) {
    const points = cfg.points as Point[];
    let path = [];
    path.push(['M', points[0].x, points[0].y]);
    path.push(['L', points[1].x, points[1].y - sliceNumber]);
    path.push(['L', points[2].x, points[2].y - sliceNumber]);
    path.push(['L', points[3].x, points[3].y]);
    path.push('Z');
    path = (this as Shape).parsePath(path);
    return container.addShape('path', {
      attrs: {
        fill: cfg.color,
        path,
      },
    });
  },
});
