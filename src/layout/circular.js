/**
 * @fileOverview random layout
 * @author shiwu.wyy@antfin.com
 */

const Layout = require('./layout');

function getDegree(n, nodeMap, edges) {
  const degrees = [];
  for (let i = 0; i < n; i++) {
    degrees[i] = 0;
  }
  edges.forEach(e => {
    degrees[nodeMap.get(e.source)] += 1;
    degrees[nodeMap.get(e.target)] += 1;
  });
  return degrees;
}

function initHierarchy(nodes, edges, nodeMap, directed) {
  nodes.forEach((n, i) => {
    nodes[i].children = [];
    nodes[i].parent = [];
  });
  if (directed) {
    edges.forEach(e => {
      const sourceIdx = nodeMap.get(e.source);
      const targetIdx = nodeMap.get(e.target);
      nodes[sourceIdx].children.push(nodes[targetIdx]);
      nodes[targetIdx].parent.push(nodes[sourceIdx]);
    });
  } else {
    edges.forEach(e => {
      const sourceIdx = nodeMap.get(e.source);
      const targetIdx = nodeMap.get(e.target);
      nodes[sourceIdx].children.push(nodes[targetIdx]);
      nodes[targetIdx].children.push(nodes[sourceIdx]);
    });
  }
}

function connect(a, b, edges) {
  const m = edges.length;
  for (let i = 0; i < m; i++) {
    if ((a.id === edges[i].source && b.id === edges[i].target)
    || (b.id === edges[i].source && a.id === edges[i].target)) {
      return true;
    }
  }
  return false;
}

function compareDegree(a, b) {
  if (a.degree < b.degree) {
    return -1;
  }
  if (a.degree > b.degree) {
    return 1;
  }
  return 0;
}


/**
 * 圆形布局
 */
Layout.registerLayout('circular', {
  getDefaultCfg() {
    return {
      center: [ 0, 0 ],           // 布局中心
      radius: null,               // 默认固定半径，若设置了 radius，则 startRadius 与 endRadius 不起效
      startRadius: null,          // 默认起始半径
      endRadius: null,            // 默认终止半径
      startAngle: 0,              // 默认起始角度
      endAngle: 2 * Math.PI,      // 默认终止角度
      clockwise: true,            // 是否顺时针
      divisions: 1,               // 节点在环上分成段数（几个段将均匀分布），在 endRadius - startRadius != 0 时生效
      ordering: null,             // 节点在环上排序的依据。可选: 'topology', 'degree', 'null'
      angleRatio: 1               // how many 2*pi from first to last nodes
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

    let radius = self.radius;
    let startRadius = self.startRadius;
    let endRadius = self.endRadius;
    const divisions = self.divisions;
    const startAngle = self.startAngle;
    const endAngle = self.endAngle;
    const angleStep = (endAngle - startAngle) / n;
    // layout
    const nodeMap = new Map();
    nodes.forEach((node, i) => {
      nodeMap.set(node.id, i);
    });
    self.nodeMap = nodeMap;
    const degrees = getDegree(nodes.length, nodeMap, edges);
    self.degrees = degrees;

    let width = self.width;
    if (!width && typeof window !== 'undefined') {
      width = window.innerWidth;
    }
    let height = self.height;
    if (!height && typeof height !== 'undefined') {
      height = window.innerHeight;
    }
    if (!radius && !startRadius && !endRadius) {
      radius = height > width ? width / 2 : height / 2;
    } else if (!startRadius && endRadius) {
      startRadius = endRadius;
    } else if (startRadius && !endRadius) {
      endRadius = startRadius;
    }
    const angleRatio = self.angleRatio;
    const astep = angleStep * angleRatio;
    self.astep = astep;

    const ordering = self.ordering;
    let layoutNodes = [];
    if (ordering === 'topology') {
      // layout according to the topology
      layoutNodes = self.topologyOrdering();
    } else if (ordering === 'degree') {
      // layout according to the descent order of degrees
      layoutNodes = self.degreeOrdering();
    } else {
      // layout according to the original order in the data.nodes
      layoutNodes = nodes;
    }

    const clockwise = self.clockwise;
    const divN = Math.ceil(n / divisions); // node number in each division
    for (let i = 0; i < n; ++i) {
      let r = radius;
      if (!r) {
        r = startRadius + (i * (endRadius - startRadius)) / (n - 1);
      }
      let angle = startAngle + (i % divN) * astep
                 + ((2 * Math.PI) / divisions) * Math.floor(i / divN);
      if (!clockwise) {
        angle = endAngle - (i % divN) * astep
        - ((2 * Math.PI) / divisions) * Math.floor(i / divN);
      }
      layoutNodes[i].x = center[0] + Math.cos(angle) * r;
      layoutNodes[i].y = center[1] + Math.sin(angle) * r;
      layoutNodes[i].weight = degrees[i];
    }
  },
  /**
   * 根据节点的拓扑结构排序
   * @return {array} orderedNodes 排序后的结果
   */
  topologyOrdering() {
    const self = this;
    const degrees = self.degrees;
    const edges = self.edges;
    const nodes = self.nodes;
    const nodeMap = self.nodeMap;
    const orderedNodes = [ nodes[0] ];
    const pickFlags = [];
    const n = nodes.length;
    pickFlags[0] = true;
    initHierarchy(nodes, edges, nodeMap, false);
    let k = 0;
    nodes.forEach((node, i) => {
      if (i === 0) return;
      else if ((i === n - 1 || degrees[i] !== degrees[i + 1]
        || connect(orderedNodes[k], node, edges)) && pickFlags[i] !== true) {
        orderedNodes.push(node);
        pickFlags[i] = true;
        k++;
      } else {
        const children = orderedNodes[k].children;
        let foundChild = false;
        for (let j = 0; j < children.length; ++j) {
          const childIdx = nodeMap.get(children[j].id);
          if (degrees[childIdx] === degrees[i] && pickFlags[childIdx] !== true) {
            orderedNodes.push(nodes[childIdx]);
            pickFlags[childIdx] = true;
            foundChild = true;
            break;
          }
        }
        let ii = 0;
        while (!foundChild) {
          if (!pickFlags[ii]) {
            orderedNodes.push(nodes[ii]);
            pickFlags[ii] = true;
            foundChild = true;
          }
          ii++;
          if (ii === n) break;
        }
      }
    });
    return orderedNodes;
  },
  /**
   * 根据节点度数大小排序
   * @return {array} orderedNodes 排序后的结果
   */
  degreeOrdering() {
    const self = this;
    const nodes = self.nodes;
    const orderedNodes = [];
    const degrees = self.degrees;
    nodes.forEach((node, i) => {
      node.degree = degrees[i];
      orderedNodes.push(node);
    });
    orderedNodes.sort(compareDegree);
    return orderedNodes;
  }
});
