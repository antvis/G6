import { getPositionByRectPoints } from '../position';

import type { ID } from '@antv/graphlib';
import type { Graph } from '../../runtime/graph';
import type { Points } from '../../types';

/**
 * <zh/> 元素中心是否在 rect 中
 *
 * <en/> Element center in rect.
 * @param graph Graph
 * @param id ID
 * @param points Points
 * @returns boolean
 */
export const isBBoxCenterInRect = (graph: Graph, id: ID, points: Points) => {
  const { left, right, top, bottom } = getPositionByRectPoints(points);

  const bbox = graph.getElementRenderBounds(id);
  if (!bbox) return false;
  return bbox.center[0] >= left && bbox.center[0] <= right && bbox.center[1] >= top && bbox.center[1] <= bottom;
};
