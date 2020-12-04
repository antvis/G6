import { IAlgorithmCallbacks } from '../types';
import { IGraph } from '../interface/graph';
import { INode } from '../interface/item';

function initCallbacks(callbacks: IAlgorithmCallbacks = {} as IAlgorithmCallbacks) {
  const initiatedCallback = callbacks;

  const stubCallback = () => {};

  const allowTraversalCallback = (() => {
    const seen = {};
    return ({ next }) => {
      if (!seen[next.get('id')]) {
        seen[next.get('id')] = true;
        return true;
      }
      return false;
    };
  })();

  initiatedCallback.allowTraversal = callbacks.allowTraversal || allowTraversalCallback;
  initiatedCallback.enter = callbacks.enter || stubCallback;
  initiatedCallback.leave = callbacks.leave || stubCallback;

  return initiatedCallback;
}

/**
 * @param {Graph} graph
 * @param {GraphNode} currentNode
 * @param {GraphNode} previousNode
 * @param {Callbacks} callbacks
 */
function depthFirstSearchRecursive(
  graph: IGraph,
  currentNode: INode,
  previousNode: INode,
  callbacks: IAlgorithmCallbacks,
) {
  callbacks.enter({
    current: currentNode,
    previous: previousNode,
  });

  graph.getNeighbors(currentNode, 'target').forEach((nextNode) => {
    if (
      callbacks.allowTraversal({
        previous: previousNode,
        current: currentNode,
        next: nextNode,
      })
    ) {
      depthFirstSearchRecursive(graph, nextNode, currentNode, callbacks);
    }
  });

  callbacks.leave({
    current: currentNode,
    previous: previousNode,
  });
}

/**
 * 深度优先遍历图
 * @param data GraphData 图数据
 * @param startNodeId 开始遍历的节点的 ID
 * @param originalCallbacks 回调
 */
export default function depthFirstSearch(
  graph: IGraph,
  startNodeId: string,
  callbacks?: IAlgorithmCallbacks,
) {
  const previousNode = null;
  const startNode = graph.findById(startNodeId) as INode;
  depthFirstSearchRecursive(graph, startNode, previousNode, initCallbacks(callbacks));
}
