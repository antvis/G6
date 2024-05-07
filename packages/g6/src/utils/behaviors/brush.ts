import { isPointInPolygon } from '../point';

import type { Graph } from '../../runtime/graph';
import type { ID, Points } from '../../types';

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
