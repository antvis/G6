import { IElement } from '@antv/g';
import {
  EdgeAdded,
  EdgeDataUpdated,
  EdgeRemoved,
  EdgeUpdated,
  ID,
  NodeAdded,
  NodeDataUpdated,
  NodeRemoved,
  TreeStructureChanged,
} from '@antv/graphlib';
import { IG6GraphEvent, IGraph, NodeModelData } from '../types';
import { GraphCore } from '../types/data';
import { EdgeModelData } from '../types/edge';

export type ItemInfo = {
  itemType: 'canvas' | 'node' | 'edge' | 'combo';
  itemId: ID | undefined;
  groupElement: IElement;
};

/**
 * Given an element, which might be a child shape of a node/edge,
 * get its belonging item.
 */
export const getItemInfoFromElement = (element: IElement): ItemInfo | null => {
  if (element.nodeName === 'document') {
    return {
      itemType: 'canvas',
      itemId: undefined,
      groupElement: element,
    };
  }

  let parent = element;
  while (parent && !parent.getAttribute?.('data-item-type')) {
    parent = parent.parentElement;
  }
  if (!parent) return null;

  return {
    itemType: parent.getAttribute('data-item-type'),
    itemId: parent.getAttribute('data-item-id'),
    groupElement: parent,
  };
};

/**
 * Returns the event props for graph's contextmenu event.
 * @param event Original g6 event props.
 * @param graph Graph instance.
 * @returns Contextmenu event props.
 */
export const getContextMenuEventProps = (
  event: IG6GraphEvent,
  graph: IGraph,
): IG6GraphEvent => {
  return {
    ...event,
    type: 'contextmenu',
    preventDefault: () => {
      graph.canvas
        .getContextService()
        .getDomElement()
        .addEventListener(
          'contextmenu',
          (e) => {
            e.preventDefault();
          },
          { once: true },
        );
    },
  };
};

export type GroupedChanges = {
  NodeRemoved: NodeRemoved<NodeModelData>[];
  EdgeRemoved: EdgeRemoved<EdgeModelData>[];
  NodeAdded: NodeAdded<NodeModelData>[];
  EdgeAdded: EdgeAdded<EdgeModelData>[];
  NodeDataUpdated: NodeDataUpdated<NodeModelData>[];
  EdgeUpdated: EdgeUpdated<EdgeModelData>[];
  EdgeDataUpdated: EdgeDataUpdated<EdgeModelData>[];
  TreeStructureChanged: TreeStructureChanged[];
};

/**
 * Group the changes with change types from graphCore's changes.
 * @param graphCore
 * @param changes
 * @returns
 */
export const getGroupedChanges = (
  graphCore: GraphCore,
  changes,
): GroupedChanges => {
  const groupedChanges: GroupedChanges = {
    NodeRemoved: [],
    EdgeRemoved: [],
    NodeAdded: [],
    EdgeAdded: [],
    NodeDataUpdated: [],
    EdgeUpdated: [],
    EdgeDataUpdated: [],
    TreeStructureChanged: [],
  };
  changes.forEach((change) => {
    const { type: changeType } = change;
    if (
      ['NodeDataUpdated', 'EdgeUpdated', 'EdgeDataUpdated'].includes(changeType)
    ) {
      const { id: oid } = change;
      if (!graphCore.hasNode(oid) && !graphCore.hasEdge(oid)) {
        const nid = Number(oid);
        if ((!isNaN(nid) && graphCore.hasNode(nid)) || graphCore.hasEdge(nid)) {
          groupedChanges[changeType].push({ ...change, id: nid });
        }
        return;
      }
    } else if (changeType === 'TreeStructureChanged') {
      groupedChanges[changeType].push(change);
      return;
    }
    // else {
    //   const { id: oid } = change.value;
    //   if (!graphCore.hasNode(oid) && !graphCore.hasEdge(oid)) {
    //     const nid = Number(oid);
    //     if ((!isNaN(nid) && graphCore.hasNode(nid)) || graphCore.hasEdge(nid)) {
    //       groupedChanges[changeType].push({
    //         ...change,
    //         value: { ...change.value, id: nid },
    //       });
    //     }
    //     return;
    //   }
    // }
    groupedChanges[changeType].push(change);
  });
  return groupedChanges;
};
