import { Element, IGroup, View } from '@antv/g2';
import { getMiddleCoordinate, getMiddleRect } from './utils';

function getLinkPath(element: Element, nextElement: Element) {
  const bbox = element.shape.getCanvasBBox();
  const nextBBox = nextElement.shape.getCanvasBBox();
  const path = [
    ['M', bbox.maxX, bbox.minY + 2],
    ['L', nextBBox.minX, nextBBox.minY + 2],
    ['L', nextBBox.minX, nextBBox.maxY],
    ['L', bbox.maxX, bbox.maxY],
    ['L', bbox.maxX, bbox.minY],
    ['Z'],
  ];
  return path;
}

function addLinkShape(group: IGroup, element: Element, nextElement: Element) {
  const style = {
    opacity: 0.1,
    fill: '#5F87FF',
  };
  group.addShape({
    type: 'path',
    attrs: {
      ...style,
      path: getLinkPath(element, nextElement),
      label: 'test2222',
    },
  });
}

const addTextShape = (group: IGroup, prev: Element, next: Element, text: string) => {
  if (text) {
    const width = 60;
    const height = 30;
    group.addShape({
      type: 'rect',
      attrs: {
        ...getMiddleRect(prev, next, width, height),
        fill: '#fff',
        stroke: '#C4C4C4',
        strokeWidth: 4,
        radius: [4, 4, 4, 4],
      },
    });
    group.addShape({
      type: 'text',
      attrs: {
        ...getMiddleCoordinate(prev, next),
        text,
        textBaseline: 'middle',
        textAlign: 'center',
        fill: '#000',
      },
    });
  }
};

const groupElements = (elements: Element[], callback: any) => {
  let prevEle = undefined;
  let count = 0;
  for (let i = 0; i < elements.length; i++) {
    const currentEle = elements[i];
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

const linkByElement = (view: View, groups: any[] = [], texts: string[] = []) => {
  try {
    const linkGroup = view.foregroundGroup.addGroup({
      id: 'link-by-color-group',
      capture: true,
    });
    const group = linkGroup.addGroup();
    const textGroup = linkGroup.addGroup();
    const elements = view.geometries?.[0]?.elements;
    groups.push(group);
    groups.push(textGroup);
    groupElements(elements, (prev: Element, next: Element, index: number) => {
      addLinkShape(group, prev, next);
      addTextShape(textGroup, prev, next, texts[index]);
    });
    return group;
  } catch (err) {}
};

export const addLinkByElement = (view: View, group: any[] = [], options: any) => {
  const { delay = 600, texts = [] } = options;
  if (!view) {
    return null;
  }
  if (delay <= 0) {
    return linkByElement(view, group, texts);
  }

  return setTimeout(() => {
    linkByElement(view, group, texts);
  }, delay);
};

// 通过高阶函数，保留groups对象
// 在重新render时候，会再次调用addLinkByElement事件
// 那么在这里的高阶函数，可以先做删除的操作
export const addLinkByElementHigh = () => {
  let groups = [] as any[];
  return function (view: View, options: any) {
    if (groups.length > 0) {
      groups.map((group) => group?.remove());
      groups = [];
    }
    addLinkByElement(view, groups, options);
  };
};
