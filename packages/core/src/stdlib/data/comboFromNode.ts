
import { GraphData } from "../../types";

/**
 * A demo, generates combo data from nodes
 */
export const comboFromNode = (data: GraphData) => {
  const { nodes } = data;
  const combos = [];
  const nodeMap = {};
  const comboMap = {};
  nodes.forEach(node => nodeMap[node.id] = node);
  nodes.forEach(node => {
    const { parentId } = node.data || {};
    if (parentId) {
      if (nodeMap[parentId]) {
        combos.push(nodeMap[parentId]);
      } else {
        combos.push({ id: parentId });
      }
      comboMap[parentId] = node;
    }
  });
  return {
    nodes: nodes.filter(node => !comboMap[node.id]),
    edges: data.edges,
    combos
  }
}