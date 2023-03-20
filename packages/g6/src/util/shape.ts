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
  Path,
  AABB,
} from '@antv/g';
import { clone, isArray, isNumber } from '@antv/util';
import { DEFAULT_LABEL_BG_PADDING } from '../constant';
import { Point } from '../types/common';
import { EdgeShapeMap } from '../types/edge';
import { GShapeStyle, SHAPE_TYPE, ItemShapeStyles } from '../types/item';
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
  path: Path,
};

const createShape = (type: SHAPE_TYPE, style: GShapeStyle, id: string) => {
  const ShapeClass = shapeTagMap[type];
  return new ShapeClass({ style, id, autoUpdate: true });
};

export const upsertShape = (
  type: SHAPE_TYPE,
  id: string,
  style: GShapeStyle,
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
export const formatPadding = (value, defaultArr = DEFAULT_LABEL_BG_PADDING) => {
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
 * Merge multiple shape style map including undefined value in incoming map.
 * @param styleMaps shapes' styles map array, the latter item in the array will be merged into the former
 * @returns 
 */
export const mergeStyles = (styleMaps: ItemShapeStyles[]) => {
  let currentResult = styleMaps[0];
  styleMaps.forEach((styleMap, i) => {
    if (i > 0) currentResult = merge2Styles(currentResult, styleMap);
  });
  return currentResult;
}

/**
 * Merge two shape style map including undefined value in incoming map.
 * @param styleMap1 shapes' styles map as current map
 * @param styleMap2 shapes' styles map as incoming map
 * @returns 
 */
const merge2Styles = (styleMap1: ItemShapeStyles, styleMap2: ItemShapeStyles) => {
  if (!styleMap1) return clone(styleMap2);
  else if (!styleMap2) return clone(styleMap1);
  const mergedStyle = clone(styleMap1);
  Object.keys(styleMap2).forEach(shapeId => {
    const style = styleMap2[shapeId];
    mergedStyle[shapeId] = mergedStyle[shapeId] || {};
    if (!style) return;
    Object.keys(style).forEach(styleName => {
      const value = style[styleName];
      mergedStyle[shapeId][styleName] = value;
    });
  });
  return mergedStyle;
}

/**
 * Whether two polygons are intersected.
 * @param points1 vertex array of polygon1
 * @param points2 vertex array of polygon2
 */
export const isPolygonsIntersect = (points1: number[][], points2: number[][]): boolean => {
  const getBBox = (points): Partial<AABB> => {
    const xArr = points.map(p => p[0]);
    const yArr = points.map(p => p[1]);
    return {
      min: [Math.min.apply(null, xArr),  Math.min.apply(null, yArr), 0],
      max: [Math.max.apply(null, xArr), Math.max.apply(null, yArr), 0],
    };
  };

  const parseToLines = (points: number[][]) => {
    const lines = [];
    const count = points.length;
    for (let i = 0; i < count - 1; i++) {
      const point = points[i];
      const next = points[i + 1];
      lines.push({
        from: {
          x: point[0],
          y: point[1],
        },
        to: {
          x: next[0],
          y: next[1],
        },
      });
    }
    if (lines.length > 1) {
      const first = points[0];
      const last = points[count - 1];
      lines.push({
        from: {
          x: last[0],
          y: last[1],
        },
        to: {
          x: first[0],
          y: first[1],
        },
      });
    }
    return lines;
  };

  // 空数组，或者一个点返回 false
  if (points1.length < 2 || points2.length < 2) {
    return false;
  }

  const bbox1 = getBBox(points1);
  const bbox2 = getBBox(points2);
  // 判定包围盒是否相交，比判定点是否在多边形内要快的多，可以筛选掉大多数情况
  if (!intersectBBox(bbox1, bbox2)) {
    return false;
  }

  let isIn = false;
  // 判定点是否在多边形内部，一旦有一个点在另一个多边形内，则返回
  points2.forEach(point => {
    if (isPointInPolygon(points1, point[0], point[1])) {
      isIn = true;
      return false;
    }
  });
  if (isIn) {
    return true;
  }
  points1.forEach(point => {
    if (isPointInPolygon(points2, point[0], point[1])) {
      isIn = true;
      return false;
    }
  });
  if (isIn) {
    return true;
  }

  const lines1 = parseToLines(points1);
  const lines2 = parseToLines(points2);
  let isIntersect = false;
  lines2.forEach(line => {
    if (lineIntersectPolygon(lines1, line)) {
      isIntersect = true;
      return false;
    }
  });
  return isIntersect;
};

export const intersectBBox = (box1: Partial<AABB>, box2: Partial<AABB>) => {
  return !(
    box2.min[0] > box1.max[0] ||
    box2.max[0] < box1.min[0] ||
    box2.min[1] > box1.max[1] ||
    box2.max[1] < box1.min[1]
  );
};

/**
 * Whether point is inside the polygon (ray algo) 
 * @param points
 * @param x
 * @param y
 */
export const isPointInPolygon = (points: number[][], x: number, y: number) => {
  let isHit = false;
  const n = points.length;
  // 判断两个double在eps精度下的大小关系
  const tolerance = 1e-6;
  function dcmp(xValue) {
    if (Math.abs(xValue) < tolerance) {
      return 0;
    }
    return xValue < 0 ? -1 : 1;
  }
  if (n <= 2) {
    // svg 中点小于 3 个时，不显示，也无法被拾取
    return false;
  }
  for (let i = 0; i < n; i++) {
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    if (onSegment(p1, p2, [x, y])) {
      // 点在多边形一条边上
      return true;
    }
    // 前一个判断min(p1[1],p2[1])<P.y<=max(p1[1],p2[1])
    // 后一个判断被测点 在 射线与边交点 的左边
    if (
      dcmp(p1[1] - y) > 0 !== dcmp(p2[1] - y) > 0 &&
      dcmp(x - ((y - p1[1]) * (p1[0] - p2[0])) / (p1[1] - p2[1]) - p1[0]) < 0
    ) {
      isHit = !isHit;
    }
  }
  return isHit;
};

/**
 * Whether q is on the segment line between p1 and p2.
 * @param p1 begin of segment line
 * @param p2 end of segment line
 * @param q the point to be judged
 * @returns 
 */
const onSegment = (p1, p2, q) => {
  if (
    (q[0] - p1[0]) * (p2[1] - p1[1]) === (p2[0] - p1[0]) * (q[1] - p1[1]) &&
    Math.min(p1[0], p2[0]) <= q[0] &&
    q[0] <= Math.max(p1[0], p2[0]) &&
    Math.min(p1[1], p2[1]) <= q[1] &&
    q[1] <= Math.max(p1[1], p2[1])
  ) {
    return true;
  }
  return false;
}

const lineIntersectPolygon = (lines, line) => {
  let isIntersect = false;
  lines.forEach(l => {
    if (getLineIntersect(l.from, l.to, line.from, line.to)) {
      isIntersect = true;
      return false;
    }
  });
  return isIntersect;
};

/**
 * Get the intersect point of two line.
 * @param  {Point}  p0 start of the first line
 * @param  {Point}  p1 end of the first line
 * @param  {Point}  p2 start of the second line
 * @param  {Point}  p3 end of the second line
 * @return {Point}  the intersect point
 */
export const getLineIntersect = (p0: Point, p1: Point, p2: Point, p3: Point): Point | null => {
  const tolerance = 0.0001;

  const E: Point = {
    x: p2.x - p0.x,
    y: p2.y - p0.y,
  };
  const D0: Point = {
    x: p1.x - p0.x,
    y: p1.y - p0.y,
  };
  const D1: Point = {
    x: p3.x - p2.x,
    y: p3.y - p2.y,
  };
  const kross: number = D0.x * D1.y - D0.y * D1.x;
  const sqrKross: number = kross * kross;
  const invertKross: number = 1 / kross;
  const sqrLen0: number = D0.x * D0.x + D0.y * D0.y;
  const sqrLen1: number = D1.x * D1.x + D1.y * D1.y;
  if (sqrKross > tolerance * sqrLen0 * sqrLen1) {
    const s = (E.x * D1.y - E.y * D1.x) * invertKross;
    const t = (E.x * D0.y - E.y * D0.x) * invertKross;
    if (!isBetween(s, 0, 1) || !isBetween(t, 0, 1)) return null;
    return {
      x: p0.x + s * D0.x,
      y: p0.y + s * D0.y,
    };
  }
  return null;
};

/**
 * Whether the value is begween the range of [min, max]
 * @param   {number}       value  the value to be judged
 * @param   {number}       min    the min of the range
 * @param   {number}       max    the max of the range
 * @return  {boolean}      bool   the result boolean
 */
const isBetween = (value: number, min: number, max: number) => value >= min && value <= max;
