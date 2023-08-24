import Hierarchy from '@antv/hierarchy';

import { traverse } from './data';
type TreeGraphData = any;
/**
 * Judge the direction according to options of a tree layout.
 * @param type Tree layout type.
 * @param options Tree layout options.
 * @returns
 */
export const isTreeLayoutHorizontal = (type, options) => {
  const { direction } = options;
  switch (type) {
    case 'compactBox':
    case 'dendrogram':
      return direction !== 'TB' && direction !== ' BT' && direction !== ' V';
    case 'indented':
      return true;
    case 'mindmap':
      return direction !== 'V';
  }
};

/**
 * Layout nodes on a single tree.
 * @param treeData
 * @param layoutType Tree layout type.
 * @param layoutOptions Tree layout options.
 * @param nodeMap
 * @param nodePositions An array to store the result.
 * @param begin The begin position for this tree, might be calculated from last tree.
 * @returns Positions array.
 */
export const layoutOneTree = (
  treeData: TreeGraphData,
  layoutType: string,
  layoutOptions,
  nodeMap,
  nodePositions,
  begin = [0, 0],
) => {
  const { treeGap = 50 } = layoutOptions;
  const isHorizontal = isTreeLayoutHorizontal(layoutType, layoutOptions);
  const layoutData = Hierarchy[layoutType](treeData, layoutOptions);
  const range = [Infinity, -Infinity];
  const treeNodeIds = [];
  traverse(layoutData, (child) => {
    const { id, x, y } = child;
    treeNodeIds.push(id);
    const dim = isHorizontal ? 'y' : 'x';
    if (range[0] > child[dim]) range[0] = child[dim];
    if (range[1] < child[dim]) range[1] = child[dim];
    nodeMap[id].data = { x, y };
  });
  const diff = begin[isHorizontal ? 1 : 0] - range[0];
  treeNodeIds.forEach((id) => {
    const { x, y } = nodeMap[id].data;
    nodePositions.push({
      id,
      data: isHorizontal ? { x, y: y + diff } : { x: x + diff, y },
    });
  });
  begin[isHorizontal ? 1 : 0] += range[1] + diff + treeGap;
  return nodePositions;
};

export const isComboLayout = (options) => {
  const { type } = options;
  if (['comboCombined', 'comboForce'].includes(type)) return true;
  return false;
};
