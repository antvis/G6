import { isString } from '@antv/util';
import { GraphData, TreeGraphData, NodeConfig, EdgeConfig } from '../types';
import { traverseTree } from './graphic';

/**
 * 验证关系图或树图数据的合法性，必须符合以下规则才会渲染图：
 * 1. 必须传入数据
 * 2. 节点的 ID 必须为字符串，暂不支持数字类型，如果支持数字类型，会出现类似 123 与 '123' 是否相等的问题
 * 3. 边的 source 和 target 值必须在节点 ID 中存在
 * @param data 关系图或树图数据
 * @return boolean 全部验证通过返回 true，否则返回 false
 */
export const validationData = (data?: GraphData | TreeGraphData): boolean => {
  // 1. 必须传入数据
  if (!data) {
    console.error('G6 Error Tips: data must be defined first');
    return false;
  }

  // 2. 节点的 ID 必须为字符串或数字类型
  const { nodes, edges } = data;
  if (!nodes && !edges) {
    let validated = true;
    // 不存在 nodes 和 edges，则说明是 TreeGraphData，按 TreeGraphData 规则验证
    traverseTree(data as TreeGraphData, param => {
      if (!isString(param.id)) {
        validated = false;
        return false;
      }
      return true;
    });
    return validated;
  }

  const nonNode = ((nodes as NodeConfig[]) || []).find(node => !isString(node.id));
  if (nonNode) {
    console.error(`G6 Error Tips: Node ID ${nonNode.id} only supports string type`);
    return false;
  }

  // 3. 边的 source 和 target 必须存在于节点中
  const nodeIds = ((nodes as NodeConfig[]) || []).map(node => node.id);
  const nonEdges = ((edges as EdgeConfig[]) || []).find(
    edge => !nodeIds.includes(edge.source) || !nodeIds.includes(edge.target),
  );
  if (nonEdges) {
    console.error(
      `G6 Error Tips: The edge with source ${nonEdges.source} and target ${nonEdges.target} does not completely exist in the ID of the node`,
    );
    return false;
  }
  return true;
};
