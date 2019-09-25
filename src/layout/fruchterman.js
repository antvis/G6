/**
 * @fileOverview random layout
 * @author shiwu.wyy@antfin.com
 */

const Layout = require('./layout');
const Util = require('../util');

const SPEED_DIVISOR = 800;

/**
 * fruchterman 布局
 */
Layout.registerLayout('fruchterman', {
  layoutType: 'fruchterman',
  getDefaultCfg() {
    return {
      maxIteration: 1000,         // 停止迭代的最大迭代数
      center: [ 0, 0 ],           // 布局中心
      gravity: 10,                // 重力大小，影响图的紧凑程度
      speed: 1,                   // 速度
      clustering: false,          // 是否产生聚类力
      clusterGravity: 10           // 是否产生聚类力
    };
  },
  /**
   * 执行布局
   */
  excute() {
    const self = this;
    const nodes = self.nodes;
    const center = self.center;
    const width = self.width;
    const height = self.height;

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
    const hasOriPos = (nodes[0].x !== undefined && nodes[0].x !== null && !isNaN(nodes[0].x));
    nodes.forEach((node, i) => {
      if (!hasOriPos) {
        node.x = positions[i][0];
        node.y = positions[i][1];
      }
      nodeMap.set(node.id, node);
      nodeIndexMap.set(node.id, i);
    });
    self.nodeMap = nodeMap;
    self.nodeIndexMap = nodeIndexMap;
    // layout
    self.run();
    nodes.forEach(node => {
      node.x += center[0];
      node.y += center[1];
    });
  },
  run() {
    const self = this;
    const nodes = self.nodes;
    const edges = self.edges;
    const maxIteration = self.maxIteration;
    const width = self.width;
    const height = self.height;
    const nodeMap = self.nodeMap;
    const nodeIndexMap = self.nodeIndexMap;
    const maxDisplace = width / 10;
    const k = Math.sqrt(width * height / (nodes.length + 1));
    const gravity = self.gravity;
    const speed = self.speed;
    const clustering = self.clustering;
    const clusters = [];
    if (clustering) {
      nodes.forEach(n => {
        if (clusters[n.cluster] === undefined) {
          clusters[n.cluster] = {
            cx: 0,
            cy: 0,
            count: 0
          };
        }
        clusters[n.cluster].cx += n.x;
        clusters[n.cluster].cy += n.y;
        clusters[n.cluster].count++;
      });
      clusters.forEach(c => {
        c.cx /= c.count;
        c.cy /= c.count;
      });
    }
    for (let i = 0; i < maxIteration; i++) {
      const disp = [];
      nodes.forEach((n, i) => {
        disp[i] = { x: 0, y: 0 };
      });
      self.getDisp(nodes, edges, nodeMap, nodeIndexMap, disp, k);

      // gravity for clusters
      if (clustering) {
        const clusterGravity = self.clusterGravity || gravity;
        nodes.forEach((n, i) => {
          const distLength = Math.sqrt((n.x - clusters[n.cluster].cx) * (n.x - clusters[n.cluster].cx) + (n.y - clusters[n.cluster].cy) * (n.y - clusters[n.cluster].cy));
          const gravityForce = 0.1 * k * clusterGravity * distLength;
          disp[i].x -= gravityForce * (n.x - clusters[n.cluster].cx) / distLength;
          disp[i].y -= gravityForce * (n.y - clusters[n.cluster].cy) / distLength;
        });
      }

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
  },
  getDisp(nodes, edges, nodeMap, nodeIndexMap, disp, k) {
    const self = this;
    self.calRepulsive(nodes, disp, k);
    self.calAttractive(edges, nodeMap, nodeIndexMap, disp, k);
  },
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
  },
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
});
