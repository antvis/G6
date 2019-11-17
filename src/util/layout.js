/**
 * @fileoverview util for layout
 * @author changzhe.zb@antfin.com
 */
const layoutUtil = {
  mix: require('@antv/util/lib/mix'),
  augment: require('@antv/util/lib/augment'),
  isString: require('@antv/util/lib/type/is-string'),
  getAdjMatrix(data, directed) {
    const nodes = data.nodes;
    const edges = data.edges;
    const matrix = [];
    // map node with index in data.nodes
    const nodeMap = new Map();
    nodes.forEach((node, i) => {
      nodeMap.set(node.id, i);
      const row = [];
      matrix.push(row);
    });

    // const n = nodes.length;
    edges.forEach(e => {
      const source = e.source;
      const target = e.target;
      const sIndex = nodeMap.get(source);
      const tIndex = nodeMap.get(target);
      matrix[sIndex][tIndex] = 1;
      if (!directed) matrix[tIndex][sIndex] = 1;
    });
    return matrix;
  },
  /**
   * Floyd Warshall algorithm for shortest path distances matrix
   * @param  {array} adjMatrix   adjacency matrix
   * @return {array} distances   shortest path distances matrix
   */
  floydWarshall(adjMatrix) {
    // initialize
    const dist = [];
    const size = adjMatrix.length;
    for (let i = 0; i < size; i += 1) {
      dist[i] = [];
      for (let j = 0; j < size; j += 1) {
        if (i === j) {
          dist[i][j] = 0;
        } else if (adjMatrix[i][j] === 0 || !adjMatrix[i][j]) {
          dist[i][j] = Infinity;
        } else {
          dist[i][j] = adjMatrix[i][j];
        }
      }
    }
    // floyd
    for (let k = 0; k < size; k += 1) {
      for (let i = 0; i < size; i += 1) {
        for (let j = 0; j < size; j += 1) {
          if (dist[i][j] > dist[i][k] + dist[k][j]) {
            dist[i][j] = dist[i][k] + dist[k][j];
          }
        }
      }
    }
    return dist;
  },

  getEDistance(p1, p2) {
    return Math.sqrt((p1[0] - p2[0]) * (p1[0] - p2[0])
    + (p1[1] - p2[1]) * (p1[1] - p2[1]));
  },

  scaleMatrix(matrix, scale) {
    const result = [];
    matrix.forEach(row => {
      const newRow = [];
      row.forEach(v => {
        newRow.push(v * scale);
      });
      result.push(newRow);
    });
    return result;
  }
};
module.exports = layoutUtil;
