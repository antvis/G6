import { ID } from '@antv/graphlib';
import { Graph } from '../../types';
import { Point } from '../../types/common';
import { ITEM_TYPE } from '../../types/item';
import { getEdgesBetween } from '../../utils/item';
import { isPolygonsIntersect } from '../../utils/shape';

/**
 * Rect selector to find nodes/edge/combos which are in the area of the rect with diagonal points p1 and p2.
 * A node is selected if the center of its bbox is inside the rect;
 * An edge is selected if both end nodes are inside the rect;
 * A combo is selected if the center of its bbox is inside the rect.
 * @param graph
 * @param points
 * @param itemTypes
 */
export default (graph: Graph, points: Point[], itemTypes: ITEM_TYPE[]) => {
  const lassoContour = points.map((point) => [point.x, point.y]);
  const selectedNodeIds = [];
  let selectedEdgeIds = [];
  const selectedComboIds = [];
  if (itemTypes.includes('node')) {
    graph.getNodeData().forEach((node) => {
      const { id } = node;
      if (!graph.getItemVisible(id)) return; // hidden node is not selectable
      if (isItemIntersectPolygon(graph, id, lassoContour)) {
        selectedNodeIds.push(id);
      }
    });
  }

  if (itemTypes.includes('combo')) {
    graph.getComboData().forEach((combo) => {
      const { id } = combo;
      if (
        graph.getItemVisible(id) && // hidden combo is not selectable
        isItemIntersectPolygon(graph, id, lassoContour)
      ) {
        selectedComboIds.push(id);
      }
    });
  }

  if (itemTypes.includes('edge')) {
    // an edge is selected only if both the source and target nodes are selected
    selectedEdgeIds = getEdgesBetween(graph, selectedNodeIds.concat(selectedComboIds));
  }

  return {
    nodes: selectedNodeIds,
    edges: selectedEdgeIds,
    combos: selectedComboIds,
  };
};
const isItemIntersectPolygon = (graph: Graph, id: ID, polyPoints: number[][]) => {
  // TODO
  // const shape = item.getKeyShape();
  // if (item.get('type') === 'path') {
  //   shapePoints = pathToPoints(shape.attr('path'));
  // } else {
  const shapeBBox = graph.getRenderBBox(id);
  if (!shapeBBox) return false;
  const shapePoints = [
    [shapeBBox.min[0], shapeBBox.min[1]],
    [shapeBBox.max[0], shapeBBox.min[1]],
    [shapeBBox.max[0], shapeBBox.max[1]],
    [shapeBBox.min[0], shapeBBox.max[1]],
  ];
  // }
  return isPolygonsIntersect(polyPoints, shapePoints);
};
