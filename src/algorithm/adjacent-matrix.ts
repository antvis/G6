import { IGraph } from '../interface/graph';
import { Matrix } from '../types';

const adjMatrix = (graph: IGraph, directed?: boolean) => {
  const nodes = graph.getNodes();
  const edges = graph.getEdges();
  const matrix: Matrix[] = [];
  // map node with index in data.nodes
  const nodeMap: {
    [key: string]: number;
  } = {};

  if (!nodes) {
    throw new Error('invalid nodes data!');
  }
  if (nodes) {
    nodes.forEach((node, i) => {
      nodeMap[node.getID()] = i;
      const row: number[] = [];
      matrix.push(row);
    });
  }

  if (edges) {
    edges.forEach((e) => {
      const model = e.getModel();
      const { source, target } = model;
      const sIndex = nodeMap[source as string];
      const tIndex = nodeMap[target as string];
      matrix[sIndex][tIndex] = 1;
      if (!directed) {
        matrix[tIndex][sIndex] = 1;
      }
    });
  }
  return matrix;
};

export default adjMatrix;
