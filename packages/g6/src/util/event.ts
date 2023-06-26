import { IElement } from '@antv/g';
import { ID } from '@antv/graphlib';
import { IG6GraphEvent, IGraph } from 'types';

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
