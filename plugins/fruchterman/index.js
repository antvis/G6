const Base = require('../base');
const Util = require('@antv/g6').Util;

const SPEED_DIVISOR = 800;

class Fruchterman extends Base {
  getDefaultCfgs() {
    return {
      maxIteration: 1000,         // 停止迭代的最大迭代数
      center: [ 0, 0 ],           // 布局中心
      gravity: 10,                // 重力大小，影响图的紧凑程度
      speed: 1,                   // 速度
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
    const width = graph.get('width');
    const height = graph.get('height');

    if (nodes.length === 0) {
      return;
    } else if (nodes.length === 1) {
      nodes[0].x = center[0];
      nodes[0].y = center[1];
      return;
    }
    const positions = Util.randomInitPos(nodes.length, [ 0, width ], [ 0, height ]);
    const nodeMap = new Map();
    const nodeIndexMap = new Map();
    nodes.forEach((node, i) => {
      node.x = positions[i][0];
      node.y = positions[i][1];
      nodeMap.set(node.id, node);
      nodeIndexMap.set(node.id, i);
    });
    self.set('nodeMap', nodeMap);
    self.set('nodeIndexMap', nodeIndexMap);

    // 如果正在布局，忽略布局请求
    if (self.isTicking()) {
      return;
    }
    // layout
    self.run();

    nodes.forEach(node => {
      node.x += center[0];
      node.y += center[1];
    });
    graph.refreshPositions();
    const onLayoutEnd = self.get('onLayoutEnd');
    onLayoutEnd();
  }
  run() {
    const self = this;
    const graph = self.get('graph');
    const nodes = self.get('data').nodes;
    const edges = self.get('data').edges;
    const maxIteration = self.get('maxIteration');
    // const linkDistance = self.get('linkDistance');
    const width = graph.get('width');
    const height = graph.get('height');
    const nodeMap = self.get('nodeMap');
    const nodeIndexMap = self.get('nodeIndexMap');
    const maxDisplace = width / 10;
    const k = Math.sqrt(width * height / (nodes.length + 1));
    const gravity = self.get('gravity');
    const speed = self.get('speed');
    for (let i = 0; i < maxIteration; i++) {
      const disp = [];
      nodes.forEach((n, i) => {
        disp[i] = { x: 0, y: 0 };
      });
      self.getDisp(nodes, edges, nodeMap, nodeIndexMap, disp, k);

      // gravity
      nodes.forEach((n, i) => {
        const distLength = Math.sqrt(disp[i].x * disp[i].x + disp[i].y * disp[i].y);
        const gravityForce = 0.01 * k * gravity * distLength;
        disp[i].x -= gravityForce * n.x / distLength;
        disp[i].y -= gravityForce * n.y / distLength;
      });
    // speed
      nodes.forEach((n, i) => {
        disp[i].dx *= speed / SPEED_DIVISOR;
        disp[i].dy *= speed / SPEED_DIVISOR;
      });

      // move
      nodes.forEach((n, i) => {
        const distLength = Math.sqrt(disp[i].x * disp[i].x + disp[i].y * disp[i].y);
        if (distLength > 0) { // && !n.isFixed()
          const limitedDist = Math.min(maxDisplace * (speed / SPEED_DIVISOR), distLength);
          n.x += disp[i].x / distLength * limitedDist;
          n.y += disp[i].y / distLength * limitedDist;
        }
      });
    }
  }
  getDisp(nodes, edges, nodeMap, nodeIndexMap, disp, k) {
    const self = this;
    self.calRepulsive(nodes, disp, k);
    self.calAttractive(edges, nodeMap, nodeIndexMap, disp, k);
  }
  calRepulsive(nodes, disp, k) {
    nodes.forEach((v, i) => {
      disp[i] = { x: 0, y: 0 };
      nodes.forEach((u, j) => {
        if (i === j) return;
        const vecx = v.x - u.x;
        const vecy = v.y - u.y;
        let vecLengthSqr = vecx * vecx + vecy * vecy;
        if (vecLengthSqr === 0) vecLengthSqr = 1;
        const common = (k * k) / vecLengthSqr;
        disp[i].x += vecx * common;
        disp[i].y += vecy * common;
      });
    });
  }
  calAttractive(edges, nodeMap, nodeIndexMap, disp, k) {
    edges.forEach(e => {
      const uIndex = nodeIndexMap.get(e.source);
      const vIndex = nodeIndexMap.get(e.target);
      const u = nodeMap.get(e.source);
      const v = nodeMap.get(e.target);
      const vecx = v.x - u.x;
      const vecy = v.y - u.y;
      const vecLength = Math.sqrt(vecx * vecx + vecy * vecy);
      const common = vecLength * vecLength / k;
      disp[vIndex].x -= vecx / vecLength * common;
      disp[vIndex].y -= vecy / vecLength * common;
      disp[uIndex].x += vecx / vecLength * common;
      disp[uIndex].y += vecy / vecLength * common;
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
}
module.exports = Fruchterman;
