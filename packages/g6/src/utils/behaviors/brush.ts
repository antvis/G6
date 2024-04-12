import { isPointInPolygon } from '../point';

import type { ID } from '@antv/graphlib';
import type { Graph } from '../../runtime/graph';
import type { Point, Points } from '../../types';

/**
 * <zh/> 元素中心是否在 rect 中
 *
 * <en/> Element center in rect.
 * @param graph Graph
 * @param id ID
 * @param points Points
 * @returns boolean
 */
export function isBBoxCenterInRect(graph: Graph, id: ID, points: Points) {
  const bbox = graph.getElementRenderBounds(id);
  if (!bbox) return false;
  return isPointInPolygon(bbox.center, points);
}

/**
 *
 * @param start
 * @param end
 */
export function getRectPoints(start: Point, end: Point): Points {
  return [start, [start[0], end[1]], end, [end[0], start[1]]];
}
