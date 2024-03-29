import { GroupCfg } from '@antv/g-base';
import { Element, IGroup, View } from '@antv/g2';
import { drawLinkPath, drawPolygon, drawText } from './brush';
import { LinkElementOptions } from './interfaces';
import { getArrowPolygon, getLinkPath, getMiddleCoordinate } from './utils';

function addLinkShape(group: IGroup, prev: Element, next: Element) {
  const model = next?.getModel?.();
  const color = model?.style?.color || model?.color;
  group.addShape(drawLinkPath(getLinkPath(prev, next), color));
}

const addTextShape = (group: IGroup, prev: Element, next: Element, text: string) => {
  if (text) {
    const model = next?.getModel?.();
    const color = model?.style?.color || model?.color;
    const width = 70;
    const height = 22;
    const centerPoint = getMiddleCoordinate(prev, next);
    const arrowPolygonPoints = getArrowPolygon(centerPoint, width, height);
    group.addShape(drawPolygon(arrowPolygonPoints, color));
    group.addShape(drawText(centerPoint, text));
  }
};

const reduceElements = (elements: Element[], callback: (prev: Element, current: Element, count: number) => void) => {
  let prevEle = undefined;
  let count = 0;
  for (const currentEle of elements) {
    const isPlaceholder = currentEle?.getData()?.isPlaceholder;
    if (!isPlaceholder) {
      if (prevEle) {
        callback(prevEle, currentEle, count);
        count++;
        prevEle = currentEle;
      } else {
        prevEle = currentEle;
      }
    }
  }
};

const linkByElement = (view: View, groups: GroupCfg[] = [], texts: string[] = [], showLabel: boolean = false) => {
  try {
    if (view.foregroundGroup.destroyed) {
      /* istanbul ignore next */
      return;
    }
    const linkGroup = view.foregroundGroup.addGroup({
      id: 'link-by-color-group',
      capture: true,
    });
    const group = linkGroup.addGroup();
    const textGroup = linkGroup.addGroup();
    const elements = view.geometries[0].elements;
    groups.push(group);
    groups.push(textGroup);
    reduceElements(elements, (prev: Element, next: Element, index: number) => {
      addLinkShape(group, prev, next);
      if (showLabel) {
        addTextShape(textGroup, prev, next, texts[index]);
      }
    });
  } catch (err) {
    // handle error message: console.warn(err);
  }
};

export const addLinkByElement = (view: View, group: GroupCfg[], options: LinkElementOptions) => {
  const { delay = 600, texts = [], showLabel } = options;
  if (!view) {
    return 0;
  }
  if (delay <= 0) {
    linkByElement(view, group, texts, showLabel);
    return 0;
  }

  return setTimeout(() => {
    linkByElement(view, group, texts, showLabel);
  }, delay);
};

// 通过高阶函数，保留groups对象
// 在重新render时候，会再次调用addLinkByElement事件
// 那么在这里的高阶函数，可以先做删除的操作
export const addLinkByElementHigh = () => {
  let groups = [] as GroupCfg[];
  let currentState: NodeJS.Timeout | number | undefined = 0;
  return function (view: View, options: LinkElementOptions) {
    groups = groups.filter((group) => {
      group.remove(true);
      return !group.destroyed;
    });
    clearTimeout(currentState as NodeJS.Timeout);
    currentState = addLinkByElement(view, groups, options);
  };
};
