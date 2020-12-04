import Queue from './structs/queue';
import { IAlgorithmCallbacks } from '../types';
import { IGraph } from '../interface/graph';
import { INode } from '../interface/item';

/**
 *
 * @param callbacks
 * allowTraversal: 确定 BFS 是否从顶点沿着边遍历到其邻居，默认情况下，同一个节点只能遍历一次
 * enterNode: 当 BFS 访问某个节点时调用
 * leaveNode: 当 BFS 访问访问结束某个节点时调用
 */
function initCallbacks(callbacks: IAlgorithmCallbacks = {} as IAlgorithmCallbacks) {
  const initiatedCallback = callbacks;

  const stubCallback = () => {};

  const allowTraversalCallback = (() => {
    const seen = {};
    return ({ next }) => {
      const id = next.get('id');
      if (!seen[id]) {
        seen[id] = true;
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
 * 广度优先遍历图
 * @param graph Graph 图实例
 * @param startNode 开始遍历的节点
 * @param originalCallbacks 回调
 */
const breadthFirstSearch = (
  graph: IGraph,
  startNodeId: string,
  originalCallbacks?: IAlgorithmCallbacks,
) => {
  const callbacks = initCallbacks(originalCallbacks);
  const nodeQueue = new Queue();

  const startNode = graph.findById(startNodeId);
  // 初始化队列元素
  nodeQueue.enqueue(startNode);

  let previousNode = null;

  // 遍历队列中的所有顶点
  while (!nodeQueue.isEmpty()) {
    const currentNode = nodeQueue.dequeue() as INode;
    callbacks.enter({
      current: currentNode,
      previous: previousNode,
    });

    // 将所有邻居添加到队列中以便遍历
    graph.getNeighbors(currentNode, 'target').forEach((nextNode: INode) => {
      if (
        callbacks.allowTraversal({
          previous: previousNode,
          current: currentNode,
          next: nextNode,
        })
      ) {
        nodeQueue.enqueue(nextNode);
      }
    });

    callbacks.leave({
      current: currentNode,
      previous: previousNode,
    });

    // 下一次循环之前存储当前顶点
    previousNode = currentNode;
  }
};

export default breadthFirstSearch;
