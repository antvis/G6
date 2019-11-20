/**
 * @fileOverview random layout
 * @author shiwu.wyy@antfin.com
 */

const Layout = require('./layout');
const Util = require('../util/layout');
const Numeric = require('numericjs');

/**
 * mds 布局
 */
Layout.registerLayout('mds', {
  getDefaultCfg() {
    return {
      center: [ 0, 0 ],           // 布局中心
      linkDistance: 50            // 默认边长度
    };
  },
  /**
   * 执行布局
   */
  execute() {
    const self = this;
    const nodes = self.nodes;
    const edges = self.edges;
    const center = self.center;
    if (nodes.length === 0) return;
    else if (nodes.length === 1) {
      nodes[0].x = center[0];
      nodes[0].y = center[1];
    }
    const linkDistance = self.linkDistance;
    // the graph-theoretic distance (shortest path distance) matrix
    const adjMatrix = Util.getAdjMatrix({ nodes, edges }, false);
    const distances = Util.floydWarshall(adjMatrix);
    self.handleInfinity(distances);
    self.distances = distances;

    // scale the ideal edge length acoording to linkDistance
    const scaledD = Util.scaleMatrix(distances, linkDistance);
    self.scaledDistances = scaledD;

    // get positions by MDS
    const positions = self.runMDS();
    self.positions = positions;
    positions.forEach((p, i) => {
      nodes[i].x = p[0] + center[0];
      nodes[i].y = p[1] + center[1];
    });
  },
  /**
   * mds 算法
   * @return {array} positions 计算后的节点位置数组
   */
  runMDS() {
    const self = this;
    const dimension = 2;
    const distances = self.scaledDistances;
    // square distances
    const M = Numeric.mul(-0.5, Numeric.pow(distances, 2));
    // double centre the rows/columns
    function mean(A) { return Numeric.div(Numeric.add.apply(null, A), A.length); }
    const rowMeans = mean(M),
      colMeans = mean(Numeric.transpose(M)),
      totalMean = mean(rowMeans);
    for (let i = 0; i < M.length; ++i) {
      for (let j = 0; j < M[0].length; ++j) {
        M[i][j] += totalMean - rowMeans[i] - colMeans[j];
      }
    }
    // take the SVD of the double centred matrix, and return the
    // points from it
    const ret = Numeric.svd(M);
    const eigenValues = Numeric.sqrt(ret.S);
    return ret.U.map(function(row) {
      return Numeric.mul(row, eigenValues).splice(0, dimension);
    });
  },
  handleInfinity(distances) {
    let maxDistance = -999999;
    distances.forEach(row => {
      row.forEach(value => {
        if (value === Infinity) {
          return;
        }
        if (maxDistance < value) {
          maxDistance = value;
        }
      });
    });
    distances.forEach((row, i) => {
      row.forEach((value, j) => {
        if (value === Infinity) {
          distances[i][j] = maxDistance;
        }
      });
    });
  }
});
