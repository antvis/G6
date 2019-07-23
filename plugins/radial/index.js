// const Numeric = require('numericjs');
const Base = require('../base');
const Util = require('@antv/g6').Util;
const MDS = require('./mds');

function getWeightMatrix(M) {
  const rows = M.length;
  const cols = M[0].length;
  const result = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      if (M[i][j] !== 0) row.push(1 / Math.pow(M[i][j], 2));
      else row.push(0);
    }
    result.push(row);
  }
  return result;
}

function getIndexById(array, id) {
  let index = -1;
  array.forEach((a, i) => {
    if (a.id === id) {
      index = i;
      return;
    }
  });
  return index;
}

class Radial extends Base {
  getDefaultCfgs() {
    return {
      maxIteration: 1000,         // 停止迭代的最大迭代数
      focusNode: null,            // 中心点，默认为数据中第一个点
      center: [ 0, 0 ],           // 布局中心
      unitRadius: null,           // 默认边长度
      linkDistance: 50,           // 默认边长度
      animate: true,              // 插值动画效果变换节点位置
      nonOverlap: false,          // 是否防止重叠
      nodeSize: 10,               // 节点半径
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
    const nodes = data.nodes;
    const center = self.get('center');
    if (nodes.length === 0) {
      return;
    } else if (nodes.length === 1) {
      nodes[0].x = center[0];
      nodes[0].y = center[1];
      return;
    }
    const linkDistance = self.get('linkDistance');
    const unitRadius = self.get('unitRadius');

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

    // the index of the focusNode in data
    const focusIndex = getIndexById(nodes, focusNode.id);
    self.set('focusIndex', focusIndex);
    // the shortest path distance from each node to focusNode
    const focusNodeD = D[focusIndex];
    const width = graph.get('width');
    const height = graph.get('height');
    // the maxRadius of the graph
    const maxRadius = height > width ? width / 2 : height / 2;
    const maxD = Math.max(...focusNodeD);
    // the radius for each nodes away from focusNode
    const radii = [];
    focusNodeD.forEach((value, i) => {
      if (!unitRadius) radii[i] = value * maxRadius / maxD;
      else radii[i] = value * unitRadius;
    });
    self.set('radii', radii);

    const eIdealD = self.eIdealDisMatrix(D, linkDistance, radii);
    // const eIdealD = scaleMatrix(D, linkDistance);
    self.set('eIdealDistances', eIdealD);
    // the weight matrix, Wij = 1 / dij^(-2)
    const W = getWeightMatrix(eIdealD);
    self.set('weights', W);

    // the initial positions from mds
    const mds = new MDS({ distances: eIdealD, dimension: 2 });
    const positions = mds.layout();
    self.set('positions', positions);
    positions.forEach((p, i) => {
      nodes[i].x = p[0] + center[0];
      nodes[i].y = p[1] + center[1];
    });

    // move the graph to origin, centered at focusNode
    positions.forEach(p => {
      p[0] -= positions[focusIndex][0];
      p[1] -= positions[focusIndex][1];
    });
    self.run();
    // console.log('positions2', positions);

    const nonOverlap = self.get('nonOverlap');
    const nodeSize = self.get('nodeSize');
    // stagger the overlapped nodes
    if (nonOverlap) {
      let hasOverlaps = true;
      let iter = 0;
      const oMaxIter = 5;
      while (hasOverlaps && iter < oMaxIter) {
        hasOverlaps = false;
        iter++;
        positions.forEach((v, i) => {
          positions.forEach((u, j) => {
            if (i <= j) return;
            // u and j are in different circle, will not overlaps
            if (radii[i] !== radii[j]) return;
            // u has been moved
            const edis = Util.getEDistance(v, u);
            if (edis < nodeSize) { // overlapped
              hasOverlaps = true;
              // the vector focusNode -> u
              let vecx = u[0] - positions[focusIndex][0];
              let vecy = u[1] - positions[focusIndex][1];
              const length = Math.sqrt(vecx * vecx + vecy * vecy);
              vecx = (length + nodeSize) * vecx / length;
              vecy = (length + nodeSize) * vecy / length;
              u[0] = vecx + positions[focusIndex][0];
              u[1] = vecy + positions[focusIndex][1];
            }
          });
        });
      }
    }

    // move the graph to center
    positions.forEach((p, i) => {
      nodes[i].x = p[0] + center[0];
      nodes[i].y = p[1] + center[1];
    });
    graph.refreshPositions();
    const onLayoutEnd = self.get('onLayoutEnd');
    onLayoutEnd();
  }
  run() {
    const self = this;
    const maxIteration = self.get('maxIteration');
    const positions = self.get('positions');
    const W = self.get('weights');
    const eIdealDis = self.get('eIdealDistances');
    const radii = self.get('radii');
    for (let i = 0; i <= maxIteration; i++) {
      const param = i / maxIteration;
      self.oneIteration(param, positions, radii, eIdealDis, W);
    }
  }
  oneIteration(param, positions, radii, D, W) {
    const self = this;
    const vparam = 1 - param;
    const focusIndex = self.get('focusIndex');
    positions.forEach((v, i) => { // v
      const originDis = Util.getEDistance(v, [ 0, 0 ]);
      const reciODis = originDis === 0 ? 0 : 1 / originDis;
      if (i === focusIndex) return;
      let xMolecule = 0;
      let yMolecule = 0;
      let denominator = 0;
      positions.forEach((u, j) => { // u
        if (i === j) return;
        if (j === focusIndex) return;
        // the euclidean distance between v and u
        const edis = Util.getEDistance(v, u);
        const reciEdis = edis === 0 ? 0 : 1 / edis;
        const idealDis = D[j][i];
        // same for x and y
        denominator += W[i][j];
        // x
        xMolecule += W[i][j] * (u[0] + idealDis * (v[0] - u[0]) * reciEdis);
        // y
        yMolecule += W[i][j] * (u[1] + idealDis * (v[1] - u[1]) * reciEdis);
      });
      const reciR = radii[i] === 0 ? 0 : 1 / radii[i];
      denominator *= vparam;
      denominator += param * Math.pow(reciR, 2);
      // x
      xMolecule *= vparam;
      xMolecule += param * reciR * v[0] * reciODis;
      v[0] = xMolecule / denominator;
      // y
      yMolecule *= vparam;
      yMolecule += param * reciR * v[1] * reciODis;
      v[1] = yMolecule / denominator;
    });
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
  isTicking() {
    return this.get('ticking');
  }
  destroy() {
    if (this.get('ticking')) {
      this.getSimulation().stop();
    }
    super.destroy();
  }

  eIdealDisMatrix() {
    const D = this.get('distances');
    const linkDis = this.get('linkDistance');
    const radii = this.get('radii');
    const unitRadius = this.get('unitRadius');
    const result = [];
    D.forEach((row, i) => {
      const newRow = [];
      row.forEach((v, j) => {
        if (i === j) newRow.push(0);
        else if (radii[i] === radii[j]) { // i and j are on the same circle
          newRow.push(v * linkDis / (radii[i] / unitRadius));
        } else { // i and j are on different circle
          const link = (linkDis + unitRadius) / 2;
          newRow.push(v * link);
        }
      });
      result.push(newRow);
    });
    return result;
  }
}
module.exports = Radial;
