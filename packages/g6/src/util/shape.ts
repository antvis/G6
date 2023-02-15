import { Circle, DisplayObject, Element, Ellipse, Group, IElement, Line, Polygon, Polyline, Rect } from "@antv/g";
import { BaseEdge } from "../stdlib/item/edge/base";
import { BaseNode } from "../stdlib/item/node/base";
import { EdgeShapeMap } from "../types/edge";
import { NodeShapeMap } from "../types/node";

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

/**
 * Update shapes in the intersaction of prevShapeMap and newShapeMap;
 * Remove shapes in the prevShapeMap - newShapeMap (if removeDiff is true);
 * Add shapes in the newShapeMap - prevShapeMap;
 * @param prevShapeMap previous shape map
 * @param newShapeMap new shape map
 * @param group container group
 * @returns merged shape map
 */
export const updateShapes = (
  prevShapeMap: { [id: string]: DisplayObject },
  newShapeMap: { [id: string]: DisplayObject },
  group: Group,
  removeDiff: boolean = true,
  shouldUpdate: (id: string) => boolean = () => true
): (NodeShapeMap | EdgeShapeMap) => {
  const tolalMap = {
    ...prevShapeMap,
    ...newShapeMap
  };
  const finalShapeMap = {
    ...prevShapeMap
  };
  Object.keys(tolalMap).forEach(id => {
    const prevShape = prevShapeMap[id];
    const newShape = newShapeMap[id];
    if (newShape && !shouldUpdate(id)) return;
    if (prevShape && newShape) {
      // update intersaction
      finalShapeMap[id] = newShape;
      if (prevShape !== newShape) {
        prevShape.remove();
        group.appendChild(newShape);
      }
    } else if (!prevShape && newShape) {
      // add newShapeMap - prevShapeMap
      finalShapeMap[id] = newShape;
      group.appendChild(newShape);
    } else if (prevShape && !newShape && removeDiff) {
      // remove prevShapeMap - newShapeMap
      delete finalShapeMap[id];
      prevShape.remove();
    }
  });
  return finalShapeMap as NodeShapeMap;
}