import { ID } from '@antv/graphlib';
import { IGraph } from "../../types";
import { Point } from "../../types/common";
import { ITEM_TYPE } from "../../types/item";
import { getEdgesBetween } from '../../util/item';
import { isPolygonsIntersect } from '../../util/shape';

/**
 * Rect selector to find nodes/edge/combos which are in the area of the rect with diagonal points p1 and p2.
 * A node is selected if the center of its bbox is inside the rect;
 * An edge is selected if both end nodes are inside the rect;
 * A combo is selected if the center of its bbox is inside the rect.
 */
export default (graph: IGraph, points: Point[], itemTypes: ITEM_TYPE[]) => {
  const lassoContour = points.map((point) => [
    point.x,
    point.y,
  ]);
  const selectedNodeIds = [];
  let selectedEdgeIds = [];
  const selectedComboIds = [];
  if (itemTypes.includes('node')) {
    graph.getAllNodesData().forEach((node) => {
      const { id } = node;
      if (!graph.getItemVisible(id)) return; // 隐藏节点不能被选中
      if (isItemIntersecPolygon(graph, id, lassoContour)) {
        selectedNodeIds.push(id);
      }
    });
  }

  if (itemTypes.includes('combo')) {
    graph.getAllCombosData().forEach((combo) => {
      const { id } = combo;
      if (
        graph.getItemVisible(id) && // hidden combo is not selectable
        isItemIntersecPolygon(graph, id, lassoContour)
      ) {
        selectedComboIds.push(id);
      }
    });
  }

  if (itemTypes.includes('edge')) {
    // 选中边，边的source和target都在选中的节点中时才选中
    selectedEdgeIds = getEdgesBetween(graph, selectedNodeIds.concat(selectedComboIds));
  }

  return {
    nodes: selectedNodeIds,
    edges: selectedEdgeIds,
    combos: selectedComboIds
  };
}
const isItemIntersecPolygon = (graph: IGraph, id: ID, polyPoints: number[][]) => {
  let shapePoints;
  // TODO
  // const shape = item.getKeyShape();
  // if (item.get('type') === 'path') {
  //   shapePoints = pathToPoints(shape.attr('path'));
  // } else {
    const shapeBBox = graph.getRenderBBox(id);
    if (!shapeBBox) return false;
    shapePoints = [
      [shapeBBox.min[0], shapeBBox.min[1]],
      [shapeBBox.max[0], shapeBBox.min[1]],
      [shapeBBox.max[0], shapeBBox.max[1]],
      [shapeBBox.min[0], shapeBBox.max[1]],
    ];
  // }
  return isPolygonsIntersect(polyPoints, shapePoints);
};