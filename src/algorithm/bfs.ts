import Queue from './structs/queue'
import GraphVertex from "./structs/graph/GraphVertex";
import Graph from './structs/graph/Graph'
import { IAlgorithmCallbacks } from '../types'

/**
 * 
 * @param callbacks 
 * allowTraversal: 确定 BFS 是否从顶点沿着边遍历到其邻居，默认情况下，同一个节点只能遍历一次
 * enterVertex: 当 BFS 访问某个节点时调用
 * leaveVertex: 当 BFS 访问访问结束某个节点时调用
 */
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
 * 广度优先遍历图
 * @param graph Graph 图实例
 * @param startVertex 开始遍历的节点
 * @param originalCallbacks 回调
 */
const breadthFirstSearch = (graph: Graph, startVertex: GraphVertex, originalCallbacks?: IAlgorithmCallbacks) => {
  const callbacks = initCallbacks(originalCallbacks)
  const vertexQueue = new Queue()

  // 初始化队列元素
  vertexQueue.enqueue(startVertex)

  let previousVertex = null

  // 遍历队列中的所有顶点
  while (!vertexQueue.isEmpty()) {
    const currentVertex = vertexQueue.dequeue() as GraphVertex
    callbacks.enterVertex({
      currentVertex,
      previousVertex
    })

    // 将所有邻居添加到队列中以便遍历
    graph.getNeighbors(currentVertex).forEach((nextVertex: GraphVertex) => {
      if (callbacks.allowTraversal({ previousVertex, currentVertex, nextVertex })) {
        vertexQueue.enqueue(nextVertex)
      }
    })

    callbacks.leaveVertex({
      currentVertex,
      previousVertex
    })

    // 下一次循环之前存储当前顶点
    previousVertex = currentVertex
  }
}

export default breadthFirstSearch
