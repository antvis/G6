/**
 * @fileOverview random layout
 * @author shiwu.wyy@antfin.com
 */

const Layout = require('./layout');

const SPEED_DIVISOR = 800;

/**
 * fruchterman 布局
 */
Layout.registerLayout('fruchterman', {
  getDefaultCfg() {
    return {
      maxIteration: 1000,         // 停止迭代的最大迭代数
      center: [ 0, 0 ],           // 布局中心
      gravity: 10,                // 重力大小，影响图的紧凑程度
      speed: 1,                   // 速度
      clustering: false,          // 是否产生聚类力
      clusterGravity: 10          // 聚类力大小
    };
  },
  /**
   * 执行布局
   */
  execute() {
    const self = this;
    const nodes = self.nodes;
    const center = self.center;

    if (nodes.length === 0) {
      return;
    } else if (nodes.length === 1) {
      nodes[0].x = center[0];
      nodes[0].y = center[1];
      return;
    }
    const nodeMap = new Map();
    const nodeIndexMap = new Map();
    nodes.forEach((node, i) => {
      nodeMap.set(node.id, node);
      nodeIndexMap.set(node.id, i);
    });
    self.nodeMap = nodeMap;
    self.nodeIndexMap = nodeIndexMap;
    // layout
    self.run();
  },
  run() {
    const self = this;
    const nodes = self.nodes;
    const edges = self.edges;
    const maxIteration = self.maxIteration;
    let width = self.width;
    if (!width && typeof window !== 'undefined') {
      width = window.innerWidth;
    }
    let height = self.height;
    if (!height && typeof height !== 'undefined') {
      height = window.innerHeight;
    }
    const center = self.center;
    const nodeMap = self.nodeMap;
    const nodeIndexMap = self.nodeIndexMap;
    const maxDisplace = width / 10;
    const k = Math.sqrt(width * height / (nodes.length + 1));
    const gravity = self.gravity;
    const speed = self.speed;
    const clustering = self.clustering;
    const clusterMap = new Map();
    if (clustering) {
      nodes.forEach(n => {
        if (clusterMap.get(n.cluster) === undefined) {
          const cluster = {
            name: n.cluster,
            cx: 0,
            cy: 0,
            count: 0
          };
          clusterMap.set(n.cluster, cluster);
        }
        const c = clusterMap.get(n.cluster);
        c.cx += n.x;
        c.cy += n.y;
        c.count++;
      });
      clusterMap.forEach(c => {
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
          const c = clusterMap.get(n.cluster);
          const distLength = Math.sqrt((n.x - c.cx) * (n.x - c.cx) + (n.y - c.cy) * (n.y - c.cy));
          const gravityForce = k * clusterGravity;
          disp[i].x -= gravityForce * (n.x - c.cx) / distLength;
          disp[i].y -= gravityForce * (n.y - c.cy) / distLength;
        });

        clusterMap.forEach(c => {
          c.cx = 0;
          c.cy = 0;
          c.count = 0;
        });
        nodes.forEach(n => {
          const c = clusterMap.get(n.cluster);
          c.cx += n.x;
          c.cy += n.y;
          c.count++;
        });
        clusterMap.forEach(c => {
          c.cx /= c.count;
          c.cy /= c.count;
        });
      }

      // gravity
      nodes.forEach((n, i) => {
        const gravityForce = 0.01 * k * gravity;
        disp[i].x -= gravityForce * (n.x - center[0]);
        disp[i].y -= gravityForce * (n.y - center[1]);
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
      if (uIndex === vIndex) return;
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
