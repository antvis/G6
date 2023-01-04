
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
    if (node.parentId) {
      if (nodeMap[node.parentId]) {
        combos.push(nodeMap[node.parentId]);
      } else {
        combos.push({ id: node.parentId });
      }
      comboMap[node.parentId] = node;
    }
  });
  return {
    nodes: nodes.filter(node => !comboMap[node.id]),
    edges: data.edges,
    combos
  }
}