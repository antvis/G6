import { ID } from '@antv/graphlib';
import { Group } from '@antv/g';
import { IGraph } from '../types';
import Combo from '../item/combo';
import Edge from '../item/edge';
import Node from '../item/node';

/**
 * Find the edges whose source and target are both in the ids.
 * @param graph graph instance
 * @param ids the end nodes/combos id list
 * @returns id list of the edges meet the condition
 */
export const getEdgesBetween = (graph: IGraph, ids: ID[]): ID[] => {
  const edgeIdSet = new Set<ID>();
  ids.forEach((endId) => {
    const edgesData = graph.getRelatedEdgesData(endId);
    edgesData.forEach((edge) => {
      const { source, target, id } = edge;
      if (!graph.getItemVisible(id)) return; // hidden edge is not selectable
      if (ids.includes(source) && ids.includes(target)) edgeIdSet.add(id);
    });
  });
  return Array.from(edgeIdSet);
};

export const upsertTransientItem = (
  item: Node | Edge | Combo,
  nodeGroup: Group,
  edgeGroup: Group,
  transientItemMap: Record<string, Node | Edge | Combo | Group>,
  onlyDrawKeyShape?: boolean,
) => {
  const transientItem = transientItemMap[item.model.id];
  if (transientItem) {
    return transientItem;
  }
  if (item.type === 'node') {
    const transientNode = item.clone(nodeGroup, onlyDrawKeyShape);
    transientItemMap[item.model.id] = transientNode;
    return transientNode;
  } else if (item.type === 'edge') {
    const source = upsertTransientItem(
      item.sourceItem,
      nodeGroup,
      edgeGroup,
      transientItemMap,
      onlyDrawKeyShape,
    ) as Node;
    const target = upsertTransientItem(
      item.targetItem,
      nodeGroup,
      edgeGroup,
      transientItemMap,
      onlyDrawKeyShape,
    ) as Node;
    const transientEdge = item.clone(edgeGroup, source, target);
    transientItemMap[item.model.id] = transientEdge;
    return transientEdge;
  }
  // TODO: clone combo
};
