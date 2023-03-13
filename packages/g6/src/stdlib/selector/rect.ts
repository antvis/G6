import { ID } from '@antv/graphlib';
import { IGraph } from "../../types";
import { Point } from "../../types/common";
import { ITEM_TYPE } from "../../types/item";
import { getEdgesBetween } from '../../util/item';

/**
 * Rect selector to find nodes/edge/combos which are in the area of the rect with diagonal points p1 and p2.
 * A node is selected if the center of its bbox is inside the rect;
 * An edge is selected if both end nodes are inside the rect;
 * A combo is selected if the center of its bbox is inside the rect.
 */
export default (graph: IGraph, p1: Point, p2: Point, itemTypes: ITEM_TYPE[]) => {
  const left = Math.min(p1.x, p2.x);
  const right = Math.max(p1.x, p2.x);
  const top = Math.min(p1.y, p2.y);
  const bottom = Math.max(p1.y, p2.y);
  const selectedNodeIds: ID[] = [];
  const selectedComboIds: ID[] = [];
  let selectedEdgeIds: ID[] = [];
  
  if (itemTypes.includes('node')) {
    graph.getAllNodesData().forEach((node) => {
      const { id } = node;
      if (
        graph.getItemVisible(id) && // hidden node is not selectable
        isBBoxCenterInRect(graph, id, left, right, top, bottom)
      ) {
        selectedNodeIds.push(id);
      }
    });
  }
  
  if (itemTypes.includes('combo')) {
    graph.getAllCombosData().forEach((combo) => {
      const { id } = combo;
      if (
        graph.getItemVisible(id) && // hidden combo is not selectable
        isBBoxCenterInRect(graph, id, left, right, top, bottom)
      ) {
        selectedComboIds.push(id);
      }
    });
  }

  if (itemTypes.includes('edge')) {
    // The edge is selected while both the source and target node are selected.
    selectedEdgeIds = getEdgesBetween(graph, selectedNodeIds.concat(selectedComboIds));
  }

  return {
    nodes: selectedNodeIds,
    edges: selectedEdgeIds,
    combos: selectedComboIds
  };
}

const isBBoxCenterInRect = (graph: IGraph, id: ID, left: number, right: number, top: number, bottom: number) => {
  const bbox = graph.getRenderBBox(id);
  if (!bbox) return false;
  return (
    bbox.center[0] >= left &&
    bbox.center[0] <= right &&
    bbox.center[1] >= top &&
    bbox.center[1] <= bottom
  );
}