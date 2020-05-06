import GraphVertex from './GraphVertex'
export default class GraphEdge {
  public startVertex: GraphVertex
  public endVertex: GraphVertex
  public weight: number

  constructor(startVertex: GraphVertex, endVertex: GraphVertex, weight: number = 0) {
    this.startVertex = startVertex
    this.endVertex = endVertex
    this.weight = weight
  }

  /**
   * 获取边的唯一标识
   */
  getKey() {
    const startVertexKey = this.startVertex.getKey()
    const endVertexKey = this.endVertex.getKey()

    return `${startVertexKey}_${endVertexKey}`
  }

  /**
   * 交换起始节点
   */
  reverse() {
    const tmp = this.startVertex
    this.startVertex = this.endVertex
    this.endVertex = tmp

    return this
  }

  toString() {
    return this.getKey()
  }
}