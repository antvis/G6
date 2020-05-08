import dfs from './dfs'
import Graph from './structs/graph/Graph'
import GraphVertex from './structs/graph/GraphVertex'

interface ICallbacks {
  enterVertex: (param: { currentVertex: GraphVertex, previousVertex: GraphVertex }) => void;
  leaveVertex: (param: { currentVertex: GraphVertex }) => void;
  allowTraversal: (param: { nextVertex: GraphVertex }) => boolean;
}

const detectDirectedCycle = (graph: Graph) => {
  let cycle: {
    [key: string]: GraphVertex
  } = null

  const dfsParentMap = {}

  // 所有没有被访问的节点集合
  const unvisitedSet = {}

  // 正在被访问的节点集合
  const visitingSet = {}

  // 所有已经被访问过的节点集合
  const visitedSet = {}

  // 初始化 unvisitedSet
  graph.getAllVertices().forEach(vertex => {
    unvisitedSet[vertex.getKey()] = vertex
  })

  const callbacks: ICallbacks = {
    enterVertex: ({ currentVertex, previousVertex }) => {
      if (visitingSet[currentVertex.getKey()]) {
        // 如果当前节点正在访问中，则说明检测到环路了
        cycle = {}

        let currentCycleVertex = currentVertex
        let previousCycleVertex = previousVertex

        while (previousCycleVertex.getKey() !== currentVertex.getKey()) {
          cycle[currentCycleVertex.getKey()] = previousCycleVertex
          currentCycleVertex = previousCycleVertex
          previousCycleVertex = dfsParentMap[previousCycleVertex.getKey()]
        }

        cycle[currentCycleVertex.getKey()] = previousCycleVertex
       } else {
         // 如果不存在正在访问集合中，则将其放入正在访问集合，并从未访问集合中删除
         visitingSet[currentVertex.getKey()] = currentVertex
         delete unvisitedSet[currentVertex.getKey()]

         // 更新 DSF parents 列表
         dfsParentMap[currentVertex.getKey()] = previousVertex
       }
    },
    leaveVertex: ({ currentVertex }) => {
      // 如果所有的节点的子节点都已经访问过了，则从正在访问集合中删除掉，并将其移入到已访问集合中，
      // 同时也意味着当前节点的所有邻居节点都被访问过了
      visitedSet[currentVertex.getKey()] = currentVertex
      delete visitingSet[currentVertex.getKey()]
    },
    allowTraversal: ({ nextVertex }) => {
      // 如果检测到环路则需要终止所有进一步的遍历，否则会导致无限循环遍历
      if (cycle) {
        return false
      }

      // 仅允许遍历没有访问的节点，visitedSet 中的都已经访问过了
      return !visitedSet[nextVertex.getKey()]
    }
  }

  // 开始遍历节点
  while (Object.keys(unvisitedSet).length) {
    // 从第一个节点开始进行 DFS 遍历
    const firsetUnVisitedKey = Object.keys(unvisitedSet)[0]
    const startVertex = unvisitedSet[firsetUnVisitedKey]

    dfs(graph, startVertex, callbacks)
  }

  return cycle
}

export default detectDirectedCycle
