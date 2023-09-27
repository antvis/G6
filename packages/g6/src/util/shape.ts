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
  Tuple3Number,
} from '@antv/g';
import { clone, isArray, isNumber } from '@antv/util';
import { DEFAULT_LABEL_BG_PADDING } from '../constant';
import { Padding, Point, StandardPadding } from '../types/common';
import { EdgeDisplayModel, EdgeShapeMap } from '../types/edge';
import {
  GShapeStyle,
  SHAPE_TYPE,
  ItemShapeStyles,
  ShapeStyle,
  SHAPE_TYPE_3D,
} from '../types/item';
import { NodeDisplayModel, NodeShapeMap } from '../types/node';
import { ComboDisplayModel, IGraph } from '../types';
import Node from '../item/node';
import Edge from '../item/edge';
import Combo from '../item/combo';
import { getShapeAnimateBeginStyles } from './animate';
import { isArrayOverlap } from './array';
import { isBetween } from './math';

export const ShapeTagMap = {
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

const LINE_TYPES = ['line', 'polyline', 'path'];

export const LOCAL_BOUNDS_DIRTY_FLAG_KEY = 'data-item-local-bounds-dirty';

export const createShape = (
  type: SHAPE_TYPE,
  style: GShapeStyle,
  id: string,
) => {
  const ShapeClass = ShapeTagMap[type];
  const shape = new ShapeClass({ id, style });
  if (style.draggable === undefined) shape.style.draggable = true;
  if (style.droppable === undefined) shape.style.droppable = true;
  if (LINE_TYPES.includes(type)) {
    shape.style.increasedLineWidthForHitTesting = Math.max(
      shape.style.lineWidth as number,
      6,
    );
  }
  return shape;
};

/**
 * Collect the fields to be animated at the timing on shape with shapeId.
 * @param animates animate configs
 * @param timing
 * @param shapeId
 * @returns
 */
const findAnimateFields = (animates, timing, shapeId) => {
  if (!animates?.[timing]?.length) return [];
  let animateFields = [];
  animates[timing].forEach(({ fields, shapeId: animateShapeId }) => {
    if (animateShapeId === shapeId) {
      animateFields = animateFields.concat(fields);
    } else if (
      (!animateShapeId || animateShapeId === 'group') &&
      fields.includes('opacity')
    ) {
      // group opacity, all shapes animates with opacity
      animateFields.push('opacity');
    }
  });
  if (animateFields.includes(undefined)) {
    // there is an animate on all styles
    return [];
  }
  return animateFields;
};

/**
 * Create (if does not exit in shapeMap) or update the shape according to the configurations.
 * @param type shape's type
 * @param id unique string to indicates the shape
 * @param style style to be updated
 * @param shapeMap the shape map of a node / edge / combo
 * @param model data model of the node / edge / combo
 * @returns
 */
export const upsertShape = (
  type: SHAPE_TYPE,
  id: string,
  style: GShapeStyle,
  shapeMap: { [shapeId: string]: DisplayObject },
  model?: NodeDisplayModel | EdgeDisplayModel | ComboDisplayModel,
): DisplayObject => {
  let shape = shapeMap[id];
  // TODO: it is not decoupling with the shape name 'keyShape'
  const firstRendering = !shapeMap.keyShape;
  const { animates, disableAnimate } = model?.data || {};
  if (!shape) {
    // create
    shape = createShape(type, style, id);
    if (style.interactive === false) shape.interactive = false;
    // find the animate styles, set them to be INIT_SHAPE_STYLES
    if (!disableAnimate && animates) {
      const animateFields = findAnimateFields(
        animates,
        firstRendering ? 'buildIn' : 'update',
        id,
      );
      const initShapeStyles = getShapeAnimateBeginStyles(shape);
      animateFields.forEach((key) => {
        shape.style[key] = initShapeStyles[key];
      });
    }
    shape.setAttribute(LOCAL_BOUNDS_DIRTY_FLAG_KEY, true);
  } else if (shape.nodeName !== type) {
    // remove and create for the shape changed type
    shape.remove();
    shape = createShape(type, style, id);
    shape.setAttribute(LOCAL_BOUNDS_DIRTY_FLAG_KEY, true);
  } else {
    const updateStyles = {};
    const oldStyles = shape.attributes;
    // update
    // update the styles excludes the ones in the animate fields
    const animateFields = findAnimateFields(animates, 'update', id);
    if (disableAnimate || !animates?.update || !animateFields.length) {
      // update all the style directly when there are no animates for update timing
      Object.keys(style).forEach((key) => {
        if (oldStyles[key] !== style[key]) {
          updateStyles[key] = style[key];
          shape.style[key] = style[key];
        }
      });
    } else {
      Object.keys(style).forEach((key) => {
        if (oldStyles[key] !== style[key]) {
          updateStyles[key] = style[key];
          if (!animateFields.includes(key)) {
            shape.style[key] = style[key];
          }
        }
      });
    }
    if (isStyleAffectBBox(type, updateStyles)) {
      shape.setAttribute(LOCAL_BOUNDS_DIRTY_FLAG_KEY, true);
    }
    if (style.interactive === false) shape.interactive = false;
    else shape.interactive = true;
  }
  shapeMap[id] = shape;
  return shape;
};

export const getGroupSucceedMap = (
  group: IElement,
  map?: { [id: string]: IElement },
) => {
  const useMap = map || {};
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
  removeDiff = true,
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
      if (!newShape.destroyed && newShape.style.display !== 'none') {
        group.appendChild(newShape);
      }
    } else if (!prevShape && newShape) {
      // add newShapeMap - prevShapeMap
      finalShapeMap[id] = newShape;
      if (!newShape.destroyed && newShape.style.display !== 'none') {
        group.appendChild(newShape);
      }
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
export const formatPadding = (
  value: Padding,
  defaultArr: StandardPadding = DEFAULT_LABEL_BG_PADDING,
): [number, number, number, number] => {
  if (isArray(value)) {
    switch (value.length) {
      case 0:
        return defaultArr;
      case 1:
        return [value[0], value[0], value[0], value[0]];
      case 2:
        return [value[0], value[1], value[0], value[1]];
      case 3:
        return [value[0], value[1], value[2], value[1]];
      default:
        return [value[0], value[1], value[2], value[3] || value[4]];
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
};

/**
 * Merge two shape style map including undefined value in incoming map.
 * @param styleMap1 shapes' styles map as current map
 * @param styleMap2 shapes' styles map as incoming map
 * @returns
 */
const merge2Styles = (
  styleMap1: ItemShapeStyles,
  styleMap2: ItemShapeStyles,
) => {
  if (!styleMap1) return { ...styleMap2 };
  else if (!styleMap2) return { ...styleMap1 };
  const mergedStyle = clone(styleMap1);
  Object.keys(styleMap2).forEach((shapeId) => {
    const style = styleMap2[shapeId];
    mergedStyle[shapeId] = mergedStyle[shapeId] || {};
    if (!style) return;
    Object.keys(style).forEach((styleName) => {
      const value = style[styleName];
      mergedStyle[shapeId][styleName] = value;
    });
  });
  return mergedStyle;
};

/**
 * Whether two polygons are intersected.
 * @param points1 vertex array of polygon1
 * @param points2 vertex array of polygon2
 */
export const isPolygonsIntersect = (
  points1: number[][],
  points2: number[][],
): boolean => {
  const getBBox = (points): Partial<AABB> => {
    const xArr = points.map((p) => p[0]);
    const yArr = points.map((p) => p[1]);
    return {
      min: [Math.min.apply(null, xArr), Math.min.apply(null, yArr), 0],
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
  points2.forEach((point) => {
    if (isPointInPolygon(points1, point[0], point[1])) {
      isIn = true;
      return false;
    }
  });
  if (isIn) {
    return true;
  }
  points1.forEach((point) => {
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
  lines2.forEach((line) => {
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
};

const lineIntersectPolygon = (lines, line) => {
  let isIntersect = false;
  lines.forEach((l) => {
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
export const getLineIntersect = (
  p0: Point,
  p1: Point,
  p2: Point,
  p3: Point,
): Point | null => {
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

const FEILDS_AFFECT_BBOX = {
  circle: ['r', 'lineWidth'],
  rect: ['width', 'height', 'lineWidth'],
  image: ['width', 'height', 'lineWidth'],
  ellipse: ['rx', 'ry', 'lineWidth'],
  text: ['fontSize', 'fontWeight', 'text', 'wordWrapWidth'],
  polygon: ['points', 'lineWidth'],
  line: ['x1', 'x2', 'y1', 'y2', 'lineWidth'],
  polyline: ['points', 'lineWidth'],
  path: ['points', 'lineWidth'],
  sphere: ['radius'],
  cube: ['width', 'height', 'depth'],
  plane: ['width', 'depth'],
};
/**
 * Will the fields in style affect the bbox.
 * @param type shape type
 * @param style style object
 * @returns
 */
export const isStyleAffectBBox = (
  type: SHAPE_TYPE | SHAPE_TYPE_3D,
  style: ShapeStyle,
) => {
  return isArrayOverlap(Object.keys(style), FEILDS_AFFECT_BBOX[type]);
};

/**
 * Estimate the width of the shape according to the given style.
 * @param shape target shape
 * @param style computed merged style
 * @param bounds shape's local bounds
 * @returns
 */
export const getShapeLocalBoundsByStyle = (
  shape: DisplayObject,
  style: ShapeStyle,
  bbox?: AABB,
): {
  min: number[];
  max: number[];
  center: number[];
} => {
  const {
    r,
    rx,
    ry,
    width,
    height,
    depth = 0,
    x1,
    x2,
    y1,
    y2,
    z1 = 0,
    z2 = 0,
  } = style;
  const radius = Number(r);
  const radiusX = Number(rx);
  const radiusY = Number(ry);
  switch (shape.nodeName) {
    case 'circle':
      return {
        min: [-radius, -radius, 0],
        max: [radius, radius, 0],
        center: [0, 0, 0],
      };
    case 'sphere':
      return {
        min: [-radius, -radius, -radius],
        max: [radius, radius, radius],
        center: [0, 0, 0],
      };
    case 'image':
    case 'rect':
    case 'cube':
    case 'plane':
      return {
        min: [-width / 2, -height / 2, -depth / 2],
        max: [width / 2, height / 2, depth / 2],
        center: [0, 0, 0],
      };
    case 'ellipse':
      return {
        min: [-radiusX, -radiusY, 0],
        max: [radiusX, radiusY, 0],
        center: [0, 0, 0],
      };
    case 'line':
      return {
        min: [x1, y1, z1],
        max: [x2, y2, z2],
        center: [(x1 + x2) / 2, (y1 + y2) / 2, (z1 + z2) / 2],
      };
    case 'text':
    case 'polyline':
    case 'path':
    case 'polygon':
      return bbox || shape.getLocalBounds();
  }
};

/**
 * Combine multiple bounds into one.
 * @param bounds bounds' array
 * @returns combined bounds
 */
export const combineBounds = (
  bounds: {
    min: number[];
    max: number[];
    center: number[];
  }[],
): {
  min: number[];
  max: number[];
  center: number[];
} => {
  const res = {
    center: [0, 0, 0],
    min: [Infinity, Infinity, Infinity],
    max: [-Infinity, -Infinity, -Infinity],
    size: [0, 0, 0],
  };
  bounds.forEach((bound) => {
    const { min, max } = bound;
    min.forEach((val, i) => {
      if (val < res.min[i]) res.min[i] = val;
    });
    max.forEach((val, i) => {
      if (val > res.max[i]) res.max[i] = val;
    });
  });
  res.center = res.center.map((val, i) => (res.max[i] + res.min[i]) / 2);
  return res;
};

/**
 * Calculate the combined bounds according to the sub data models.
 * @param graph graph instance
 * @param models sub data models
 * @returns combined bounds
 */
export const getCombinedBoundsByData = (
  graph: IGraph,
  models: (Node | Combo)[],
):
  | {
      center: Tuple3Number;
      min: Tuple3Number;
      max: Tuple3Number;
      size: Tuple3Number;
    }
  | false => {
  if (!models.length) return false;
  const resBounds = {
    center: [0, 0, 0],
    min: [Infinity, Infinity, Infinity],
    max: [-Infinity, -Infinity, -Infinity],
    size: [0, 0, 0],
  };
  let validCounts = 0;
  models.forEach((item) => {
    const bounds = graph.getRenderBBox(item.model.id);
    if (bounds) {
      if (item.model.data._isCombo) {
        // child is combo, move to the correct center
        const { center: childComboCenter } =
          (item as Combo).getCombinedBounds() || {};
        if (childComboCenter) {
          ['min', 'max', 'center'].forEach((field) => {
            bounds[field] = bounds[field].map(
              (val, i) => val - bounds.center[i] + childComboCenter[i],
            );
          });
        }
      }

      validCounts++;
      const { min, max } = bounds;
      min.forEach((val, i) => {
        if (val < resBounds.min[i]) resBounds.min[i] = val;
      });
      max.forEach((val, i) => {
        if (val > resBounds.max[i]) resBounds.max[i] = val;
      });
    }
  });
  if (!validCounts) return false;
  resBounds.size = resBounds.size.map(
    (val, i) => resBounds.max[i] - resBounds.min[i],
  );
  resBounds.center = resBounds.center.map(
    (val, i) => (resBounds.max[i] + resBounds.min[i]) / 2,
  );
  return resBounds as {
    center: Tuple3Number;
    min: Tuple3Number;
    max: Tuple3Number;
    size: Tuple3Number;
  };
};

export const getCombinedBoundsByItem = (items: (Node | Combo | Edge)[]) => {
  if (!items.length) return false;
  const resBounds = {
    center: [0, 0, 0],
    min: [Infinity, Infinity, Infinity],
    max: [-Infinity, -Infinity, -Infinity],
    size: [0, 0, 0],
  };
  let validCounts = 0;
  items.forEach((item) => {
    const bounds = item.getBBox();
    if (bounds) {
      validCounts++;
      const { min, max } = bounds;
      min.forEach((val, i) => {
        if (val < resBounds.min[i]) resBounds.min[i] = val;
      });
      max.forEach((val, i) => {
        if (val > resBounds.max[i]) resBounds.max[i] = val;
      });
    }
  });
  if (!validCounts) return false;
  resBounds.size = resBounds.size.map(
    (val, i) => resBounds.max[i] - resBounds.min[i],
  );
  resBounds.center = resBounds.center.map(
    (val, i) => (resBounds.max[i] + resBounds.min[i]) / 2,
  );
  return resBounds as {
    center: Tuple3Number;
    min: Tuple3Number;
    max: Tuple3Number;
    size: Tuple3Number;
  };
};
