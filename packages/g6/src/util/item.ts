import { ID } from '@antv/graphlib';
import { Group } from '@antv/g';
import { IGraph } from '../types';
import Combo from '../item/combo';
import Edge from '../item/edge';
import Node from '../item/node';
import { GraphCore } from '../types/data';
import { getCombinedBoundsByItem } from './shape';

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
  comboGroup: Group,
  transientItemMap: Map<ID, Node | Edge | Combo | Group>,
  itemMap: Map<ID, Node | Edge | Combo>,
  graphCore?: GraphCore,
  onlyDrawKeyShape?: boolean,
  upsertAncestors = true,
) => {
  let transientItem = transientItemMap[item.model.id];
  if (transientItem) {
    return transientItem;
  }
  if (item.type === 'node') {
    transientItem = item.clone(nodeGroup, onlyDrawKeyShape, true) as Node;
  } else if (item.type === 'edge') {
    const source = upsertTransientItem(
      item.sourceItem,
      nodeGroup,
      edgeGroup,
      comboGroup,
      transientItemMap,
      itemMap,
      graphCore,
      onlyDrawKeyShape,
      false,
    ) as Node | Combo;
    const target = upsertTransientItem(
      item.targetItem,
      nodeGroup,
      edgeGroup,
      comboGroup,
      transientItemMap,
      itemMap,
      graphCore,
      onlyDrawKeyShape,
      false,
    ) as Node | Combo;
    transientItem = item.clone(
      edgeGroup,
      source,
      target,
      undefined,
      true,
    ) as Edge;
  } else {
    // find the succeeds to upsert transients
    const childItems = [];
    const children = graphCore.getChildren(item.model.id, 'combo');
    children.forEach((childModel) => {
      const childItem = itemMap.get(childModel.id);
      if (childItem) {
        childItems.push(
          upsertTransientItem(
            childItem,
            nodeGroup,
            edgeGroup,
            comboGroup,
            transientItemMap,
            itemMap,
            graphCore,
            onlyDrawKeyShape,
            false,
          ),
        );
      }
    });
    transientItem = (item as Combo).clone(
      comboGroup,
      onlyDrawKeyShape,
      true,
      () => getCombinedBoundsByItem(childItems), // getCombinedBounds
      () => childItems,
    ) as Combo;
    transientItem.toBack();
  }
  transientItemMap[item.model.id] = transientItem;
  transientItem.transient = true;

  if (item.type !== 'edge' && upsertAncestors) {
    // find the ancestors to upsert transients
    let currentAncestor = graphCore.getParent(item.model.id, 'combo');
    while (currentAncestor) {
      const ancestorItem = itemMap.get(currentAncestor.id);
      if (ancestorItem) {
        const transientAncestor = upsertTransientItem(
          ancestorItem,
          nodeGroup,
          edgeGroup,
          comboGroup,
          transientItemMap,
          itemMap,
          graphCore,
          onlyDrawKeyShape,
        );
        transientAncestor.toBack();
      }
      currentAncestor = graphCore.getParent(currentAncestor.id, 'combo');
    }
  }
  return transientItem;
};
