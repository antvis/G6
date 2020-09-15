import { IGraph } from '../interface/graph';
import { INode } from '../interface/item';

/**
 * Generate all connected components for an undirected graph
 * @param graph
 */
export function detectConnectedComponents(nodes: INode[]) {
  const allComponents = [];
  const visited = {};
  const nodeStack = [];

  const getComponent = (node: INode) => {
    nodeStack.push(node);
    visited[node.get('id')] = true;
    const neighbors = node.getNeighbors();
    for (let i = 0; i < neighbors.length; ++i) {
      const neighbor = neighbors[i];
      if (!visited[neighbor.get('id')]) {
        getComponent(neighbor);
      }
    }
  };

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (!visited[node.get('id')]) {
      // 对于无向图进行dfs遍历，每一次调用后都得到一个连通分量
      getComponent(node);
      const component = [];
      while (nodeStack.length > 0) {
        component.push(nodeStack.pop());
      }
      allComponents.push(component);
    }
  }
  return allComponents;
}

/**
 * Tarjan's Algorithm 复杂度  O(|V|+|E|)
 * For directed graph only
 * a directed graph is said to be strongly connected if "every vertex is reachable from every other vertex".
 * refer: http://en.wikipedia.org/wiki/Tarjan%27s_strongly_connected_components_algorithm
 * @param graph
 * @return a list of strongly connected components
 */
export function detectStrongConnectComponents(nodes: INode[]) {
  const nodeStack = [];
  const inStack = {}; // 辅助判断是否已经在stack中，减少查找开销
  const indices = {};
  const lowLink = {};
  const allComponents = [];
  let index = 0;

  const getComponent = (node: INode) => {
    // Set the depth index for v to the smallest unused index
    indices[node.get('id')] = index;
    lowLink[node.get('id')] = index;
    index += 1;
    nodeStack.push(node);
    inStack[node.get('id')] = true;

    // 考虑每个邻接点
    const neighbors = node.getNeighbors('target').filter((n) => nodes.indexOf(n) > -1);
    for (let i = 0; i < neighbors.length; i++) {
      const targetNode = neighbors[i];
      if (!indices[targetNode.get('id')] && indices[targetNode.get('id')] !== 0) {
        getComponent(targetNode);
        // tree edge
        lowLink[node.get('id')] = Math.min(lowLink[node.get('id')], lowLink[targetNode.get('id')]);
      } else if (inStack[targetNode.get('id')]) {
        // back edge, target node is in the current SCC
        lowLink[node.get('id')] = Math.min(lowLink[node.get('id')], indices[targetNode.get('id')]);
      }
    }

    // If node is a root node, generate an SCC
    if (lowLink[node.get('id')] === indices[node.get('id')]) {
      const component = [];
      while (nodeStack.length > 0) {
        const tmpNode = nodeStack.pop();
        inStack[tmpNode.get('id')] = false;
        component.push(tmpNode);
        if (tmpNode === node) break;
      }
      if (component.length > 0) {
        allComponents.push(component);
      }
    }
  };

  for (const node of nodes) {
    if (!indices[node.get('id')] && indices[node.get('id')] !== 0) {
      getComponent(node);
    }
  }

  return allComponents;
}

export default function getConnectedComponents(graph: IGraph, directed?: boolean) {
  const isDirected = directed === undefined ? graph.get('directed') : directed;
  const nodes = graph.getNodes();
  if (isDirected) return detectStrongConnectComponents(nodes);
  return detectConnectedComponents(nodes);
}
