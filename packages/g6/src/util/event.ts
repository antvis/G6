import { IElement } from "@antv/g";
import { ID } from "@antv/graphlib";

export type ItemInfo = {
  itemType: 'canvas' | 'node' | 'edge' | 'combo';
  itemId: ID;
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
      itemId: 'CANVAS',
      groupElement: element,
    };
  }

  let parent = element;
  while (parent && !parent.getAttribute('data-item-type')) {
    parent = element.parentElement;
  }
  if (!parent) return null;

  return {
    itemType: parent.getAttribute('data-item-type'),
    itemId: parent.getAttribute('data-item-id'),
    groupElement: parent,
  };
}
