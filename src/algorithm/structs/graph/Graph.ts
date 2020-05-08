import GraphVertex from "./GraphVertex";
import GraphEdge from "./GraphEdge";

export default class Graph {
  private vertices: {
    [key: string]: GraphVertex
  }
  private edges: {
    [key: string]: GraphEdge
  }
  private isDirected: boolean

  constructor(isDirected = false) {
    this.vertices = {}
    this.edges = {}
    this.isDirected = isDirected
  }

  /**
   * 向 Graph 中加入一个 节点
   * @param newVertex 新节点
   */
  addVertex(newVertex: GraphVertex) {
    this.vertices[newVertex.getKey()] = newVertex

    return this
  }

  /**
   * 根据 vertex ID 查找节点
   * @param vertexKey vertex 唯一标识
   */
  getVertexByKey(vertexKey: string) {
    return this.vertices[vertexKey]
  }

  /**
   * 获取节点的所有邻居
   * @param vertex 
   */
  getNeighbors(vertex: GraphVertex) {
    return vertex.getNeighbors()
  }

  /**
   * 获取所有的节点
   */
  getAllVertices(): GraphVertex[] {
    return Object.values(this.vertices)
  }

  /**
   * 获取所有的边
   */
  getAllEdges(): GraphEdge[] {
    return Object.values(this.edges)
  }

  /**
   * 添加边
   * @param edge 
   */
  addEdge(edge: GraphEdge) {
    // 查找边的起始节点
    let startVertex = this.getVertexByKey(edge.startVertex.getKey())
    let endVertex = this.getVertexByKey(edge.endVertex.getKey())

    // 如果不存在开始节点，则加入
    if (!startVertex) {
      this.addVertex(edge.startVertex)
      startVertex = this.getVertexByKey(edge.startVertex.getKey())
    }

    if (!endVertex) {
      this.addVertex(edge.endVertex)
      endVertex = this.getVertexByKey(edge.endVertex.getKey())
    }

    // 检测这条边是否已经存在了
    if (this.edges[edge.getKey()]) {
      throw new Error('Edge has already been added before')
    } else {
      this.edges[edge.getKey()] = edge
    }

    // 将边添加到节点上
    // 如果是有向图，则只需要添加到开始节点上
    startVertex.addEdge(edge)

    // 如果是无向图，则还需要添加到结束节点上
    if (!this.isDirected) {
      endVertex.addEdge(edge)
    }

    return this
  }

  /**
   * 删除指定的边
   * @param edge 
   */
  deleteEdge(edge: GraphEdge) {
    if (this.edges[edge.getKey()]) {
      delete this.edges[edge.getKey()]
    } else {
      throw new Error('Edge not found in graph')
    }

    let startVertex = this.getVertexByKey(edge.startVertex.getKey())
    let endVertex = this.getVertexByKey(edge.endVertex.getKey())

    startVertex.deleteEdge(edge)
    endVertex.deleteEdge(edge)
  }

  /**
   * 查找指定节点之间的边
   * @param startVertex 开始节点
   * @param endVertex 结束节点
   */
  findEdge(startVertex: GraphVertex, endVertex: GraphVertex) {
    const vertex = this.getVertexByKey(startVertex.getKey())

    if (!vertex) {
      return null
    }

    return vertex.findEdge(endVertex)
  }

  /**
   * 获取所有边的权重
   */
  getWeight() {
    return this.getAllEdges().reduce((weight: number, graphEdge: GraphEdge) => {
      return weight + graphEdge.weight
    }, 0)
  }

  reverse() {
    const edges = this.getAllEdges()
    edges.forEach((edge: GraphEdge) => {
      // 从 graph 和 vertex 中删除边
      this.deleteEdge(edge)

      // 交换起始节点
      edge.reverse()

      // 添加节点
      this.addEdge(edge)
    })

    return this
  }

  /**
   * 获取所有节点在图中的索引
   */
  getVerticesIndices() {
    const verticesIndices: {
      [key: string]: number
    } = {}

    const vertices = this.getAllVertices()
    vertices.forEach((vertex: GraphVertex, index: number) => {
      verticesIndices[vertex.getKey()] = index
    })

    return verticesIndices
  }

  /**
   * 获取 Graph 的邻居矩阵
   */
  getAdjacencyMatrix() {
    const vertices = this.getAllVertices()
    const verticesIndices = this.getVerticesIndices()

    // 初始化邻居矩阵
    const adjacencyMatrix = Array(vertices.length).fill(null).map(() => {
      return Array(vertices.length).fill(Infinity)
    })

    vertices.forEach((vertex: GraphVertex, vertexIndex: number) => {
      vertex.getNeighbors().forEach((neighbor: GraphVertex) => {
        const neighborIndex = verticesIndices[neighbor.getKey()]
        adjacencyMatrix[vertexIndex][neighborIndex] = this.findEdge(vertex, neighbor).weight
      })
    })

    return adjacencyMatrix
  }

  toString() {
    return Object.keys(this.vertices).toString()
  }
}
