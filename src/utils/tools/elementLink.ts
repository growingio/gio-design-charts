import { GroupCfg } from '@antv/g-base';
import { Element, IGroup, View } from '@antv/g2';
import { FUNNEL_CRITICAL_COUNT } from '../../theme';
import { drawLinkPath, drawPolygon, drawText } from './brush';
import { LinkElementOptions } from './interfaces';
import { getArrowPolygon, getLinkPath, getMiddleCoordinate } from './utils';

function addLinkShape(group: IGroup, prev: Element, next: Element) {
  group.addShape(drawLinkPath(getLinkPath(prev, next)));
}

const addTextShape = (group: IGroup, prev: Element, next: Element, text: string) => {
  if (text) {
    const width = 70;
    const height = 22;
    const centerPoint = getMiddleCoordinate(prev, next);
    const arrowPolygonPoints = getArrowPolygon(centerPoint, width, height);
    group.addShape(drawPolygon(arrowPolygonPoints));
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

const linkByElement = (view: View, groups: GroupCfg[] = [], texts: string[] = []) => {
  try {
    if (view.foregroundGroup.destroyed) {
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
      if (texts.length < FUNNEL_CRITICAL_COUNT) {
        addTextShape(textGroup, prev, next, texts[index]);
      }
    });
  } catch (err) {
    // handle error message: console.warn(err);
  }
};

export const addLinkByElement = (view: View, group: GroupCfg[], options: LinkElementOptions) => {
  const { delay = 600, texts = [] } = options;
  if (!view) {
    return;
  }
  if (delay <= 0) {
    linkByElement(view, group, texts);
    return;
  }

  setTimeout(() => {
    linkByElement(view, group, texts);
  }, delay);
};

// 通过高阶函数，保留groups对象
// 在重新render时候，会再次调用addLinkByElement事件
// 那么在这里的高阶函数，可以先做删除的操作
export const addLinkByElementHigh = () => {
  let groups = [] as GroupCfg[];
  return function (view: View, options: LinkElementOptions) {
    if (groups.length > 0) {
      groups.forEach((group) => group.remove());
      groups = [];
    }
    addLinkByElement(view, groups, options);
  };
};
