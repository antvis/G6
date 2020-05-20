import dfs from './dfs'
import { IAlgorithmCallbacks } from '../types'
import { IGraph } from '../interface/graph';
import { INode } from '../interface/item';

const detectDirectedCycle = (graph: IGraph) => {
  let cycle: {
    [key: string]: INode
  } = null

  const dfsParentMap = {}

  // 所有没有被访问的节点集合
  const unvisitedSet = {}

  // 正在被访问的节点集合
  const visitingSet = {}

  // 所有已经被访问过的节点集合
  const visitedSet = {}

  // 初始化 unvisitedSet
  graph.getNodes().forEach(vertex => {
    unvisitedSet[vertex.getID()] = vertex
  })

  const callbacks: IAlgorithmCallbacks = {
    enter: ({ current: currentVertex, previous: previousVertex }) => {
      if (visitingSet[currentVertex.getID()]) {
        // 如果当前节点正在访问中，则说明检测到环路了
        cycle = {}

        let currentCycleVertex = currentVertex
        let previousCycleVertex = previousVertex

        while (previousCycleVertex.getID() !== currentVertex.getID()) {
          cycle[currentCycleVertex.getID()] = previousCycleVertex
          currentCycleVertex = previousCycleVertex
          previousCycleVertex = dfsParentMap[previousCycleVertex.getID()]
        }

        cycle[currentCycleVertex.getID()] = previousCycleVertex
       } else {
         // 如果不存在正在访问集合中，则将其放入正在访问集合，并从未访问集合中删除
         visitingSet[currentVertex.getID()] = currentVertex
         delete unvisitedSet[currentVertex.getID()]

         // 更新 DSF parents 列表
         dfsParentMap[currentVertex.getID()] = previousVertex
       }
    },
    leave: ({ current: currentVertex }) => {
      // 如果所有的节点的子节点都已经访问过了，则从正在访问集合中删除掉，并将其移入到已访问集合中，
      // 同时也意味着当前节点的所有邻居节点都被访问过了
      visitedSet[currentVertex.getID()] = currentVertex
      delete visitingSet[currentVertex.getID()]
    },
    allowTraversal: ({ next: nextVertex }) => {
      // 如果检测到环路则需要终止所有进一步的遍历，否则会导致无限循环遍历
      if (cycle) {
        return false
      }

      // 仅允许遍历没有访问的节点，visitedSet 中的都已经访问过了
      return !visitedSet[nextVertex.getID()]
    }
  }

  // 开始遍历节点
  while (Object.keys(unvisitedSet).length) {
    // 从第一个节点开始进行 DFS 遍历
    const firsetUnVisitedKey = Object.keys(unvisitedSet)[0]

    dfs(graph, firsetUnVisitedKey, callbacks)
  }

  return cycle
}

export default detectDirectedCycle
