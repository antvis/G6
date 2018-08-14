const Body = require('./body');
const Quad = require('./quad');
const QuadTree = require('./quadTree');

onmessage = function(event) {
  let {
    nodes,
    edges,
    kr,
    kg,
    mode,
    prevOverlapping,
    dissuadeHubs,
    barnesHut,
    maxIteration,
    ks,
    ksmax,
    tao,
    center,
    widths
  } = event.data;

  const size = nodes.length;
  const esize = edges.length;

  let SG = 0;
  const bodies = [];
  const degrees = [];
  const idmap = {};

  for (let i = 0; i < size; i += 1) {
    idmap[nodes[i].id] = i;
    degrees[i] = 0;
    nodes[i].x = Math.random() * 1000;
    nodes[i].y = Math.random() * 1000;
  }
  for (let i = 0; i < esize; i += 1) {
    let node1;
    let node2;
    for (let j = 0; j < size; j += 1) {
      if (nodes[j].id === edges[i].source) {
        node1 = nodes[j];
      } else if (nodes[j].id === edges[i].target) {
        node2 = nodes[j];
      }
    }
    degrees[idmap[node1.id]] += 1;
    degrees[idmap[node2.id]] += 1;
  }

  const krPrime = 100;
  let iter = maxIteration;
  const prevoIter = 50;
  let Forces = [];
  const preForces = [];
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
    //   // attractive forces, existing on every actual edge
    Forces = getAttrForces(nodes, edges, size, esize, prevOverlapping, dissuadeHubs, mode, iter, prevoIter, Forces, widths, idmap, degrees);
    // //   // repulsive forces and Gravity, existing on every node pair
    // //   // if prevOverlapping, using the no-optimized method in the last prevoIter instead.
    if (barnesHut && ((prevOverlapping && iter > prevoIter) || !prevOverlapping)) {
      Forces = getOptRepGraForces(nodes, edges, size, esize, prevOverlapping, dissuadeHubs, mode, iter, prevoIter, Forces, kr, krPrime, kg, center, bodies, degrees);
    } else {
      Forces = getRepGraForces(nodes, edges, size, esize, prevOverlapping, dissuadeHubs, mode, iter, prevoIter, Forces, kr, krPrime, kg, center, widths, degrees);
    }
    //   // update the positions
    const res = updatePos(size, nodes, Forces, preForces, SG, ks, ksmax, tao, degrees);
    nodes = res[0];
    SG = res[1];
    iter -= 1;
  } while (iter > 0);
  self.postMessage(nodes);
};

function getAttrForces(nodes, edges, size, esize, prevOverlapping, dissuadeHubs, mode, iter, prevoIter, Forces, widths, idmap, degrees) {
  for (let i = 0; i < esize; i += 1) {
    // const sourceNode = graph.find(edges[i].source).getModel();
    // const targetNode = graph.find(edges[i].target).getModel();
    let sourceNode;
    let targetNode;
    let sourceIdx;
    let targetIdx;
    for (let j = 0; j < size; j += 1) {
      if (nodes[j].id === edges[i].source) {
        sourceNode = nodes[j];
        sourceIdx = j;
      } else if (nodes[j].id === edges[i].target) {
        targetNode = nodes[j];
        targetIdx = j;
      }
    }
    let dir = [ targetNode.x - sourceNode.x, targetNode.y - sourceNode.y ];
    let eucliDis = Math.hypot(dir[0], dir[1]);
    eucliDis = eucliDis < 0.0001 ? 0.0001 : eucliDis;
    dir[0] = dir[0] / eucliDis;
    dir[1] = dir[1] / eucliDis;
    // the force
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
    Forces[2 * idmap[sourceNode.id]] += Fa1 * dir[0];
    Forces[2 * idmap[targetNode.id]] -= Fa2 * dir[0];
    Forces[2 * idmap[sourceNode.id] + 1] += Fa1 * dir[1];
    Forces[2 * idmap[targetNode.id] + 1] -= Fa2 * dir[1];
    dir = null;
  }
  return Forces;
}

function getRepGraForces(nodes, edges, size, esize, prevOverlapping, dissuadeHubs, mode, iter, prevoIter, Forces, kr, krPrime, kg, center, widths, degrees) {
  for (let i = 0; i < size; i += 1) {
    for (let j = i + 1; j < size; j += 1) {
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

function getOptRepGraForces(nodes, edges, size, esize, prevOverlapping, dissuadeHubs, mode, iter, prevoIter, Forces, kr, krPrime, kg, ct, bodies, degrees) {
  let minx = 9e10,
    maxx = -9e10,
    miny = 9e10,
    maxy = -9e10;
  for (let i = 0; i < size; i += 1) {
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
    massCenter: ct,
    mass: size
  };
  let quad = new Quad(quadParams);
  let quadTree = new QuadTree(quad);

  // build the tree, insert the nodes(quads) into the tree
  for (let i = 0; i < size; i += 1) {
    if (bodies[i].in(quad)) quadTree.insert(bodies[i]);
  }
  // update the repulsive forces and the gravity.
  for (let i = 0; i < size; i += 1) {
    bodies[i].resetForce();
    quadTree.updateForce(bodies[i]);
    Forces[2 * i] -= bodies[i].fx;
    Forces[2 * i + 1] -= bodies[i].fy;

    // gravity
    let dir = [ nodes[i].x - ct.x, nodes[i].y - ct.y ];
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

function updatePos(size, nodes, Forces, preForces, SG, ks, ksmax, tao, degrees) {
  let swgns = [];
  let trans = [];
  // swg(G) and tra(G)
  let swgG = 0;
  let traG = 0;
  for (let i = 0; i < size; i += 1) {
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
