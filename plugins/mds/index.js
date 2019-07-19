const Base = require('../base');
const Util = require('@antv/g6').Util;
const Numeric = require('numericjs');

class Mds extends Base {
  getDefaultCfgs() {
    return {
      maxIteration: null,         // 停止迭代的最大迭代数
      center: [ 0, 0 ],           // 布局中心
      linkDistance: 50,           // 默认边长度
      onLayoutEnd() {},           // 布局完成回调
      onTick() {}                 // 每一迭代布局回调
    };
  }
  init() {
    const graph = this.get('graph');
    const onTick = this.get('onTick');
    const tick = () => {
      onTick && onTick();
      graph.refreshPositions();
    };
    this.set('tick', tick);
  }
  layout(data) {
    const self = this;
    self.set('data', data);
    const graph = self.get('graph');
    const center = self.get('center');
    const nodes = data.nodes;
    if (nodes.length === 0) return;
    else if (nodes.length === 1) {
      nodes[0].x = center[0];
      nodes[0].y = center[1];
    }
    const linkDistance = self.get('linkDistance');

    // 如果正在布局，忽略布局请求
    if (self.isTicking()) {
      return;
    }
    // layout
    let focusNode = self.get('focusNode');
    if (Util.isString(focusNode)) {
      let found = false;
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].id === focusNode) {
          focusNode = nodes[i];
          self.set('focusNode', focusNode);
          found = true;
          i = nodes.length;
        }
      }
      if (!found) focusNode = null;
    }
    // default focus node
    if (!focusNode) {
      focusNode = nodes[0];
      if (!focusNode) return;
      self.set('focusNode', focusNode);
    }
    // the graph-theoretic distance (shortest path distance) matrix
    const adjMatrix = Util.getAdjMatrix(data, false);
    const D = Util.floydWarshall(adjMatrix);
    self.set('distances', D);

    // scale the ideal edge length acoording to linkDistance
    const scaledD = Util.scaleMatrix(D, linkDistance);
    self.set('scaledDistances', scaledD);

    // get positions by MDS
    const positions = self.runMDS();
    self.set('positions', positions);
    positions.forEach((p, i) => {
      nodes[i].x = p[0] + center[0];
      nodes[i].y = p[1] + center[1];
    });

    graph.refreshPositions();
    const onLayoutEnd = self.get('onLayoutEnd');
    onLayoutEnd();
  }
  updateLayout(cfg) {
    const self = this;
    const data = cfg.data;
    if (data) {
      self.set('data', data);
    }
    if (self.get('ticking')) {
      // stop layout
      self.set('ticking', false);
    }
    Object.keys(cfg).forEach(key => {
      self.set(key, cfg[key]);
    });
    self.layout(data);
  }
  runMDS() {
    const self = this;
    const dimension = 2;
    const distances = self.get('scaledDistances');

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
  }
  isTicking() {
    return this.get('ticking');
  }
  destroy() {
    if (this.get('ticking')) {
      this.getSimulation().stop();
    }
    super.destroy();
  }
}
module.exports = Mds;
