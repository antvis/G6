import { AABB } from '@antv/g';
import { clone } from '@antv/util';
import type { Node, Padding, Point, TriangleDirection } from '../types';
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
 * <zh/> 获取包围盒的尺寸
 * @param bbox - <zh/> 包围盒 | <en/> Bounding box
 * @returns <zh/> 包围盒的尺寸 | <en/> Size of box
 */
export function getBBoxSize(bbox: AABB): [number, number] {
  return [getBBoxWidth(bbox), getBBoxHeight(bbox)];
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
  const bbox = isPoint(node) ? getPointBBox(node) : node.getShape('key').getBounds();
  return padding ? getExpandedBBox(bbox, padding) : bbox;
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
 * <zh/> 计算整体包围盒
 *
 * <en/> Calculate the overall bounding box
 * @param bboxes - <zh/> 包围盒列表 | <en/> List of bounding boxes
 * @returns <zh/> 整体包围盒 | <en/> Overall bounding box
 */
export function getCombinedBBox(bboxes: AABB[]): AABB {
  if (bboxes.length === 0) return new AABB();
  if (bboxes.length === 1) return bboxes[0];

  const bbox = new AABB();
  bbox.setMinMax(bboxes[0].min, bboxes[0].max);

  for (let i = 1; i < bboxes.length; i++) {
    const b2 = bboxes[i];
    bbox.setMinMax(
      [Math.min(bbox.min[0], b2.min[0]), Math.min(bbox.min[1], b2.min[1]), Math.min(bbox.min[2], b2.min[2])],
      [Math.max(bbox.max[0], b2.max[0]), Math.max(bbox.max[1], b2.max[1]), Math.max(bbox.max[2], b2.max[2])],
    );
  }

  return bbox;
}

/**
 * <zh/> 判断 bbox1 是否完全包含在 bbox2 内
 *
 * <en/> Determine whether bbox1 is completely contained in bbox2
 * @param bbox1 - <zh/> 目标包围盒 | <en/> Target bounding box
 * @param bbox2 - <zh/> 参考包围盒 | <en/> Reference bounding box
 * @returns <zh/> 如果 bbox1 完全包含在 bbox2 内返回 true，否则返回 false | <en/> Returns true if bbox1 is completely contained in bbox2, false otherwise
 */
export function isBBoxInside(bbox1: AABB, bbox2: AABB): boolean {
  const [minX1, minY1] = bbox1.min;
  const [maxX1, maxY1] = bbox1.max;
  const [minX2, minY2] = bbox2.min;
  const [maxX2, maxY2] = bbox2.max;

  return minX1 >= minX2 && maxX1 <= maxX2 && minY1 >= minY2 && maxY1 <= maxY2;
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
 * <zh/> 判断点是否在给定的包围盒的边界或边界的延长线上
 *
 * <en/> Whether the point is on the boundary or extension line of the given box
 * @param point - <zh/> 点 | <en/> Point
 * @param bbox - <zh/> 包围盒 | <en/> Bounding box
 * @param extended - <zh/> 是否判断边界的延长线 | <en/> Whether to judge the extension line of the boundary
 * @returns <zh/> 如果点在包围盒的边界或边界的延长线上返回 true，否则返回 false | <en/> Returns true if the point is on the boundary or extension line of the bounding box, false otherwise
 */
export function isPointOnBBoxBoundary(point: Point, bbox: AABB, extended = false): boolean {
  const {
    min: [minX, minY],
    max: [maxX, maxY],
  } = bbox;

  const onTopOrBottomLine = (point[1] === minY || point[1] === maxY) && (extended || isBetween(point[0], minX, maxX));
  const onLeftOrRightLine = (point[0] === minX || point[0] === maxX) && (extended || isBetween(point[1], minY, maxY));

  return onTopOrBottomLine || onLeftOrRightLine;
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
 * <zh/> 判断点是否位于包围盒中心
 *
 * <en/> When the point is at the center of the bounding box
 * @param point - <zh/> 点 | <en/> Point
 * @param bbox - <zh/> 包围盒 | <en/> Bounding box
 * @returns <zh/> 如果点在包围盒中心返回 true，否则返回 false | <en/> Returns true if the point is at the center of the bounding box, false otherwise
 */
export function isPointBBoxCenter(point: Point, bbox: AABB) {
  const { center } = bbox;
  return point[0] === center[0] && point[1] === center[1];
}

/**
 * <zh/> 获取包围盒上离点 `p` 最近的边
 *
 * <en/> Get a side of the boundary which is nearest to the point `p`
 * @param bbox - <zh/> 包围盒 | <en/> Bounding box
 * @param p - <zh/> 点 | <en/> Point
 * @returns <zh/> 离点 `p` 最近的边 | <en/> The side nearest to the point `p`
 */
export function getNearestBoundarySide(p: Point, bbox: AABB): 'left' | 'right' | 'top' | 'bottom' {
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
 * <zh/> 获取包围盒上离点 `p` 最近的边界点
 *
 * <en/> Get a point on the boundary nearest to the point `p`
 * @param bbox - <zh/> 包围盒 | <en/> Bounding box
 * @param p - <zh/> 点 | <en/> Point
 * @returns <zh/> 离点 `p` 最近的点 | <en/> The point nearest to the point `p`
 */
export function getNearestBoundaryPoint(p: Point, bbox: AABB): Point {
  const ref = clone(p);
  if (isPointInBBox(p, bbox)) {
    const side = getNearestBoundarySide(p, bbox);
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
  const [width, height] = getBBoxSize(bbox);

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
  let [w, h] = getBBoxSize(bbox);

  [w, h] = direction === 'up' || direction === 'down' ? [w, h] : [h, w];

  // 三角形的内切圆半径
  return (h ** 2 - (Math.sqrt((w / 2) ** 2 + h ** 2) - w / 2) ** 2) / (2 * h);
}

/**
 * <zh/> 获取包围盒的四条边，顺序依次为上、右、下、左
 *
 * <en/> Get the four segments of the bounding box, in order from top, right, bottom, left
 * @param bbox - <zh/> 包围盒 | <en/> Bounding box
 * @returns <zh/> 包围盒的四条边 | <en/> The four segments of the bounding box
 */
export function getBBoxSegments(bbox: AABB): [Point, Point][] {
  const {
    min: [minX, minY],
    max: [maxX, maxY],
  } = bbox;
  const topLeftCorner: Point = [minX, maxY];
  const topRightCorner: Point = [maxX, maxY];
  const bottomRightCorner: Point = [maxX, minY];
  const bottomLeftCorner: Point = [minX, minY];

  const top = [topLeftCorner, topRightCorner];
  const right = [topRightCorner, bottomRightCorner];
  const bottom = [bottomRightCorner, bottomLeftCorner];
  const left = [bottomLeftCorner, topLeftCorner];
  return [top, right, bottom, left] as [Point, Point][];
}
