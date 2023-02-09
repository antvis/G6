import { Circle, DisplayObject, Element, Ellipse, Group, IElement, Line, Polygon, Polyline, Rect } from "@antv/g";
import { BaseEdge } from "../stdlib/item/edge/base";
import { BaseNode } from "../stdlib/item/node/base";

const shapeTagMap = {
  'circle': Circle,
  'rect': Rect,
  'ellipse': Ellipse,
  'polygon': Polygon,
  'line': Line,
  'polyline': Polyline
}

export const createShape = (
  type: string,
  style: { [shapeAttr: string]: unknown },
  id: string,
  shapeMap: { [shapeId: string]: IElement }
): IElement => {
  let shape = shapeMap[id];
  if (!shape) {
    const ShapeClass = shapeTagMap[type];
    shape = new ShapeClass({ style, id, autoUpdate: true });
  } else {
    Object.keys(style).forEach(key => {
      shape.style[key] = style[key];
    });
  }
  return shape;
}

export const getGroupSucceedMap = (group: IElement, map?: { [id: string]: IElement }) => {
  let useMap = map || {};
  group.children.forEach(child => {
    if (child.tagName === 'group') getGroupSucceedMap(child, useMap);
    useMap[child.id] = child;
  });
  return useMap;
}