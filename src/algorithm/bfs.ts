import Queue from './structs/queue'
import { IAlgorithmCallbacks } from '../types'
import { IGraph } from '../interface/graph';
import { INode } from '../interface/item';

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
      return ({ next }) => {
        const id = next.get('id')
        if (!seen[id]) {
          seen[id] = true;
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
 * 广度优先遍历图
 * @param graph Graph 图实例
 * @param startVertex 开始遍历的节点
 * @param originalCallbacks 回调
 */
const breadthFirstSearch = (graph: IGraph, startVertexId: string, originalCallbacks?: IAlgorithmCallbacks) => {
  const callbacks = initCallbacks(originalCallbacks)
  const vertexQueue = new Queue()

  const startVertex = graph.findById(startVertexId)
  // 初始化队列元素
  vertexQueue.enqueue(startVertex)

  let previousVertex = null

  // 遍历队列中的所有顶点
  while (!vertexQueue.isEmpty()) {
    const currentVertex = vertexQueue.dequeue() as INode
    callbacks.enter({
      current: currentVertex,
      previous: previousVertex
    })

    // 将所有邻居添加到队列中以便遍历
    graph.getSourceNeighbors(currentVertex).forEach((nextVertex: INode) => {
      if (callbacks.allowTraversal({ 
        previous: previousVertex, 
        current: currentVertex, 
        next: nextVertex })) {
        vertexQueue.enqueue(nextVertex)
      }
    })

    callbacks.leave({
      current: currentVertex,
      previous: previousVertex
    })

    // 下一次循环之前存储当前顶点
    previousVertex = currentVertex
  }
}

export default breadthFirstSearch
