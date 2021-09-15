import { Element, registerGeometryLabel, registerInteraction } from '@antv/g2';
import IntervalLabel from './intervalLabel';

export * from './elementLink';
export * from './intervalShape';

registerGeometryLabel('interval-label', IntervalLabel);
registerInteraction('element-link', {
  start: [
    {
      trigger: 'interval:mouseenter',
      action: 'element-link-by-color:link',
      arg: {
        style: (style: any, element: Element) => {
          const color = element.getModel()?.color;
          // 设置放射性/环形渐变色
          // { fill: `r(0.5,1.1,2) 0:#ffffff 1:${color}`, opacity: 0.7 };
          // 设置线性渐变色
          return { fill: `l(270) 0:#ffffff 1:${color}`, opacity: 0.1 };
        },
      },
    },
  ],
  end: [{ trigger: 'interval:mouseleave', action: 'element-link-by-color:unlink' }],
});
