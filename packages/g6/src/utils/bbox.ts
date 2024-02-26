import { AABB } from '@antv/g';
import { clone } from '@antv/util';
import { TriangleDirection } from '../elements/nodes/triangle';
import type { Element, Node, Padding, Point } from '../types';
import { isPoint } from './is';
import { isBetween } from './math';
import { parsePadding } from './padding';
/**
 * <zh/> 获取包围盒的宽度
 *
 * <en/> Retrieves the width of a bounding box
 * @param bbox - <zh/> 包围盒 | <en/> Bounding box
 * @returns <zh/> 包围盒的宽度 | <en/> Width of box
 */
export function getBBoxWidth(bbox: AABB): number {
  return bbox.max[0] - bbox.min[0];
}

/**
 * <zh/> 获取包围盒的高度
 *
 * <en/> Retrieve the height of a bounding box
 * @param bbox - <zh/> 包围盒 | <en/> Bounding box
 * @returns <zh/> 包围盒的高度 | <en/> Height of box
 */
export function getBBoxHeight(bbox: AABB): number {
  return bbox.max[1] - bbox.min[1];
}

/**
 * <zh/> 获取节点的包围盒，兼容节点为点的情况
 *
 * <en/> Get the bounding box of the node, compatible with the case where the node is a point
 * @param node - <zh/> 节点或者点 | <en/> node or point
 * @param padding - <zh/> 内边距 | <en/> padding
 * @returns <zh/> 包围盒 | <en/> bounding box
 */
export function getNodeBBox(node: Point | Node, padding?: Padding): AABB {
  const bbox = isPoint(node) ? getPointBBox(node) : node.getKey().getBounds();
  return padding ? getExpandedBBox(bbox, padding) : bbox;
}

/**
 * <zh/> 获取多个元素的联合包围盒
 *
 * <en/> Get the union bounding box of multiple elements
 * @param elements - <zh/> 元素数组 | <en/> Array of elements
 * @returns <zh/> 包围盒 | <en/> Bounding box
 */
export function getElementsBBox(elements: Element[]): AABB {
  let resBBox: AABB = new AABB(); // Initialize resBBox with an empty AABB object

  if (!elements.length) return resBBox;

  elements.forEach((element, i) => {
    const bbox = element.getBounds();
    if (i === 0) resBBox = bbox;
    else resBBox = union(resBBox, bbox);
  });

  return resBBox;
}

/**
 * <zh/> 获取单点的包围盒
 *
 * <en/> Get the bounding box of a single point
 * @param point - <zh/> 点 | <en/> Point
 * @returns <zh/> 包围盒 | <en/> Bounding box
 */
export function getPointBBox(point: Point): AABB {
  const [x, y, z = 0] = point;
  const bbox = new AABB();
  bbox.setMinMax([x, y, z], [x, y, z]);
  return bbox;
}

/**
 * <zh/> 获取扩大后的包围盒
 *
 * <en/> Get the expanded bounding box
 * @param bbox - <zh/> 包围盒 | <en/> Bounding box
 * @param padding - <zh/> 内边距 | <en/> Padding
 * @returns <zh/> 扩大后的包围盒 | <en/> The expanded bounding box
 */
export function getExpandedBBox(bbox: AABB, padding: Padding): AABB {
  const [top, right, bottom, left] = parsePadding(padding);
  const [minX, minY, minZ] = bbox.min;
  const [maxX, maxY, maxZ] = bbox.max;
  const eBbox = new AABB();
  eBbox.setMinMax([minX - left, minY - top, minZ], [maxX + right, maxY + bottom, maxZ]);
  return eBbox;
}

/**
 * <zh/> 合并两个包围盒，使其成为一个包围盒
 *
 * <en/> Merge two bboxes into a single bbox that encompasses both
 * @param b1 - <zh/> 包围盒1 | <en/> Bounding box 1
 * @param b2 - <zh/> 包围盒2 | <en/> Bounding box 2
 * @returns <zh/> 合并后的包围盒 | <en/> The merged bounding box
 */
export function union(b1: AABB, b2: AABB): AABB {
  const bbox = new AABB();
  bbox.setMinMax(
    [Math.min(b1.min[0], b2.min[0]), Math.min(b1.min[1], b2.min[1]), Math.min(b1.min[2], b2.min[2])],
    [Math.max(b1.max[0], b2.max[0]), Math.max(b1.max[1], b2.max[1]), Math.max(b1.max[2], b2.max[2])],
  );
  return bbox;
}

/**
 * <zh/> 判断点是否在给定的包围盒内
 *
 * <en/> Whether the point is contained in the given box
 * @param point - <zh/> 点 | <en/> Point
 * @param bbox - <zh/> 包围盒 | <en/> Bounding box
 * @returns  <zh/> 如果点在包围盒内返回 true，否则返回 false | <en/> Returns true if the point is inside the bounding box, false otherwise
 */
export function isPointInBBox(point: Point, bbox: AABB) {
  return isBetween(point[0], bbox.min[0], bbox.max[0]) && isBetween(point[1], bbox.min[1], bbox.max[1]);
}

/**
 * <zh/> 判断点是否在给定的包围盒外
 *
 * <en/> Whether the point is outside the given box
 * @param point - <zh/> 点 | <en/> Point
 * @param bbox - <zh/> 包围盒 | <en/> Bounding box
 * @returns <zh/> 如果点在包围盒外返回 true，否则返回 false | <en/> Returns true if the point is outside the bounding box, false otherwise
 */
export function isPointOutsideBBox(point: Point, bbox: AABB) {
  return !isPointInBBox(point, bbox);
}

/**
 * <zh/> 获取包围盒上离点 `p` 最近的边
 *
 * <en/> Get a side of the boundary which is nearest to the point `p`
 * @param bbox - <zh/> 包围盒 | <en/> Bounding box
 * @param p - <zh/> 点 | <en/> Point
 * @returns <zh/> 离点 `p` 最近的边 | <en/> The side nearest to the point `p`
 */
export function getNearestSideToPoint(bbox: AABB, p: Point): 'left' | 'right' | 'top' | 'bottom' {
  const [x, y] = p;
  const [minX, minY] = bbox.min;
  const [maxX, maxY] = bbox.max;
  const left = x - minX;
  const right = maxX - x;
  const top = y - minY;
  const bottom = maxY - y;
  const min = Math.min(left, right, top, bottom);
  return min === left ? 'left' : min === right ? 'right' : min === top ? 'top' : min === bottom ? 'bottom' : 'left';
}

/**
 * <zh/> 获取包围盒上离点 `p` 最近的点
 *
 * <en/> Get a point on the boundary nearest to the point `p`
 * @param bbox - <zh/> 包围盒 | <en/> Bounding box
 * @param p - <zh/> 点 | <en/> Point
 * @returns <zh/> 离点 `p` 最近的点 | <en/> The point nearest to the point `p`
 */
export function getNearestPointToPoint(bbox: AABB, p: Point): Point {
  const ref = clone(p);
  if (isPointInBBox(p, bbox)) {
    const side = getNearestSideToPoint(bbox, p);
    switch (side) {
      case 'left':
        ref[0] = bbox.min[0];
        break;
      case 'right':
        ref[0] = bbox.max[0];
        break;
      case 'top':
        ref[1] = bbox.min[1];
        break;
      case 'bottom':
        ref[1] = bbox.max[1];
        break;
    }
  } else {
    const [x, y] = p;
    const [minX, minY] = bbox.min;
    const [maxX, maxY] = bbox.max;
    ref[0] = isBetween(x, minX, maxX) ? x : x < minX ? minX : maxX;
    ref[1] = isBetween(y, minY, maxY) ? y : y < minY ? minY : maxY;
  }
  return ref;
}

/**
 * The triangle center point of the bounding box
 * @param bbox - bounding box
 * @param direction - direction
 * @returns Point
 */
export function getTriangleCenter(bbox: AABB, direction: TriangleDirection): Point {
  // todo 算法只对矩形有效
  const { center } = bbox;
  const { min, max } = bbox;
  const width = max[0] - min[0];
  const height = max[1] - min[1];

  const x =
    direction === 'up' || direction === 'down'
      ? center[0]
      : direction === 'right'
        ? center[0] - width / 6
        : center[0] + width / 6;
  const y =
    direction === 'left' || direction === 'right'
      ? center[1]
      : direction === 'down'
        ? center[1] - height / 6
        : center[1] + height / 6;

  return [x, y];
}

/**
 * Get incircle radius
 * @param bbox - bounding box
 * @param direction - direction
 * @returns number
 */
export function getIncircleRadius(bbox: AABB, direction: TriangleDirection): number {
  const { min, max } = bbox;
  let w = max[0] - min[0];
  let h = max[1] - min[1];

  [w, h] = direction === 'up' || direction === 'down' ? [w, h] : [h, w];

  // 三角形的内切圆半径
  return (h ** 2 - (Math.sqrt((w / 2) ** 2 + h ** 2) - w / 2) ** 2) / (2 * h);
}
