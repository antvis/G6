import {
  Circle,
  DisplayObject,
  Ellipse,
  Group,
  IElement,
  Line,
  Polygon,
  Polyline,
  Rect,
  Text,
  Image,
} from '@antv/g';
import { EdgeShapeMap } from '../types/edge';
import { NodeShapeMap } from '../types/node';

const shapeTagMap = {
  circle: Circle,
  rect: Rect,
  ellipse: Ellipse,
  polygon: Polygon,
  line: Line,
  polyline: Polyline,
  text: Text,
  image: Image,
};

const createShape = (type: string, style: { [shapeAttr: string]: unknown }, id: string) => {
  const ShapeClass = shapeTagMap[type];
  return new ShapeClass({ style, id, autoUpdate: true });
};

export const upsertShape = (
  type: string,
  id: string,
  style: { [shapeAttr: string]: unknown },
  shapeMap: { [shapeId: string]: DisplayObject },
): DisplayObject => {
  let shape = shapeMap[id];
  if (!shape) {
    shape = createShape(type, style, id);
  } else if (shape.nodeName !== type) {
    shape.remove();
    shape = createShape(type, style, id);
  } else {
    Object.keys(style).forEach((key) => {
      shape.style[key] = style[key];
    });
  }
  return shape;
};

export const getGroupSucceedMap = (group: IElement, map?: { [id: string]: IElement }) => {
  let useMap = map || {};
  group.children.forEach((child) => {
    if (child.tagName === 'group') getGroupSucceedMap(child, useMap);
    useMap[child.id] = child;
  });
  return useMap;
};

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
  shouldUpdate: (id: string) => boolean = () => true,
): NodeShapeMap | EdgeShapeMap => {
  const tolalMap = {
    ...prevShapeMap,
    ...newShapeMap,
  };
  const finalShapeMap = {
    ...prevShapeMap,
  };
  Object.keys(tolalMap).forEach((id) => {
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
};
