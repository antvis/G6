import dfs from './dfs'
import { IAlgorithmCallbacks } from '../types'
import { IGraph } from '../interface/graph';
import { INode } from '../interface/item';
import getConnectedComponents, { detectStrongConnectComponents } from './connected-component'

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
 * refer: https://www.codeproject.com/Articles/1158232/Enumerating-All-Cycles-in-an-Undirected-Graph
 * @param graph 
 * @param nodeIds 节点 ID 的数组
 * @param include 包含或排除指定的节点
 * @return [{[key: string]: INode}] 返回一组base cycles
 */
export const detectAllUndirectedCycle = (graph: IGraph, nodeIds?: string[], include = true) => {
  const allCycles = []
  const components = getConnectedComponents(graph, false)

  // loop through all connected components
  for (let component of components) {
    if (!component.length) continue;
    const root = component[0]
    const rootId = root.get('id')

    const stack = [root]
    const parent = { [rootId]: root }
    const used = { [rootId]: new Set() }

    // walk a spanning tree to find cycles
    while (stack.length > 0) {
      const curNode = stack.pop()
      const curNodeId = curNode.get('id')
      const neighbors = curNode.getNeighbors()
      for (let i = 0; i < neighbors.length; i += 1) {
        const neighbor = neighbors[i]
        const neighborId = neighbor.get('id')
        if (!(neighborId in used)) { // visit a new node
          parent[neighborId] = curNode
          stack.push(neighbor)
          used[neighborId] = new Set([curNode])
        } else if (neighborId === curNodeId) {// 自环
          allCycles.push({ [neighbor.getID()]: curNode })
        } else if (!used[curNodeId].has(neighbor)) { // a cycle found
          let cycleValid = true
          const cyclePath = [neighbor, curNode]
          let p = parent[curNodeId]
          while (used[neighborId].size && !used[neighborId].has(p)) {
            cyclePath.push(p)
            p = parent[p.getID()]
          }
          cyclePath.push(p)

          if (nodeIds && include) { // 如果有指定包含的节点
            cycleValid = false
            if (cyclePath.findIndex(node => nodeIds.indexOf(node.get('id')) > -1) > -1) {
              cycleValid = true
            }
          } else if (nodeIds && !include) { // 如果有指定不包含的节点
            if (cyclePath.findIndex(node => nodeIds.indexOf(node.get('id')) > -1) > -1) {
              cycleValid = false
            }
          }

          // 把 node list 形式转换为 cycle 的格式
          if (cycleValid) {
            const cycle = {}
            for (let i = 1; i < cyclePath.length; i += 1) {
              cycle[cyclePath[i - 1].getID()] = cyclePath[i]
            }
            if (cyclePath.length) cycle[cyclePath[cyclePath.length - 1].getID()] = cyclePath[0]
            allCycles.push(cycle)
          }

          used[neighborId].add(curNode)
        }
      }
    }
  }

  return allCycles
}

/**
 * Johnson's algorithm, 时间复杂度 O((V + E)(C + 1))$ and space bounded by O(V + E)
 * refer: https://www.cs.tufts.edu/comp/150GA/homeworks/hw1/Johnson%2075.PDF
 * refer: https://networkx.github.io/documentation/stable/_modules/networkx/algorithms/cycles.html#simple_cycles 
 * @param graph 
 * @param nodeIds 节点 ID 的数组
 * @param include 包含或排除指定的节点 
 * @return [{[key: string]: INode}] 返回所有的“simple cycles”
 */
export const detectAllDirectedCycle = (graph: IGraph, nodeIds?: string[], include = true) => {
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
    if (nodeIds && include === false && nodeIds.indexOf(node.get('id')) > -1) return closed
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

  // Johnson's algorithm 要求给节点赋顺序，先按节点在数组中的顺序
  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i]
    const nodeId = node.getID()
    node2Idx[nodeId] = i
    idx2Node[i] = node
  }
  // 如果有指定包含的节点，则把指定节点排序在前，以便提早结束搜索
  if (nodeIds && include) {
    for (let i = 0; i < nodeIds.length; i++) {
      const nodeId = nodeIds[i];
      node2Idx[nodes[i].getID()] = node2Idx[nodeId]
      node2Idx[nodeId] = 0
      idx2Node[0] = graph.findById(nodeId)
      idx2Node[node2Idx[nodes[i].getID()]] = nodes[i]
    }
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
        if (neighbor === node && !(include === false && nodeIds.indexOf(node.getId()) > -1)) {
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
      // startNode 不在指定要包含的节点中，提前结束搜索
      if (nodeIds && include && nodeIds.indexOf(startNode.get('id')) === -1) return allCycles
      circuit(startNode, startNode, adjList)
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
 * @param nodeIds 节点 ID 的数组，若不指定，则返回图中所有的圈
 * @param include 包含或排除指定的节点 
 * @return [{[key: string]: Node}] 包含所有环的数组，每个环用一个Object表示，其中key为节点id，value为该节点在环中指向的下一个节点
 */
export const detectAllCycles = (graph: IGraph, directed?: boolean, nodeIds?: string[], include = true) => {
  if (directed === undefined) {
    directed = graph.get('directed')
  }
  if (directed) return detectAllDirectedCycle(graph, nodeIds, include)
  else return detectAllUndirectedCycle(graph, nodeIds, include)
}

export default detectDirectedCycle
