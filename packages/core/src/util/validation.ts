import { isString, isPlainObject } from '@antv/util';
import { GraphData, TreeGraphData, NodeConfig, EdgeConfig, ComboConfig, ITEM_TYPE } from '../types';
import { traverseTree } from './graphic';

/**
 * 验证关系图或树图数据的合法性，必须符合以下规则才会渲染图：
 * 1. 必须传入数据
 * 2. 节点的 ID 必须为字符串，暂不支持数字类型，如果支持数字类型，会出现类似 123 与 '123' 是否相等的问题
 * 3. 边的 source 和 target 值必须在节点 ID 中存在
 * @param data 关系图或树图数据
 * @return boolean 全部验证通过返回 true，否则返回 false
 */
export const dataValidation = (data?: GraphData | TreeGraphData): boolean => {
  // 1. 必须传入数据
  if (!data) {
    console.error('G6 Error Tips: the data must be defined');
    return false;
  }

  // 2. 节点的 ID 必须为字符串或数字类型
  const { nodes, edges, combos = [] } = data;
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
    console.warn(
      `G6 Warning Tips: missing 'id' property, or %c${nonNode.id}%c is not a string.`,
      'font-size: 20px; color: red;',
      '',
    );
    return false;
  }

  // 3. 边的 source 和 target 必须存在于节点 或 Combo中
  const ids = new Set<string>();
  ((nodes as NodeConfig[]) || []).forEach(node => ids.add(node.id));
  ((combos as ComboConfig[]) || []).forEach(combo => ids.add(combo.id));
  const nonEdges = ((edges as EdgeConfig[]) || []).find(function (edge) {
    return !ids.has(edge.source) || !ids.has(edge.target);
  });
  if (nonEdges) {
    console.warn(
      `G6 Warning Tips: The source %c${nonEdges.source}%c or the target %c${nonEdges.target}%c of the edge do not exist in the nodes or combos.`,
      'font-size: 20px; color: red;',
      '',
      'font-size: 20px; color: red;',
      '',
    );
    return false;
  }
  return true;
};

/**
 * 验证添加节点、边或从combo时的数据
 * @param type 节点、边或从combo
 * @param data 添加的单条数据
 * @return boolean 全部验证通过返回 true，否则返回 false
 */
export const singleDataValidation = (
  type: ITEM_TYPE,
  data: NodeConfig | EdgeConfig | ComboConfig,
): boolean => {
  if (type === 'node' || type === 'combo') {
    // 必须有 id 字段，且id必须为字符串类型
    if (data.id && !isString(data.id)) {
      console.warn(
        `G6 Warning Tips: missing 'id' property, or the 'id' %c${data.id}%c is not a string.`,
        'font-size: 20px; color: red;',
        '',
      );
      return false;
    }
  } else if (type === 'edge') {
    // 必须有 source 和 target 字段
    if (!(data as EdgeConfig).source || !(data as EdgeConfig).target) {
      console.warn(`G6 Warning Tips: missing 'source' or 'target' for the edge.`);
      return false;
    }
  }
  return true;
};
