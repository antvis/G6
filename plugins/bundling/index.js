const Base = require('../base');

function getEucliDis(pointA, pointB, eps) {
  const vx = pointA.x - pointB.x;
  const vy = pointA.y - pointB.y;
  if (!eps || Math.abs(vx) > eps || Math.abs(vy) > eps) {
    return Math.sqrt(vx * vx + vy * vy);
  }
  return eps;
}

function getDotProduct(ei, ej) {
  return ei.x * ej.x + ei.y * ej.y;
}

function projectPointToEdge(p, e) {
  const k = (e.source.y - e.target.y) / (e.source.x - e.target.x);
  const x = (k * k * e.source.x + k * (p.y - e.source.y) + p.x) / (k * k + 1);
  const y = k * (x - e.source.x) + e.source.y;
  return { x, y };
}

class Bundling extends Base {
  getDefaultCfgs() {
    return {
      edgeBundles: [],                 // |edges| arrays, each one stores the related edges' id
      edgePoints: [],                  // |edges| * divisions edge points
      K: 0.1,                          // 边的强度
      lambda: 0.1,                     // 初始步长
      divisions: 1,                    // 初始切割点数
      divRate: 2,                      // subdivision rate increase
      cycles: 6,                       // number of cycles to perform
      iterations: 90,                  // 每个 cycle 初始迭代次数
      iterRate: 0.6666667,             // 迭代下降率
      bundleThreshold: 0.6,
      eps: 1e-6,
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
  bundling(data) {
    const self = this;
    self.set('data', data);
    // 如果正在布局，忽略布局请求
    if (self.isTicking()) {
      return;
    }
    const edges = data.edges;
    const nodes = data.nodes;
    const nodeIdMap = new Map();
    let error = false;
    nodes.forEach(node => {
      if (node.x === null || !node.y === null || node.x === undefined || !node.y === undefined) {
        error = true;
      }
      nodeIdMap.set(node.id, node);
    });
    if (error) throw new Error('please layout the graph or assign x and y for nodes first');
    self.set('nodeIdMap', nodeIdMap);

    // subdivide each edges
    let divisions = self.get('divisions');
    const divRate = self.get('divRate');
    let edgePoints = self.divideEdges(divisions);
    self.set('edgePoints', edgePoints);

    // compute the bundles
    const edgeBundles = self.getEdgeBundles();
    self.set('edgeBundles', edgeBundles);

    // iterations
    const C = self.get('cycles');
    let iterations = self.get('iterations');
    const iterRate = self.get('iterRate');
    let lambda = self.get('lambda');
    for (let i = 0; i < C; i++) {
      for (let j = 0; j < iterations; j++) {
        const forces = [];
        edges.forEach((e, k) => {
          if (e.source === e.target) return;
          const source = nodeIdMap.get(e.source);
          const target = nodeIdMap.get(e.target);
          forces[k] = self.getEdgeForces({ source, target }, k, divisions, lambda);
          for (let p = 0; p < divisions + 1; p++) {
            edgePoints[k][p].x += forces[k][p].x;
            edgePoints[k][p].y += forces[k][p].y;
          }
        });
      }
      // parameters for nex cycle
      lambda = lambda / 2;
      divisions *= divRate;
      iterations *= iterRate;
      edgePoints = self.divideEdges(divisions);
      self.set('edgePoints', edgePoints);
    }

    // change the edges according to edgePoints
    edges.forEach((e, i) => {
      if (e.source === e.target) return;
      e.shape = 'polyline';
      e.controlPoints = edgePoints[i].slice(1, edgePoints[i].length - 1);
    });
    const graph = self.get('graph');
    graph.refresh();
  }
  updateBundling(cfg) {
    const self = this;
    const data = cfg.data;
    if (data) {
      self.set('data', data);
    }
    if (self.get('ticking')) {
      self.set('ticking', false);
    }
    Object.keys(cfg).forEach(key => {
      self.set(key, cfg[key]);
    });
    if (cfg.onTick) {
      self.set('tick', () => {
        cfg.onTick();
        self.graph.refresh();
      });
    }
    self.bundling(data);
  }
  divideEdges(divisions) {
    const self = this;
    const edges = self.get('data').edges;
    const nodeIdMap = self.get('nodeIdMap');
    let edgePoints = self.get('edgePoints');
    if (!edgePoints || edgePoints === undefined) edgePoints = [];
    edges.forEach((edge, i) => {
      if (!edgePoints[i] || edgePoints[i] === undefined) edgePoints[i] = [];
      const source = nodeIdMap.get(edge.source);
      const target = nodeIdMap.get(edge.target);
      if (divisions === 1) {
        edgePoints[i].push({ x: source.x, y: source.y }); // source
        edgePoints[i].push({
          x: 0.5 * (source.x + target.x),
          y: 0.5 * (source.y + target.y) }); // mid
        edgePoints[i].push({ x: target.x, y: target.y }); // target
      } else {
        let edgeLength = 0;
        if (!edgePoints[i] || edgePoints[i] === []) { // it is a straight line
          edgeLength = getEucliDis(source, target);
        } else edgeLength = self.getEdgeLength(edgePoints[i]);
        const divisionLength = edgeLength / (divisions + 1);
        let currentDivisonLength = divisionLength;
        const newEdgePoints = [{ x: source.x, y: source.y }]; // source
        edgePoints[i].forEach((ep, j) => {
          if (j === 0) return;
          let oriDivisionLength = getEucliDis(ep, edgePoints[i][j - 1]);
          while (oriDivisionLength > currentDivisonLength) {
            const ratio = currentDivisonLength / oriDivisionLength;
            const edgePoint = { x: edgePoints[i][j - 1].x, y: edgePoints[i][j - 1].y };
            edgePoint.x += ratio * (ep.x - edgePoints[i][j - 1].x);
            edgePoint.y += ratio * (ep.y - edgePoints[i][j - 1].y);
            newEdgePoints.push(edgePoint);
            oriDivisionLength -= currentDivisonLength;
            currentDivisonLength = divisionLength;
          }
          currentDivisonLength -= oriDivisionLength;
        });
        newEdgePoints.push({ x: target.x, y: target.y }); // target
        edgePoints[i] = newEdgePoints;
      }
    });
    return edgePoints;
  }
  getEdgeLength(points) {
    let length = 0;
    points.forEach((p, i) => {
      if (i === 0) return;
      length += getEucliDis(p, points[i - 1]);
    });
    return length;
  }
  getEdgeBundles() {
    const self = this;
    const data = self.get('data');
    const edges = data.edges;
    const bundleThreshold = self.get('bundleThreshold');
    const nodeIdMap = self.get('nodeIdMap');
    let edgeBundles = self.get('edgeBundles');
    if (!edgeBundles) edgeBundles = [];
    edges.forEach((e, i) => {
      if (!edgeBundles[i] || edgeBundles[i] === undefined) edgeBundles[i] = [];
    });
    edges.forEach((ei, i) => {
      const iSource = nodeIdMap.get(ei.source);
      const iTarget = nodeIdMap.get(ei.target);
      edges.forEach((ej, j) => {
        if (j <= i) return;
        const jSource = nodeIdMap.get(ej.source);
        const jTarget = nodeIdMap.get(ej.target);
        const score = self.getBundleScore(
          { source: iSource, target: iTarget },
          { source: jSource, target: jTarget }
        );
        if (score >= bundleThreshold) {
          edgeBundles[i].push(j);
          edgeBundles[j].push(i);
        }
      });
    });
    return edgeBundles;
  }
  getBundleScore(ei, ej) {
    const self = this;
    ei.vx = ei.target.x - ei.source.x;
    ei.vy = ei.target.y - ei.source.y;
    ej.vx = ej.target.x - ej.source.x;
    ej.vy = ej.target.y - ej.source.y;
    ei.length = getEucliDis({ x: ei.source.x, y: ei.source.y },
      { x: ei.target.x, y: ei.target.y });
    ej.length = getEucliDis({ x: ej.source.x, y: ej.source.y },
      { x: ej.target.x, y: ej.target.y });
    // angle score
    const aScore = self.getAngleScore(ei, ej);
    // scale score
    const sScore = self.getScaleScore(ei, ej);
    // position score
    const pScore = self.getPosisionScore(ei, ej);
    // visibility socre
    const vScore = self.getVisibilityScore(ei, ej);

    return aScore * sScore * pScore * vScore;
  }
  getAngleScore(ei, ej) {
    const dotProduct = getDotProduct({ x: ei.vx, y: ei.vy }, { x: ej.vx, y: ej.vy });
    return dotProduct / (ei.length * ej.length);
  }
  getScaleScore(ei, ej) {
    const aLength = (ei.length + ej.length) / 2;
    const score = 2 / (aLength / Math.min(ei.length, ej.length) + Math.max(ei.length, ej.length) / aLength);
    return score;
  }
  getPosisionScore(ei, ej) {
    const aLength = (ei.length + ej.length) / 2;
    const iMid = {
      x: (ei.source.x + ei.target.x) / 2,
      y: (ei.source.y + ei.target.y) / 2
    };
    const jMid = {
      x: (ej.source.x + ej.target.x) / 2,
      y: (ej.source.y + ej.target.y) / 2
    };
    const distance = getEucliDis(iMid, jMid);
    return aLength / (aLength + distance);
  }
  getVisibilityScore(ei, ej) {
    const self = this;
    const vij = self.getEdgeVisibility(ei, ej);
    const vji = self.getEdgeVisibility(ej, ei);
    return vij < vji ? vij : vji;
  }
  getEdgeVisibility(ei, ej) {
    const ps = projectPointToEdge(ej.source, ei);
    const pt = projectPointToEdge(ej.target, ei);
    const pMid = { x: (ps.x + pt.x) / 2, y: (ps.y + pt.y) / 2 };
    const iMid = {
      x: (ei.source.x + ei.target.x) / 2,
      y: (ei.source.y + ei.target.y) / 2
    };
    return Math.max(0, 1 - 2 * getEucliDis(pMid, iMid) / getEucliDis(ps, pt));
  }
  getEdgeForces(e, eidx, divisions, lambda) {
    const self = this;
    const edgePoints = self.get('edgePoints');
    const K = self.get('K');
    const kp = K / (getEucliDis(e.source, e.target) * (divisions + 1));
    const edgePointForces = [{ x: 0, y: 0 }];
    for (let i = 1; i < divisions; i++) {
      const force = { x: 0, y: 0 };
      const spring = self.getSpringForce(
        { pre: edgePoints[eidx][i - 1],
          cur: edgePoints[eidx][i],
          next: edgePoints[eidx][i + 1] },
        kp);
      const electrostatic = self.getElectrostaticForce(i, eidx);
      force.x = lambda * (spring.x + electrostatic.x);
      force.y = lambda * (spring.y + electrostatic.y);
      edgePointForces.push(force);
    }
    edgePointForces.push({ x: 0, y: 0 });
    return edgePointForces;
  }
  getSpringForce(divisions, kp) {
    let x = divisions.pre.x + divisions.next.x - 2 * divisions.cur.x;
    let y = divisions.pre.y + divisions.next.y - 2 * divisions.cur.y;
    x *= kp;
    y *= kp;
    return { x, y };
  }
  getElectrostaticForce(pidx, eidx) {
    const self = this;
    const eps = self.get('eps');
    const edgeBundles = self.get('edgeBundles');
    const edgePoints = self.get('edgePoints');
    const edgeBundle = edgeBundles[eidx];
    const resForce = { x: 0, y: 0 };
    edgeBundle.forEach(eb => {
      const force = {
        x: edgePoints[eb][pidx].x - edgePoints[eidx][pidx].x,
        y: edgePoints[eb][pidx].y - edgePoints[eidx][pidx].y
      };
      if (Math.abs(force.x) > eps || Math.abs(force.y) > eps) {
        const length = getEucliDis(
          edgePoints[eb][pidx], edgePoints[eidx][pidx]
        );
        const diff = 1 / length;
        resForce.x += force.x * diff;
        resForce.y += force.y * diff;
      }
    });
    return resForce;
  }
  isTicking() {
    return this.get('ticking');
  }
  getSimulation() {
    return this.get('forceSimulation');
  }
  destroy() {
    if (this.get('ticking')) {
      this.getSimulation().stop();
    }
    super.destroy();
  }
}
module.exports = Bundling;
