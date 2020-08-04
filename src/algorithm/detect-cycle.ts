import dfs from './dfs'
import { IAlgorithmCallbacks } from '../types'
import { IGraph } from '../interface/graph';
import { INode } from '../interface/item';
import { detectStrongConnectComponents } from './connected-component'

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
  graph.getNodes().forEach(node => {
    unvisitedSet[node.getID()] = node
  })

  const callbacks: IAlgorithmCallbacks = {
    enter: ({ current: currentNode, previous: previousNode }) => {
      if (visitingSet[currentNode.getID()]) {
        // 如果当前节点正在访问中，则说明检测到环路了
        cycle = {}

        let currentCycleNode = currentNode
        let previousCycleNode = previousNode

        while (previousCycleNode.getID() !== currentNode.getID()) {
          cycle[currentCycleNode.getID()] = previousCycleNode
          currentCycleNode = previousCycleNode
          previousCycleNode = dfsParentMap[previousCycleNode.getID()]
        }

        cycle[currentCycleNode.getID()] = previousCycleNode
      } else {
        // 如果不存在正在访问集合中，则将其放入正在访问集合，并从未访问集合中删除
        visitingSet[currentNode.getID()] = currentNode
        delete unvisitedSet[currentNode.getID()]

        // 更新 DSF parents 列表
        dfsParentMap[currentNode.getID()] = previousNode
      }
    },
    leave: ({ current: currentNode }) => {
      // 如果所有的节点的子节点都已经访问过了，则从正在访问集合中删除掉，并将其移入到已访问集合中，
      // 同时也意味着当前节点的所有邻居节点都被访问过了
      visitedSet[currentNode.getID()] = currentNode
      delete visitingSet[currentNode.getID()]
    },
    allowTraversal: ({ next: nextNode }) => {
      // 如果检测到环路则需要终止所有进一步的遍历，否则会导致无限循环遍历
      if (cycle) {
        return false
      }

      // 仅允许遍历没有访问的节点，visitedSet 中的都已经访问过了
      return !visitedSet[nextNode.getID()]
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

/**
 * 检测无向图中的所有Base cycles
 * Time Complexity: O(N + M), Auxiliary Space: O(N + M)
 * graph coloring method
 * refer: https://www.geeksforgeeks.org/print-all-the-cycles-in-an-undirected-graph/
 * @param graph 
 * @param directed 
 * @param node 
 * @return [{[key: string]: INode}] 返回所有的base cycle
 */
export const detectAllUndirectedCycle = (graph: IGraph, mustInclude?: INode) => {
  const color = {}
  const allCycles = []
  const parent = {}
  const mark = []
  let cycleIdx = 0 // cycle的编号
  const nodes = graph.getNodes()

  const getCycle = (curNode: INode, prevNode: INode) => {
    // already completely visited
    let curNodeId = curNode.getID()
    let prevNodeId = prevNode.getID()
    let cyclePath = new Set()
    if (color[curNodeId] === 2) return

    // seen but not completely visited: cycle detected
    if (color[curNodeId] === 1) {
      cycleIdx += 1
      let tmpCur = prevNode
      let tmpCurId = prevNodeId
      mark[tmpCurId] = cycleIdx
      cyclePath.add(tmpCur)

      // backtrack
      while (tmpCurId !== curNodeId) {
        tmpCur = parent[tmpCurId]
        tmpCurId = tmpCur.getID()
        mark[tmpCurId] = cycleIdx
        cyclePath.add(tmpCur)
      }

      if (!mustInclude || (mustInclude && cyclePath.has(mustInclude))) {
        const cyclePathList: INode[] = Array.from(cyclePath) as INode[]
        const cycle = {}
        for (let i = 1; i < cyclePathList.length; i += 1) {
          cycle[cyclePathList[i - 1].getID()] = cyclePathList[i]
        }
        if (cyclePathList.length) cycle[cyclePathList[cyclePathList.length - 1].getID()] = cyclePathList[0]
        allCycles.push(cycle)
      }
      return
    }

    parent[curNodeId] = prevNode
    color[curNodeId] = 1

    // dfs
    const neighbors = curNode.getNeighbors()
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i]
      if (neighbor === prevNode) continue

      // 处理自环情况
      if (neighbor === curNode) {
        allCycles.push({ [curNode.getID()]: curNode })
        continue
      }
      getCycle(neighbor, curNode)
    }
    color[curNodeId] = 2
  }

  if (nodes.length) {
    for (let neighbor of nodes[0].getNeighbors()) {
      getCycle(neighbor, nodes[0])
    }
  }
  return allCycles
}

/**
 * Johnson's algorithm, 时间复杂度 O((V + E)(C + 1))$ and space bounded by O(V + E)
 * refer: https://www.cs.tufts.edu/comp/150GA/homeworks/hw1/Johnson%2075.PDF
 * refer: https://networkx.github.io/documentation/stable/_modules/networkx/algorithms/cycles.html#simple_cycles 
 * @param graph 
 * @param node 
 * @return [{[key: string]: INode}] 返回所有的“simple cycles”
 */
export const detectAllDirectedCycle = (graph: IGraph, mustInclude?: INode) => {
  const path = [] // stack of nodes in current path
  const blocked = new Set()
  const B = [] // remember portions of the graph that yield no elementary circuit
  const allCycles = []

  // 辅助函数： unblock all blocked nodes
  const unblock = (thisNode) => {
    const stack = [thisNode]
    while (stack.length > 0) {
      const node = stack.pop()
      if (blocked.has(node)) {
        blocked.delete(node)
        B[node.get('id')].forEach(node => {
          stack.push(node)
        })
        B[node.get('id')].clear()
      }
    }
  }

  const circuit = (node, start, adjList) => {
    let closed = false; // whether a path is closed
    path.push(node)
    blocked.add(node)

    const neighbors = adjList[node.getID()]
    for (let i = 0; i < neighbors.length; i += 1) {
      const neighbor = idx2Node[neighbors[i]]
      if (neighbor === start) {
        const cycle = {}
        for (let i = 1; i < path.length; i += 1) {
          cycle[path[i - 1].getID()] = path[i]
        }
        if (path.length) cycle[path[path.length - 1].getID()] = path[0]
        allCycles.push(cycle)
        closed = true
      } else if (!blocked.has(neighbor)) {
        if (circuit(neighbor, start, adjList)) {
          closed = true
        }
      }
    }

    if (closed) {
      unblock(node)
    } else {
      for (let i = 0; i < neighbors.length; i += 1) {
        const neighbor = idx2Node[neighbors[i]]
        if (!B[neighbor.get('id')].has(node)) {
          B[neighbor.get('id')].add(node)
        }
      }
    }
    path.pop()
    return closed
  }

  const nodes = graph.getNodes()
  const node2Idx = {}
  const idx2Node = {}

  // Johnson's algorithm 要求给节点赋顺序，这里按节点在数组中的顺序
  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i]
    node2Idx[node.getID()] = i
    idx2Node[i] = node
  }
  // 如果有指定的节点，则包含将指定节点和首位节点交换位置
  if (mustInclude) {
    node2Idx[nodes[0].getID()] = node2Idx[mustInclude.getID()]
    node2Idx[mustInclude.getID()] = 0
    idx2Node[0] = mustInclude
    idx2Node[node2Idx[nodes[0].getID()]] = nodes[0]
  }


  // 返回 节点顺序 >= nodeOrder 的强连通分量的adjList
  const getMinComponentAdj = (components) => {
    let minCompIdx;
    let minIdx = Infinity;

    // Find least component and the lowest node
    for (let i = 0; i < components.length; i += 1) {
      const comp = components[i];
      for (let j = 0; j < comp.length; j++) {
        const nodeIdx = node2Idx[comp[j].getID()]
        if (nodeIdx < minIdx) {
          minIdx = nodeIdx
          minCompIdx = i
        }
      }
    }

    const component = components[minCompIdx]
    const adjList = []
    for (let i = 0; i < component.length; i += 1) {
      const node = component[i]
      adjList[node.getID()] = []
      for (let neighbor of node.getNeighbors('target').filter(n => component.indexOf(n) > -1)) {
        // 对自环情况 (点连向自身) 特殊处理：记录自环，但不加入adjList
        if (neighbor === node) {
          allCycles.push({ [node.getID()]: node })
        } else {
          adjList[node.getID()].push(node2Idx[neighbor.getID()])
        }
      }
    }

    return {
      component,
      adjList,
      minIdx
    }
  }

  let nodeIdx = 0
  while (nodeIdx < nodes.length) {
    const subgraphNodes = nodes.filter(n => node2Idx[n.getID()] >= nodeIdx)
    const sccs = detectStrongConnectComponents(subgraphNodes).filter(component => component.length > 1)
    if (sccs.length === 0) break

    const scc = getMinComponentAdj(sccs)
    const { minIdx, adjList, component } = scc
    if (component.length > 1) {
      component.forEach(node => {
        B[node.get('id')] = new Set()
      })
      const startNode = idx2Node[minIdx]
      circuit(startNode, startNode, adjList)
      if (mustInclude && mustInclude === startNode) return allCycles
      nodeIdx = minIdx + 1
    } else {
      break
    }
  }
  return allCycles
}

/**
 * 查找图中所有满足要求的圈
 * @param graph 
 * @param directed 是否为有向图
 * @param node 圈中需要包含的节点，若不指定则返回所有圈
 * @return [{[key: string]: Node}] 包含所有环的数组，每个环用一个Object表示，其中key为节点id，value为该节点在环中指向的下一个节点
 */
export const detectAllCycles = (graph: IGraph, directed?: boolean, node?: INode) => {
  if (directed === undefined) {
    directed = graph.get('directed')
  }
  if (directed) return detectAllDirectedCycle(graph, node)
  else return detectAllUndirectedCycle(graph, node)
}

export default detectDirectedCycle
