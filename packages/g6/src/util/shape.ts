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
import { clone, isArray, isNumber } from '@antv/util';
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
  shapeMap[id] = shape;
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
      }
      group.appendChild(newShape);
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

/**
 * Format the number or array padding to an array with length 4, [padding-top, padding-right, padding-bottom, padding-left].
 * @param value value to be formatted
 * @param defaultArr default value
 * @returns [padding-top, padding-right, padding-bottom, padding-left]
 */
export const formatPadding = (value, defaultArr = [4, 4, 4, 4]) => {
  if (isArray(value)) {
    switch (value.length) {
      case 0:
        return defaultArr;
      case 1:
        return [value[0], value[0], value[0], value[0]];
      case 2:
        return value.concat(value);
      default:
        return value;
    }
  }
  if (isNumber(value)) return [value, value, value, value];
  return defaultArr;
};

/**
 * Merge two shape map including undefined value in incoming map.
 * @param styleMap1 shapes' styles map as current map
 * @param styleMap2 shapes' styles map as incoming map
 * @returns 
 */
export const mergeStyles = (styleMap1, styleMap2) => {
  const mergedStyle = clone(styleMap1);
  Object.keys(styleMap2).forEach(shapeId => {
    const style = styleMap2[shapeId];
    mergedStyle[shapeId] = mergedStyle[shapeId] || {};
    Object.keys(style).forEach(styleName => {
      const value = style[styleName];
      mergedStyle[shapeId][styleName] = value;
    });
  });
  return mergedStyle;
}

export const DEFAULT_LABEL_BG_PADDING = [4, 4, 4, 4];
/** Default shape style to avoid shape value missing */
export const DEFAULT_SHAPE_STYLE = {
  opacity: 1,
  fillOpacity: 1,
  shadowColor: undefined,
  shadowBlur: undefined,
  lineDash: undefined,
};
/** Default text style to avoid shape value missing */
export const DEFAULT_TEXT_STYLE = {
  ...DEFAULT_SHAPE_STYLE,
  fontSize: 12,
  fontFamily: 'sans-serif',
  fontWeight: 'normal',
  fontVariant: 'normal',
  fontStyle: 'normal',
  textBaseline: 'middle',
  textAlign: 'center',
  lineWidth: 0,
};
