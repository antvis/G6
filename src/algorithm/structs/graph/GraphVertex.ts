import LinkedList, { LinkedListNode } from '../linked-list'
import GraphEdge from './GraphEdge';

export default class GraphVertex {
  private value: string
  private edges: LinkedList

  /**
   * 
   * @param value Vertex ID
   */
  constructor(value: string) {
    if (value === undefined) {
      throw new Error('Graph vertex must have a value')
    }

    const edgeComparator = (edgeA: GraphEdge, edgeB: GraphEdge) => {
      if (edgeA.getKey() === edgeB.getKey()) {
        return 0
      }

      return edgeA.getKey() < edgeB.getKey() ? -1 : 1
    }

    this.value = value
    this.edges = new LinkedList(edgeComparator)
  }

  /**
   * 新增指定边
   * @param edge 
   */
  addEdge(edge: GraphEdge) {
    this.edges.append(edge)

    return this
  }

  /**
   * 删除指定边
   * @param edge 
   */
  deleteEdge(edge: GraphEdge) {
    this.edges.delete(edge)
  }

  /**
   * 获取当前节点的所有邻居节点
   */
  getNeighbors() {
    const edges = this.edges.toArray()

    const neighhborsConverter = (node: LinkedListNode) => {
      return node.value.startVertex === this ? node.value.endVertex : node.value.startVertex
    }

    return edges.map(neighhborsConverter)
  }

  /**
   * 返回当前节点的所有边
   */
  getEdges() {
    return this.edges.toArray().map((node: LinkedListNode) => node.value)
  }

  /**
   * 返回当前节点的度数
   */
  getDegree() {
    return this.edges.toArray().length
  }

  /**
   * 是否有指定边
   * @param edge 
   */
  hasEdge(edge: GraphEdge) {
    const edgeNode = this.edges.find({
      callback: e => e === edge
    })

    return !!edgeNode
  }

  /**
   * 指定节点是否有邻居节点
   * @param vertex 
   */
  hasNeighbor(vertex: GraphVertex) {
    const vertexNode = this.edges.find({
      callback: (edge: GraphEdge) => edge.startVertex === vertex || edge.endVertex === vertex
    })

    return !!vertexNode
  }

  /**
   * 查找指定节点的边
   * @param vertex 
   */
  findEdge(vertex: GraphVertex) {
    const edgeFinder = (edge: GraphEdge) => {
      return edge.startVertex === vertex || edge.endVertex === vertex
    }

    const edge = this.edges.find({
      callback: edgeFinder
    })

    return edge ? edge.value : null
  }

  /**
   * 获取节点的唯一标识
   */
  getKey() {
    return this.value
  }

  /**
   * 删除所有的边
   */
  deleteAllEdges() {
    this.getEdges().forEach(edge => this.deleteEdge(edge))

    return this
  }

  toString(callback) {
    return callback ? callback(this.value) : `${this.value}`
  }
}
