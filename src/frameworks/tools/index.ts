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
          return { fill: color, opacity: 0.2 };
        },
      },
    },
  ],
  end: [{ trigger: 'interval:mouseleave', action: 'element-link-by-color:unlink' }],
});
