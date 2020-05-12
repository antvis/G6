import GraphVertex from "./structs/graph/GraphVertex";
import Graph from './structs/graph/Graph'
import { IAlgorithmCallbacks } from '../types'

function initCallbacks(callbacks: IAlgorithmCallbacks = {} as IAlgorithmCallbacks) {
  const initiatedCallback = callbacks;

  const stubCallback = () => {};

  const allowTraversalCallback = (
    () => {
      const seen = {};
      return ({ nextVertex }) => {
        if (!seen[nextVertex.getKey()]) {
          seen[nextVertex.getKey()] = true;
          return true;
        }
        return false;
      };
    }
  )();

  initiatedCallback.allowTraversal = callbacks.allowTraversal || allowTraversalCallback;
  initiatedCallback.enterVertex = callbacks.enterVertex || stubCallback;
  initiatedCallback.leaveVertex = callbacks.leaveVertex || stubCallback;

  return initiatedCallback;
}

/**
 * @param {Graph} graph
 * @param {GraphVertex} currentVertex
 * @param {GraphVertex} previousVertex
 * @param {Callbacks} callbacks
 */
function depthFirstSearchRecursive(graph: Graph, currentVertex: GraphVertex, previousVertex: GraphVertex, callbacks: IAlgorithmCallbacks) {
  callbacks.enterVertex({ currentVertex, previousVertex });

  graph.getNeighbors(currentVertex).forEach((nextVertex) => {
    if (callbacks.allowTraversal({ previousVertex, currentVertex, nextVertex })) {
      depthFirstSearchRecursive(graph, nextVertex, currentVertex, callbacks);
    }
  });

  callbacks.leaveVertex({ currentVertex, previousVertex });
}

/**
 * 深度优先遍历图
 * @param graph Graph 图实例
 * @param startVertex 开始遍历的节点
 * @param originalCallbacks 回调
 */
export default function depthFirstSearch(graph: Graph, startVertex: GraphVertex, callbacks?: IAlgorithmCallbacks) {
  const previousVertex = null;
  depthFirstSearchRecursive(graph, startVertex, previousVertex, initCallbacks(callbacks));
}
