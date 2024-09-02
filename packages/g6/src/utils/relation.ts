import type { Graph } from '../runtime/graph';
import type { EdgeDirection, ElementType, ID } from '../types';
import { idOf } from './id';
import { bfs } from './traverse';

/**
 * <zh/> 获取指定元素在 n 度关系内的所有元素的 ID
 *
 * <en/> Get the IDs of all elements within an n-degree relationship from the specified element
 * @remarks
 * <zh/> 对于节点，0 度关系是节点本身，1 度关系包括节点的直接相邻节点和边，以此类推。
 * 对于边，0 度关系是边本身，1 度关系包括边本身及其两个端点，以此类推。
 *
 * <en/> For a node, 0-degree relationship includes the node itself; 1-degree relationship includes the node's direct neighbors and their connecting edges, etc.
 * For an edge, 0-degree relationship includes the edge itself; 1-degree relationship includes the edge and its two endpoints, etc
 * @param graph - <zh/> 图实例 | <en/> graph instance
 * @param elementType - <zh/> 元素类型 | <en/> element type
 * @param elementId - <zh/> 起始元素的 ID | <en/> start element ID
 * @param degree - <zh/> 指定的度数 | <en/> the specified degree
 * @param direction - <zh/> 边的方向 | <en/> edge direction
 * @returns - <zh/> 返回节点和边的 ID 数组 | <en/> Returns an array of node and edge IDs
 */
export function getElementNthDegreeIds(
  graph: Graph,
  elementType: ElementType,
  elementId: ID,
  degree: number,
  direction: EdgeDirection = 'both',
): ID[] {
  if (elementType === 'combo' || elementType === 'node') {
    return getNodeNthDegreeIds(graph, elementId, degree, direction);
  }

  const edgeData = graph.getEdgeData(elementId);
  if (!edgeData) return [];

  const sourceRelations = getNodeNthDegreeIds(graph, edgeData.source, degree - 1, direction);
  const targetRelations = getNodeNthDegreeIds(graph, edgeData.target, degree - 1, direction);

  return Array.from(new Set<ID>([...sourceRelations, ...targetRelations, elementId]));
}

/**
 * <zh/> 获取指定节点在 n 度关系内的所有元素的 ID
 *
 * <en/> Get all elements IDs within n-degree relationship of the specified node
 * @remarks
 * <zh/> 节点的 0 度关系是节点本身，1 度关系是节点的直接相邻节点和边，以此类推
 * @param direction
 * <en/> 0-degree relationship of a node is the node itself; 1-degree relationship is the node's neighboring nodes and related edges, etc
 * @param graph - <zh/> 图实例 | <en/> graph instance
 * @param startNodeId - <zh/> 起始节点的 ID | <en/> The ID of the starting node
 * @param degree - <zh/> 指定的度数 | <en/> The specified degree
 * @param direction - <zh/> 边的方向 | <en/> The direction of the edge
 * @returns - <zh/> 返回节点和边的 ID 数组 | <en/> Returns an array of node and edge IDs
 */
export function getNodeNthDegreeIds(
  graph: Graph,
  startNodeId: ID,
  degree: number,
  direction: EdgeDirection = 'both',
): ID[] {
  const visitedNodes = new Set<ID>();
  const visitedEdges = new Set<ID>();
  const relations = new Set<ID>();

  bfs(
    startNodeId,
    (nodeId: ID, depth: number) => {
      if (depth > degree) return;
      relations.add(nodeId);

      graph.getRelatedEdgesData(nodeId, direction).forEach((edge) => {
        const edgeId = idOf(edge);
        if (!visitedEdges.has(edgeId) && depth < degree) {
          relations.add(edgeId);
          visitedEdges.add(edgeId);
        }
      });
    },
    (nodeId: ID) => {
      return graph
        .getRelatedEdgesData(nodeId, direction)
        .map((edge) => (edge.source === nodeId ? edge.target : edge.source))
        .filter((neighborNodeId) => {
          if (!visitedNodes.has(neighborNodeId)) {
            visitedNodes.add(neighborNodeId);
            return true;
          }
          return false;
        });
    },
  );

  return Array.from(relations);
}
