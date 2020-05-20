import { IAlgorithmCallbacks } from '../types'
import { IGraph } from '../interface/graph';
import { INode } from '../interface/item';

function initCallbacks(callbacks: IAlgorithmCallbacks = {} as IAlgorithmCallbacks) {
  const initiatedCallback = callbacks;

  const stubCallback = () => {};

  const allowTraversalCallback = (
    () => {
      const seen = {};
      return ({ next }) => {
        if (!seen[next.get('id')]) {
          seen[next.get('id')] = true;
          return true;
        }
        return false;
      };
    }
  )();

  initiatedCallback.allowTraversal = callbacks.allowTraversal || allowTraversalCallback;
  initiatedCallback.enter = callbacks.enter || stubCallback;
  initiatedCallback.leave = callbacks.leave || stubCallback;

  return initiatedCallback;
}

/**
 * @param {Graph} graph
 * @param {GraphVertex} currentVertex
 * @param {GraphVertex} previousVertex
 * @param {Callbacks} callbacks
 */
function depthFirstSearchRecursive(graph: IGraph, currentVertex: INode, previousVertex: INode, callbacks: IAlgorithmCallbacks) {
  callbacks.enter({ 
    current: currentVertex, 
    previous: previousVertex });

  graph.getSourceNeighbors(currentVertex).forEach((nextVertex) => {
    if (callbacks.allowTraversal({
      previous: previousVertex, 
      current: currentVertex, 
      next: nextVertex })) {
      depthFirstSearchRecursive(graph, nextVertex, currentVertex, callbacks);
    }
  });

  callbacks.leave({ 
    current: currentVertex, 
    previous: previousVertex 
  });
}

/**
 * 深度优先遍历图
 * @param data GraphData 图数据
 * @param startVertex 开始遍历的节点
 * @param originalCallbacks 回调
 */
export default function depthFirstSearch(graph: IGraph, startVertexId: string, callbacks?: IAlgorithmCallbacks) {
  const previousVertex = null;
  const startVertex = graph.findById(startVertexId) as INode
  depthFirstSearchRecursive(graph, startVertex, previousVertex, initCallbacks(callbacks));
}
