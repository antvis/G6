import { Group } from '@antv/g';
import { ID } from '@antv/graphlib';
import { uniqueId } from '@antv/util';
import Combo from '../element/combo';
import Edge from '../element/edge';
import Node from '../element/node';
import { Graph } from '../types';
import { DataModel } from '../types/data';
import { getCombinedBoundsByItem } from './shape';

/**
 * Find the edges whose source and target are both in the ids.
 * @param graph graph instance
 * @param ids the end nodes/combos id list
 * @returns id list of the edges meet the condition
 */
export const getEdgesBetween = (graph: Graph, ids: ID[]): ID[] => {
  const edgeIdSet = new Set<ID>();
  ids.forEach((endId) => {
    const edgesData = graph.getRelatedEdgesData(endId);
    edgesData.forEach((edge) => {
      const { source, target, id } = edge;
      if (!graph.getItemVisibility(id)) return; // hidden edge is not selectable
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
  nodeLabelGroup: Group,
  edgeLabelGroup: Group,
  transientItemMap: Map<ID, Node | Edge | Combo | Group>,
  itemMap: Map<ID, Node | Edge | Combo>,
  graphCore?: DataModel,
  drawOptions: {
    shapeIds?: string[];
    /** For transient edge */
    drawSource?: boolean;
    /** For transient edge */
    drawTarget?: boolean;
    visible?: boolean;
  } = {},
  updateAncestors = true,
) => {
  let transientItem = transientItemMap.get(item.model.id);
  if (transientItem) {
    return transientItem;
  }
  const { shapeIds, drawSource = true, drawTarget = true, visible = true } = drawOptions;
  if (item.type === 'node') {
    transientItem = item.clone(nodeGroup, nodeLabelGroup, shapeIds, true);
  } else if (item.type === 'edge') {
    let source;
    let target;
    if (drawSource) {
      source = upsertTransientItem(
        item.sourceItem,
        nodeGroup,
        edgeGroup,
        comboGroup,
        nodeLabelGroup,
        edgeLabelGroup,
        transientItemMap,
        itemMap,
        graphCore,
        drawOptions,
        false,
      ) as Node | Combo;
    }
    if (drawTarget) {
      target = upsertTransientItem(
        item.targetItem,
        nodeGroup,
        edgeGroup,
        comboGroup,
        nodeLabelGroup,
        edgeLabelGroup,
        transientItemMap,
        itemMap,
        graphCore,
        drawOptions,
        false,
      ) as Node | Combo;
    }
    transientItem = item.clone(
      edgeGroup,
      edgeLabelGroup,
      source,
      target,
      shapeIds,
      true,
      visible,
      transientItemMap,
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
            nodeLabelGroup,
            edgeLabelGroup,
            transientItemMap,
            itemMap,
            graphCore,
            drawOptions,
            false,
          ),
        );
      }
    });
    transientItem = (item as Combo).clone(
      comboGroup,
      nodeLabelGroup,
      shapeIds,
      true,
      () => getCombinedBoundsByItem(childItems), // getCombinedBounds
      () => childItems,
    ) as Combo;
    transientItem.toBack();
  }
  transientItemMap.set(item.model.id, transientItem);
  // @ts-ignore
  transientItem.transient = true;

  if (item.type !== 'edge' && updateAncestors && graphCore.hasTreeStructure('combo')) {
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
          nodeLabelGroup,
          edgeLabelGroup,
          transientItemMap,
          itemMap,
          graphCore,
          drawOptions,
        );
        transientAncestor.toBack();
      }
      currentAncestor = graphCore.getParent(currentAncestor.id, 'combo');
    }
  }

  if (shapeIds?.length && visible) {
    // @ts-ignore
    (transientItem as Group).childNodes.forEach((shape) => shape.show());
  }
  return transientItem;
};

/**
 * generate unique edge id
 * @todo consider edges with same source and target
 * @param source
 * @param target
 * @returns
 */
export function generateEdgeID(source: ID, target: ID) {
  return [source, uniqueId(), target].join('-');
}
