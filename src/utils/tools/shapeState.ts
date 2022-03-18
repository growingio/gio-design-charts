import { Element } from '@antv/g2';
import { ChartOptions } from '../../interfaces';
import { COLOR_GRAY_1 } from '../../theme';

export const getShapeState = (options: ChartOptions) => {
  return {
    active: {
      style: (element: Element) => {
        // 因为Element.model中的颜色为G2根据theme自动设置的颜色，和根据业务需求设定的颜色会不同
        // 在element.stateStyle.default中设置的颜色为最真实的颜色，但stateStyle是私有方法，无法直接获取
        // 在这里采取Element中设置stateStyle的方法，获取stateStyle，并获取其中的fill颜色

        const defaultColor = options?.defaultStyles?.color;
        const modelFill = element?.getModel?.()?.style?.fill;
        const modelColor = element?.getModel?.()?.color;

        console.log(defaultColor, modelFill, modelColor);
        return {
          lineWidth: 2,
          stroke: defaultColor || modelColor || modelFill || '#000',
          strokeOpacity: 0.5,
        };
      },
    },
  };
};

export const getbackgroundState = () => {
  return {
    active: {
      style: () => {
        return { stroke: COLOR_GRAY_1 };
      },
    },
  };
};

export const getAreaShapeState = () => {
  return {
    active: {
      style: (element: Element) => {
        const model = element?.getModel?.();
        const fill = model?.style?.fill || model?.color || '#fff';
        return {
          lineWidth: 2,
          fill,
          strokeOpacity: 1,
        };
      },
    },
  };
};

export const getPointShapeState = () => ({
  active: {
    style: (element: Element) => {
      const model = element?.getModel?.();
      const fill = model?.style?.fill || model?.color || '#fff';
      return {
        stroke: fill,
      };
    },
  },
});
