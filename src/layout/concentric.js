/**
 * @fileOverview concentric layout
 * @author shiwu.wyy@antfin.com
 * this algorithm refers to <cytoscape.js> - https://github.com/cytoscape/cytoscape.js/
 */

const Layout = require('./layout');
const isString = require('@antv/util/lib/type/is-string');

function getDegree(n, nodeIdxMap, edges) {
  const degrees = [];
  for (let i = 0; i < n; i++) {
    degrees[i] = 0;
  }
  edges.forEach(e => {
    degrees[nodeIdxMap.get(e.source)] += 1;
    degrees[nodeIdxMap.get(e.target)] += 1;
  });
  return degrees;
}
/**
 * 同心圆布局
 */
Layout.registerLayout('concentric', {
  getDefaultCfg() {
    return {
      center: [ 0, 0 ],            // 布局中心
      nodeSize: 30,
      minNodeSpacing: 10,          // min spacing between outside of nodes (used for radius adjustment)
      preventOverlap: false,       // prevents node overlap, may overflow boundingBox if not enough space
      sweep: undefined,            // how many radians should be between the first and last node (defaults to full circle)
      equidistant: false,          // whether levels have an equal radial distance betwen them, may cause bounding box overflow
      startAngle: 3 / 2 * Math.PI, // where nodes start in radians
      clockwise: true,             // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
      maxLevelDiff: undefined,     // the letiation of concentric values in each level
      sortBy: 'degree'             // 根据 sortBy 指定的属性进行排布，数值高的放在中心。如果是 sortBy 则会计算节点度数，度数最高的放在中心。
    };
  },
  /**
   * 执行布局
   */
  execute() {
    const self = this;
    const nodes = self.nodes;
    const edges = self.edges;
    const n = nodes.length;
    const center = self.center;
    if (n === 0) {
      return;
    } else if (n === 1) {
      nodes[0].x = center[0];
      nodes[0].y = center[1];
      return;
    }

    const layoutNodes = [];
    let maxNodeSize;
    if (isNaN(self.nodeSize)) {
      maxNodeSize = Math.max(self.nodeSize[0], self.nodeSize[1]);
    } else {
      maxNodeSize = self.nodeSize;
    }
    nodes.forEach(node => {
      layoutNodes.push(node);
      let nodeSize;
      if (isNaN(node.size)) {
        nodeSize = Math.max(node.size[0], node.size[1]);
      } else {
        nodeSize = node.size;
      }
      maxNodeSize = Math.max(maxNodeSize, nodeSize);
    });

    let width = self.width;
    if (!width && typeof window !== 'undefined') {
      width = window.innerWidth;
    }
    let height = self.height;
    if (!height && typeof height !== 'undefined') {
      height = window.innerHeight;
    }
    self.clockwise = self.counterclockwise !== undefined ? !self.counterclockwise : self.clockwise;

    // layout
    const nodeMap = new Map();
    const nodeIdxMap = new Map();
    layoutNodes.forEach((node, i) => {
      nodeMap.set(node.id, node);
      nodeIdxMap.set(node.id, i);
    });
    self.nodeMap = nodeMap;

    // get the node degrees
    if (self.sortBy === 'degree' || !isString(self.sortBy) || layoutNodes[0][self.sortBy] === undefined) {
      self.sortBy = 'degree';
      if (isNaN(nodes[0].degree)) {
        const values = getDegree(nodes.length, nodeIdxMap, edges);
        layoutNodes.forEach((node, i) => {
          node.degree = values[i];
        });
      }
    }
    // sort nodes by value
    layoutNodes.sort((n1, n2) => {
      return n2[self.sortBy] - n1[self.sortBy];
    });

    self.maxValueNode = layoutNodes[0];

    self.maxLevelDiff = self.maxLevelDiff || self.maxValueNode[self.sortBy] / 4; // 0.5;

    // put the values into levels
    const levels = [[]];
    let currentLevel = levels[0];
    layoutNodes.forEach(node => {
      if (currentLevel.length > 0) {
        const diff = Math.abs(currentLevel[0][self.sortBy] - node[self.sortBy]);
        if (diff >= self.maxLevelDiff) {
          currentLevel = [];
          levels.push(currentLevel);
        }
      }
      currentLevel.push(node);
    });

    // create positions for levels
    let minDist = maxNodeSize + self.minNodeSpacing; // min dist between nodes
    if (!self.preventOverlap) { // then strictly constrain to bb
      const firstLvlHasMulti = levels.length > 0 && levels[0].length > 1;
      const maxR = (Math.min(self.width, self.height) / 2 - minDist);
      const rStep = maxR / (levels.length + firstLvlHasMulti ? 1 : 0);

      minDist = Math.min(minDist, rStep);
    }

    // find the metrics for each level
    let r = 0;
    levels.forEach(level => {
      const sweep = self.sweep === undefined ? 2 * Math.PI - 2 * Math.PI / level.length : self.sweep;
      const dTheta = level.dTheta = sweep / (Math.max(1, level.length - 1));

      // calculate the radius
      if (level.length > 1 && self.preventOverlap) { // but only if more than one node (can't overlap)
        const dcos = Math.cos(dTheta) - Math.cos(0);
        const dsin = Math.sin(dTheta) - Math.sin(0);
        const rMin = Math.sqrt(minDist * minDist / (dcos * dcos + dsin * dsin)); // s.t. no nodes overlapping

        r = Math.max(rMin, r);
      }
      level.r = r;
      r += minDist;
    });

    if (self.equidistant) {
      let rDeltaMax = 0;
      let r = 0;
      for (let i = 0; i < levels.length; i++) {
        const level = levels[ i ];
        const rDelta = level.r - r;
        rDeltaMax = Math.max(rDeltaMax, rDelta);
      }
      r = 0;
      levels.forEach((level, i) => {
        if (i === 0) {
          r = level.r;
        }
        level.r = r;
        r += rDeltaMax;
      });
    }

    // calculate the node positions
    levels.forEach(level => {
      const dTheta = level.dTheta;
      const r = level.r;
      level.forEach((node, j) => {
        const theta = self.startAngle + (self.clockwise ? 1 : -1) * dTheta * j;
        node.x = center[0] + r * Math.cos(theta);
        node.y = center[1] + r * Math.sin(theta);
      });
    });
  }
});
