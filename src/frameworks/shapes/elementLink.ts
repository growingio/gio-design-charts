import { Element, IGroup, View } from "@antv/g2";
import { useEffect, useState } from "react";

function getLinkPath(element: Element, nextElement: Element) {
  const bbox = element.shape.getCanvasBBox();
  const nextBBox = nextElement.shape.getCanvasBBox();
  const path = [
    ["M", bbox.maxX, bbox.minY],
    ["L", nextBBox.minX, nextBBox.minY + 2],
    ["L", nextBBox.minX, nextBBox.maxY + 2],
    ["L", bbox.maxX, bbox.maxY],
    ["L", bbox.maxX, bbox.minY],
    ["Z"],
  ];
  return path;
}

function addLinkShape(group: IGroup, element: Element, nextElement: Element) {
  const style = {
    opacity: 0.1,
    fill: "#5F87FF",
  };
  group.addShape({
    type: "path",
    attrs: {
      ...style,
      path: getLinkPath(element, nextElement),
    },
  });
}

const linkByElement = (view: View, groups: any[] = []) => {
  const linkGroup = view.foregroundGroup.addGroup({
    id: "link-by-color-group",
    capture: false,
  });
  const group = linkGroup.addGroup();
  const elements = view.geometries?.[0]?.elements;
  const count = elements.length;
  groups.push(group);
  elements.map((element: Element, index: number) => {
    if (index < count - 1) {
      const nextEl = elements[index + 1];
      addLinkShape(group, element, nextEl);
    }
  });
  return group;
};

export const addLinkByElement = (
  view: View,
  delay: number = 600,
  group: any[] = []
) => {
  if (!view) {
    return null;
  }
  if (delay <= 0) {
    return linkByElement(view, group);
  }

  return setTimeout(() => {
    linkByElement(view, group);
  }, delay);
};

// 通过高阶函数，保留groups对象
// 在重新render时候，会再次调用addLinkByElement事件
// 那么在这里的高阶函数，可以先做删除的操作
export const addLinkByElementHigh = () => {
  let groups = [] as any[];
  return function (view: View, delay: number = 600) {
    if (groups.length > 0) {
      groups.map((group: any) => {
        group && group.remove();
      });
      groups = [];
    }
    addLinkByElement(view, delay, groups);
  };
};
