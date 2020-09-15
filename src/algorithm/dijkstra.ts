import { IGraph } from '../interface/graph';
import { INode } from '../interface/item';

const dijkstra = (
  graph: IGraph,
  source: string,
  directed?: boolean,
  weightPropertyName?: string,
) => {
  const nodes = graph.getNodes();
  const nodeIds = [];
  const marks = {};
  const D = {};
  const prevs = {}; // key: 顶点, value: 顶点的前驱点数组（可能有多条等长的最短路径）
  nodes.forEach((node, i) => {
    const id = node.getID();
    nodeIds.push(id);
    D[id] = Infinity;
    if (id === source) D[id] = 0;
  });

  const nodeNum = nodes.length;
  for (let i = 0; i < nodeNum; i++) {
    // Process the vertices
    const minNode = minVertex(D, nodes, marks);
    const minNodId = minNode.get('id');
    marks[minNodId] = true;

    if (D[minNodId] === Infinity) continue; // Unreachable vertices cannot be the intermediate point

    let relatedEdges = [];
    if (!directed) relatedEdges = minNode.getOutEdges();
    else relatedEdges = minNode.getEdges();

    relatedEdges.forEach((e) => {
      const w = e.getTarget().getID();
      const weight =
        weightPropertyName && e.getModel()[weightPropertyName]
          ? e.getModel()[weightPropertyName]
          : 1;
      if (D[w] > D[minNode.get('id')] + weight) {
        D[w] = D[minNode.get('id')] + weight;
        prevs[w] = minNode.get('id');
      }
    });
  }
  const path = {};
  for (const target in D) {
    path[target] = [target];
    let prev = prevs[target];
    while (prev !== undefined) {
      path[target].unshift(prev);
      prev = prevs[prev];
    }
  }

  return { length: D, path };
};

function minVertex(
  D: { [key: string]: number },
  nodes: INode[],
  marks: { [key: string]: boolean },
) {
  // 找出最小的点
  let minDis = Infinity;
  let minNode;
  for (let i = 0; i < nodes.length; i++) {
    const nodeId = nodes[i].get('id');
    if (!marks[nodeId] && D[nodeId] <= minDis) {
      minDis = D[nodeId];
      minNode = nodes[i];
    }
  }
  return minNode;
}

export default dijkstra;
