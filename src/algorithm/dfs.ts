import GraphVertex from "./structs/graph/GraphVertex";
import Graph from './structs/graph/Graph'

interface ICallback {
  allowTraversal?: any;
  enterVertex?: any;
  leaveVertex?: any;
}

function initCallbacks(callbacks: ICallback = {} as ICallback) {
  const initiatedCallback = callbacks as ICallback;

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
function depthFirstSearchRecursive(graph: Graph, currentVertex: GraphVertex, previousVertex: GraphVertex, callbacks: ICallback) {
  callbacks.enterVertex({ currentVertex, previousVertex });

  graph.getNeighbors(currentVertex).forEach((nextVertex) => {
    if (callbacks.allowTraversal({ previousVertex, currentVertex, nextVertex })) {
      depthFirstSearchRecursive(graph, nextVertex, currentVertex, callbacks);
    }
  });

  callbacks.leaveVertex({ currentVertex, previousVertex });
}

/**
 * @param {Graph} graph
 * @param {GraphVertex} startVertex
 * @param {Callbacks} [callbacks]
 */
export default function depthFirstSearch(graph: Graph, startVertex: GraphVertex, callbacks: ICallback) {
  const previousVertex = null;
  depthFirstSearchRecursive(graph, startVertex, previousVertex, initCallbacks(callbacks));
}
