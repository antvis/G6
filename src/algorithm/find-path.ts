import { IGraph } from '../interface/graph';
import { INode } from '../interface/item';
import { isString } from '@antv/util';
import dijkstra from './dijkstra';

export const findShortestPath = (
  graph: IGraph,
  start: INode | string,
  end: INode | string,
  directed?: boolean,
  weightPropertyName?: string,
) => {
  if (isString(start)) start = graph.findById(start) as INode;
  if (isString(end)) end = graph.findById(end) as INode;

  const { length, path } = dijkstra(graph, start.get('id'), directed, weightPropertyName);
  return { length: length[end.get('id')], path: path[end.get('id')] };
};

export const findAllPath = (
  graph: IGraph,
  start: INode | string,
  end: INode | string,
  directed?: boolean,
) => {
  if (isString(start)) start = graph.findById(start) as INode;
  if (isString(end)) end = graph.findById(end) as INode;
  if (directed === undefined) directed = graph.get('directed');

  if (start === end) return [[start.get('id')]];

  const visited = [start];
  const isVisited = { [start.get('id')]: true };
  const stack = []; // 辅助栈，用于存储访问过的节点的邻居节点
  const allPaths = [];
  let neighbors = directed ? start.getNeighbors('target') : start.getNeighbors();
  stack.push(neighbors);

  while (visited.length > 0 && stack.length > 0) {
    const children = stack[stack.length - 1];
    if (children.length) {
      const child = children.shift();
      if (child) {
        visited.push(child);
        isVisited[child.get('id')] = true;
        neighbors = directed ? child.getNeighbors('target') : child.getNeighbors();
        stack.push(neighbors.filter((neighbor) => !isVisited[neighbor.get('id')]));
      }
    } else {
      const node = visited.pop();
      isVisited[node.get('id')] = false;
      stack.pop();
      continue;
    }

    if (visited[visited.length - 1] === end) {
      const path = visited.map((node) => node.get('id'));
      allPaths.push(path);

      const node = visited.pop();
      isVisited[node.get('id')] = false;
      stack.pop();
    }
  }

  return allPaths;
};
