import Hierarchy from '@antv/hierarchy';

import { traverse } from './data';
import { isArray, isNumber } from '@antv/util';
import { GraphData, ID, NodeModel } from 'types';
import { Point } from '../types/common';
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
    nodeMap.get(id).data = { x, y };
  });
  const diff = begin[isHorizontal ? 1 : 0] - range[0];
  treeNodeIds.forEach((id) => {
    const { x, y } = nodeMap.get(id).data;
    nodePositions.push({
      id,
      data: isHorizontal ? { x, y: y + diff } : { x: x + diff, y },
    });
  });
  begin[isHorizontal ? 1 : 0] += range[1] + diff + treeGap;
  return nodePositions;
};

/**
 * Whether the layout option is for combo layouts.
 * @param options
 * @returns
 */
export const isComboLayout = (options) => {
  const { type } = options;
  if (['comboCombined', 'comboForce'].includes(type)) return true;
  if (type === 'dagre' && options.sortByCombo) return true;
  return false;
};

/**
 * Whether the layout option is for tree layout.
 * @param options
 * @returns
 */
export const isTreeLayout = (options) => {
  const { type } = options;
  return !!Hierarchy[type];
};

export const getNodeSizeFn = (options, defaultSize = 32) => {
  if (options.nodeSize) return options.nodeSize;
  return (node) => {
    const { size, keyShape } = node.data;
    if (isArray(size)) return Math.max(...size);
    if (isNumber(size)) return size;
    if (!keyShape) return defaultSize;
    const { r, width, height } = keyShape;
    if (!isNaN(r)) return r * 2;
    const widthValid = !isNaN(width);
    const heightValid = !isNaN(height);
    if (widthValid && heightValid) return Math.max(width, height);
    if (widthValid) return width;
    if (heightValid) return height;
    return defaultSize;
  };
};

/**
 *
 * @param data Tree graph data
 * @param layout
 */
export const radialLayout = (
  tree: TreeGraphData,
  nodeMap: Map<ID, NodeModel>,
  layout?: string,
): GraphData => {
  // 布局方式有 H / V / LR / RL / TB / BT
  const VERTICAL_LAYOUTS: string[] = ['V', 'TB', 'BT'];
  const min: Point = {
    x: Infinity,
    y: Infinity,
  };

  const max: Point = {
    x: -Infinity,
    y: -Infinity,
  };
  // 默认布局是垂直布局TB，此时x对应rad，y对应r
  let rScale: 'x' | 'y' = 'x';
  let radScale: 'x' | 'y' = 'y';
  if (layout && VERTICAL_LAYOUTS.indexOf(layout) >= 0) {
    // 若是水平布局，y对应rad，x对应r
    radScale = 'x';
    rScale = 'y';
  }
  let count = 0;
  traverse(tree, (child) => {
    count++;
    const { x, y } = nodeMap.get(child.id).data;
    if (x > max.x) max.x = x;
    if (x < min.x) min.x = x;
    if (y > max.y) max.y = y;
    if (y < min.y) min.y = y;
  });
  const avgRad = (Math.PI * 2) / count;
  const radDiff = max[radScale] - min[radScale];
  if (radDiff === 0) return;

  const root = nodeMap.get(tree.id);
  traverse(tree, (child) => {
    const node = nodeMap.get(child.id);
    const radial =
      ((node.data[radScale] - min[radScale]) / radDiff) *
        (Math.PI * 2 - avgRad) +
      avgRad;
    const r = Math.abs(node.data[rScale] - root.data[rScale]);
    node.data.x = r * Math.cos(radial);
    node.data.y = r * Math.sin(radial);
    return true;
  });
  return;
};
