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
    return 0;
  }
  if (delay <= 0) {
    linkByElement(view, group, texts);
    return 0;
  }

  return setTimeout(() => {
    linkByElement(view, group, texts);
  }, delay);
};

// ???????????????????????????groups??????
// ?????????render????????????????????????addLinkByElement??????
// ????????????????????????????????????????????????????????????
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
