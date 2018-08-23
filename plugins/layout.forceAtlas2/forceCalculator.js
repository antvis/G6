const Body = require('./body');
const Quad = require('./quad');
const QuadTree = require('./quadTree');

class ForceCalculator {

  updateNodesByForces(data) {
    let { nodes, edges, maxIteration, barnesHut, prune } = data;
    edges = edges.filter(edge => {
      return edge.source !== edge.target;
    });
    const size = nodes.length;
    const esize = edges.length;

    const degrees = [];
    const idMap = {};
    const edgeEndsIdMap = {};

    const Es = [];
    for (let i = 0; i < size; i += 1) {
      idMap[nodes[i].id] = i;
      degrees[i] = 0;
      if (nodes[i].x === undefined || isNaN(nodes[i].x)) { nodes[i].x = Math.random() * 1000; }
      if (nodes[i].y === undefined || isNaN(nodes[i].y)) { nodes[i].y = Math.random() * 1000; }
      Es.push({ x: nodes[i].x, y: nodes[i].y });
    }
    for (let i = 0; i < esize; i += 1) {
      let node1;
      let node2;
      let sIdx = 0,
        tIdx = 0;

      for (let j = 0; j < size; j += 1) {
        if (nodes[j].id === edges[i].source) {
          node1 = nodes[j];
          sIdx = j;
        } else if (nodes[j].id === edges[i].target) {
          node2 = nodes[j];
          tIdx = j;
        }
        edgeEndsIdMap[i] = { sourceIdx: sIdx, targetIdx: tIdx };
      }
      degrees[idMap[node1.id]] += 1;
      degrees[idMap[node2.id]] += 1;
    }

    let iteration = maxIteration;
    const iterateParam = { data, size, esize, idMap, degrees, iteration, prune, barnesHut, edgeEndsIdMap };
    nodes = this.iterate(iterateParam);

    // if prune, place the leaves around their parents, and then re-layout for several iterations.
    if (prune) {
      for (let j = 0; j < esize; j += 1) {
        if (degrees[edgeEndsIdMap[j].sourceIdx] <= 1) {
          nodes[edgeEndsIdMap[j].sourceIdx].x = nodes[edgeEndsIdMap[j].targetIdx].x;
          nodes[edgeEndsIdMap[j].sourceIdx].y = nodes[edgeEndsIdMap[j].targetIdx].y;

        } else if (degrees[edgeEndsIdMap[j].targetIdx] <= 1) {
          nodes[edgeEndsIdMap[j].targetIdx].x = nodes[edgeEndsIdMap[j].sourceIdx].x;
          nodes[edgeEndsIdMap[j].targetIdx].y = nodes[edgeEndsIdMap[j].sourceIdx].y;
        }
      }
      prune = false;
      barnesHut = false;
      iteration = 100;
      const iterateParamAfterPrune = { data, size, esize, idMap, degrees, iteration, prune, barnesHut, edgeEndsIdMap };
      nodes = this.iterate(iterateParamAfterPrune);
    }
    return nodes;
  }
  iterate(params) {
    const { data, size, esize, idMap, degrees, iteration, prune, barnesHut, edgeEndsIdMap } = params;
    let { nodes, ks, kr, kg, mode, prevOverlapping, dissuadeHubs, ksmax, tao, center, widths } = data;

    let SG = 0;
    const krPrime = 100;
    let iter = iteration;
    const prevoIter = 50;
    let Forces = [];
    const preForces = [];
    const bodies = [];

    for (let i = 0; i < size; i += 1) {
      Forces[2 * i] = 0;
      Forces[2 * i + 1] = 0;

      if (barnesHut) {
        let params = {
          id: i,
          rx: nodes[i].x,
          ry: nodes[i].y,
          mass: 1,
          G: kr,
          degree: degrees[i]
        };
        bodies[i] = new Body(params);
        params = null;
      }
    }

    do {
      for (let i = 0; i < size; i += 1) {
        preForces[2 * i] = Forces[2 * i];
        preForces[2 * i + 1] = Forces[2 * i + 1];
        Forces[2 * i] = 0;
        Forces[2 * i + 1] = 0;
      }
        // attractive forces, existing on every actual edge
      const attrForceParam = { nodes, esize, prevOverlapping, dissuadeHubs, mode, iter, prevoIter, Forces, widths, idMap, degrees, prune, edgeEndsIdMap };
      Forces = this.getAttrForces(attrForceParam);
        // repulsive forces and Gravity, existing on every node pair
        // if prevOverlapping, using the no-optimized method in the last prevoIter instead.
      if (barnesHut && ((prevOverlapping && iter > prevoIter) || !prevOverlapping)) {
        const optRepGraForceParam = { nodes, size, Forces, kg, center, bodies, degrees, prune };
        Forces = this.getOptRepGraForces(optRepGraForceParam);
      } else {
        const repGraForceParam = { nodes, size, prevOverlapping, iter, prevoIter, Forces, kr, krPrime, kg, center, widths, degrees, prune };
        Forces = this.getRepGraForces(repGraForceParam);
      }
      //   // update the positions
      const updatePosParam = { size, nodes, Forces, preForces, SG, ks, ksmax, tao, degrees, prune };
      const res = this.updatePos(updatePosParam);
      nodes = res[0];
      SG = res[1];
      iter -= 1;
    } while (iter > 0);
    return nodes;
  }
  getAttrForces(params) {
    const { nodes, esize, prevOverlapping, dissuadeHubs, mode, iter, prevoIter, Forces, widths, idMap, degrees, prune, edgeEndsIdMap } = params;
    for (let i = 0; i < esize; i += 1) {
      const sourceNode = nodes[edgeEndsIdMap[i].sourceIdx];
      const sourceIdx = edgeEndsIdMap[i].sourceIdx;
      const targetNode = nodes[edgeEndsIdMap[i].targetIdx];
      const targetIdx = edgeEndsIdMap[i].targetIdx;

      if (prune && (degrees[sourceIdx] <= 1 || degrees[targetIdx] <= 1)) continue;

      let dir = [ targetNode.x - sourceNode.x, targetNode.y - sourceNode.y ];
      let eucliDis = Math.hypot(dir[0], dir[1]);
      eucliDis = eucliDis < 0.0001 ? 0.0001 : eucliDis;
      dir[0] = dir[0] / eucliDis;
      dir[1] = dir[1] / eucliDis;

      if (prevOverlapping && iter < prevoIter) eucliDis = eucliDis - widths[sourceIdx] - widths[targetIdx];
      let Fa1 = eucliDis;
      let Fa2 = Fa1;
      if (mode === 'linlog') {
        Fa1 = Math.log(1 + eucliDis);
        Fa2 = Fa1;
      }
      if (dissuadeHubs) {
        Fa1 = eucliDis / degrees[sourceIdx];
        Fa2 = eucliDis / degrees[targetIdx];
      }
      if (prevOverlapping && iter < prevoIter && eucliDis <= 0) {
        Fa1 = 0;
        Fa2 = 0;
      } else if (prevOverlapping && iter < prevoIter && eucliDis > 0) {
        Fa1 = eucliDis;
        Fa2 = eucliDis;
      }
      Forces[2 * idMap[sourceNode.id]] += Fa1 * dir[0];
      Forces[2 * idMap[targetNode.id]] -= Fa2 * dir[0];
      Forces[2 * idMap[sourceNode.id] + 1] += Fa1 * dir[1];
      Forces[2 * idMap[targetNode.id] + 1] -= Fa2 * dir[1];
      dir = null;
    }
    return Forces;
  }
  getRepGraForces(params) {
    const { nodes, size, prevOverlapping, iter, prevoIter, Forces, kr, krPrime, kg, center, widths, degrees, prune } = params;
    for (let i = 0; i < size; i += 1) {
      for (let j = i + 1; j < size; j += 1) {

        if (prune && (degrees[i] <= 1 || degrees[j] <= 1)) continue;

        let dir = [ nodes[j].x - nodes[i].x, nodes[j].y - nodes[i].y ];
        let eucliDis = Math.hypot(dir[0], dir[1]);
        eucliDis = eucliDis < 0.0001 ? 0.0001 : eucliDis;
        dir[0] = dir[0] / eucliDis;
        dir[1] = dir[1] / eucliDis;

        if (prevOverlapping && iter < prevoIter) eucliDis = eucliDis - widths[i] - widths[j];

        let Fr = kr * (degrees[i] + 1) * (degrees[j] + 1) / eucliDis;

        if (prevOverlapping && iter < prevoIter && eucliDis < 0) {
          Fr = krPrime * (degrees[i] + 1) * (degrees[j] + 1);
        } else if (prevOverlapping && iter < prevoIter && eucliDis === 0) {
          Fr = 0;
        } else if (prevOverlapping && iter < prevoIter && eucliDis > 0) {
          Fr = kr * (degrees[i] + 1) * (degrees[j] + 1) / eucliDis;
        }
        Forces[2 * i] -= Fr * dir[0];
        Forces[2 * j] += Fr * dir[0];
        Forces[2 * i + 1] -= Fr * dir[1];
        Forces[2 * j + 1] += Fr * dir[1];
        dir = null;
      }

    // gravity
      let dir = [ nodes[i].x - center.x, nodes[i].y - center.y ];
      const eucliDis = Math.hypot(dir[0], dir[1]);
      dir[0] = dir[0] / eucliDis;
      dir[1] = dir[1] / eucliDis;
      const Fg = kg * (degrees[i] + 1);
      Forces[2 * i] -= Fg * dir[0];
      Forces[2 * i + 1] -= Fg * dir[1];
      dir = null;
    }
    return Forces;
  }

  getOptRepGraForces(params) {
    const { nodes, size, Forces, kg, center, bodies, degrees, prune } = params;
    let minx = 9e10,
      maxx = -9e10,
      miny = 9e10,
      maxy = -9e10;
    for (let i = 0; i < size; i += 1) {
      if (prune && (degrees[i] <= 1)) continue;
      bodies[i].setPos(nodes[i].x, nodes[i].y);
      if (nodes[i].x >= maxx) maxx = nodes[i].x;
      if (nodes[i].x <= minx) minx = nodes[i].x;
      if (nodes[i].y >= maxy) maxy = nodes[i].y;
      if (nodes[i].y <= miny) miny = nodes[i].y;
    }

    let width = Math.max(maxx - minx, maxy - miny);

    let quadParams = {
      xmid: (maxx + minx) / 2,
      ymid: (maxy + miny) / 2,
      length: width,
      massCenter: center,
      mass: size
    };
    let quad = new Quad(quadParams);
    let quadTree = new QuadTree(quad);

  // build the tree, insert the nodes(quads) into the tree
    for (let i = 0; i < size; i += 1) {

      if (prune && (degrees[i] <= 1)) continue;

      if (bodies[i].in(quad)) quadTree.insert(bodies[i]);
    }
  // update the repulsive forces and the gravity.
    for (let i = 0; i < size; i += 1) {

      if (prune && (degrees[i] <= 1)) continue;

      bodies[i].resetForce();
      quadTree.updateForce(bodies[i]);
      Forces[2 * i] -= bodies[i].fx;
      Forces[2 * i + 1] -= bodies[i].fy;

    // gravity
      let dir = [ nodes[i].x - center.x, nodes[i].y - center.y ];
      let eucliDis = Math.hypot(dir[0], dir[1]);
      eucliDis = eucliDis < 0.0001 ? 0.0001 : eucliDis;
      dir[0] = dir[0] / eucliDis;
      dir[1] = dir[1] / eucliDis;
      let Fg = kg * (degrees[i] + 1);
      Forces[2 * i] -= Fg * dir[0];
      Forces[2 * i + 1] -= Fg * dir[1];

      eucliDis = null;
      Fg = null;
      dir = null;
    }
    quadParams = null;
    quad = null;
    quadTree = null;
    width = null;
    return Forces;
  }

  updatePos(params) {
    let { size, nodes, Forces, preForces, SG, ks, ksmax, tao, degrees, prune } = params;
    let swgns = [];
    let trans = [];
  // swg(G) and tra(G)
    let swgG = 0;
    let traG = 0;
    for (let i = 0; i < size; i += 1) {

      if (prune && (degrees[i] <= 1)) continue;

      const minus = [ Forces[2 * i] - preForces[2 * i],
        Forces[2 * i + 1] - preForces[2 * i + 1]
      ];
      const minusNorm = Math.hypot(minus[0], minus[1]);
      const add = [ Forces[2 * i] + preForces[2 * i],
        Forces[2 * i + 1] + preForces[2 * i + 1]
      ];
      const addNorm = Math.hypot(add[0], add[1]);

      swgns[i] = minusNorm;
      trans[i] = addNorm / 2;

      swgG += (degrees[i] + 1) * swgns[i];
      traG += (degrees[i] + 1) * trans[i];
    }

    let preSG = SG;
    SG = tao * traG / swgG;
    if (preSG !== 0) {
      SG = SG > (1.5 * preSG) ? (1.5 * preSG) : SG;
    }
  // update the node positions
    for (let i = 0; i < size; i += 1) {

      if (prune && (degrees[i] <= 1)) continue;

      let Sn = ks * SG / (1 + SG * Math.sqrt(swgns[i]));
      let absForce = Math.hypot(Forces[2 * i], Forces[2 * i + 1]);
      absForce = absForce < 0.0001 ? 0.0001 : absForce;
      const max = ksmax / absForce;
      Sn = Sn > max ? max : Sn;
      const Dnx = Sn * Forces[2 * i];
      const Dny = Sn * Forces[2 * i + 1];
      nodes[i].x += Dnx;
      nodes[i].y += Dny;
    }
    swgns = null;
    trans = null;
    preSG = null;
    return [ nodes, SG ];
  }
}


module.exports = ForceCalculator;
