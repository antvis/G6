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
    prev_overlapping,
    dissuade_hubs,
    barnes_hut,
    max_iteration,
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
    // nodes[i].index = i;
    // nodes[i].degree = 0;
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
    // // const node1 = graph.find(edges[i].source).getModel();
    // // const node2 = graph.find(edges[i].target).getModel();
    // nodes[node1.index].degree += 1;
    // nodes[node2.index].degree += 1;
    degrees[idmap[node1.id]] += 1;
    degrees[idmap[node2.id]] += 1;
  }

  const kr_prime = 100;
  let iter = max_iteration;
  const prevo_iter = 50;
  let Forces = [];
  const pre_Forces = [];
  for (let i = 0; i < size; i += 1) {
    Forces[2 * i] = 0;
    Forces[2 * i + 1] = 0;

    if (barnes_hut) {
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
      pre_Forces[2 * i] = Forces[2 * i];
      pre_Forces[2 * i + 1] = Forces[2 * i + 1];
      Forces[2 * i] = 0;
      Forces[2 * i + 1] = 0;
    }
    //   // attractive forces, existing on every actual edge
    Forces = getAttrForces(nodes, edges, size, esize, prev_overlapping, dissuade_hubs, mode, iter, prevo_iter, Forces, widths, idmap, degrees);
    // //   // repulsive forces and Gravity, existing on every node pair
    // //   // if prev_overlapping, using the no-optimized method in the last prevo_iter instead.
    if (barnes_hut && ((prev_overlapping && iter > prevo_iter) || !prev_overlapping)) {
      Forces = getOptRepGraForces(nodes, edges, size, esize, prev_overlapping, dissuade_hubs, mode, iter, prevo_iter, Forces, kr, kr_prime, kg, center, bodies, degrees);
    } else {
      Forces = getRepGraForces(nodes, edges, size, esize, prev_overlapping, dissuade_hubs, mode, iter, prevo_iter, Forces, kr, kr_prime, kg, center, widths, degrees);
    }
    //   // update the positions
    const res = updatePos(size, nodes, Forces, pre_Forces, SG, ks, ksmax, tao, degrees);
    nodes = res[0];
    SG = res[1];
    iter -= 1;
  } while (iter > 0);
  self.postMessage(nodes);
};

function getAttrForces(nodes, edges, size, esize, prev_overlapping, dissuade_hubs, mode, iter, prevo_iter, Forces, widths, idmap, degrees) {
  for (let i = 0; i < esize; i += 1) {
    // const source_node = graph.find(edges[i].source).getModel();
    // const target_node = graph.find(edges[i].target).getModel();
    let source_node;
    let target_node;
    let source_idx;
    let target_idx;
    for (let j = 0; j < size; j += 1) {
      if (nodes[j].id === edges[i].source) {
        source_node = nodes[j];
        source_idx = j;
      } else if (nodes[j].id === edges[i].target) {
        target_node = nodes[j];
        target_idx = j;
      }
    }
    let dir = [ target_node.x - source_node.x, target_node.y - source_node.y ];
    let eucli_dis = Math.hypot(dir[0], dir[1]);
    eucli_dis = eucli_dis < 0.0001 ? 0.0001 : eucli_dis;
    dir[0] = dir[0] / eucli_dis;
    dir[1] = dir[1] / eucli_dis;
    // the force
    if (prev_overlapping && iter < prevo_iter) eucli_dis = eucli_dis - widths[source_idx] - widths[target_idx];
    let Fa1 = eucli_dis;
    let Fa2 = Fa1;
    if (mode === 'linlog') {
      Fa1 = Math.log(1 + eucli_dis);
      Fa2 = Fa1;
    }
    if (dissuade_hubs) {
      // Fa1 = eucli_dis / source_node.degree;
      // Fa2 = eucli_dis / target_node.degree;
      Fa1 = eucli_dis / degrees[source_idx];
      Fa2 = eucli_dis / degrees[target_idx];
    }
    if (prev_overlapping && iter < prevo_iter && eucli_dis <= 0) {
      Fa1 = 0;
      Fa2 = 0;
    } else if (prev_overlapping && iter < prevo_iter && eucli_dis > 0) {
      Fa1 = eucli_dis;
      Fa2 = eucli_dis;
    }
    // Forces[2 * source_node.index] += Fa1 * dir[0];
    // Forces[2 * target_node.index] -= Fa2 * dir[0];
    // Forces[2 * source_node.index + 1] += Fa1 * dir[1];
    // Forces[2 * target_node.index + 1] -= Fa2 * dir[1];
    Forces[2 * idmap[source_node.id]] += Fa1 * dir[0];
    Forces[2 * idmap[target_node.id]] -= Fa2 * dir[0];
    Forces[2 * idmap[source_node.id] + 1] += Fa1 * dir[1];
    Forces[2 * idmap[target_node.id] + 1] -= Fa2 * dir[1];
    dir = null;
  }
  return Forces;
}

function getRepGraForces(nodes, edges, size, esize, prev_overlapping, dissuade_hubs, mode, iter, prevo_iter, Forces, kr, kr_prime, kg, center, widths, degrees) {
  for (let i = 0; i < size; i += 1) {
    for (let j = i + 1; j < size; j += 1) {
      let dir = [ nodes[j].x - nodes[i].x, nodes[j].y - nodes[i].y ];
      let eucli_dis = Math.hypot(dir[0], dir[1]);
      eucli_dis = eucli_dis < 0.0001 ? 0.0001 : eucli_dis;
      dir[0] = dir[0] / eucli_dis;
      dir[1] = dir[1] / eucli_dis;

      if (prev_overlapping && iter < prevo_iter) eucli_dis = eucli_dis - widths[i] - widths[j];

      let Fr = kr * (degrees[i] + 1) * (degrees[j] + 1) / eucli_dis;

      if (prev_overlapping && iter < prevo_iter && eucli_dis < 0) {
        Fr = kr_prime * (degrees[i] + 1) * (degrees[j] + 1);
      } else if (prev_overlapping && iter < prevo_iter && eucli_dis === 0) {
        Fr = 0;
      } else if (prev_overlapping && iter < prevo_iter && eucli_dis > 0) {
        Fr = kr * (degrees[i] + 1) * (degrees[j] + 1) / eucli_dis;
      }
      Forces[2 * i] -= Fr * dir[0];
      Forces[2 * j] += Fr * dir[0];
      Forces[2 * i + 1] -= Fr * dir[1];
      Forces[2 * j + 1] += Fr * dir[1];
      dir = null;
    }

    // gravity
    let dir = [ nodes[i].x - center.x, nodes[i].y - center.y ];
    const eucli_dis = Math.hypot(dir[0], dir[1]);
    dir[0] = dir[0] / eucli_dis;
    dir[1] = dir[1] / eucli_dis;
    const Fg = kg * (degrees[i] + 1);
    Forces[2 * i] -= Fg * dir[0];
    Forces[2 * i + 1] -= Fg * dir[1];
    dir = null;
  }
  return Forces;
}

function getOptRepGraForces(nodes, edges, size, esize, prev_overlapping, dissuade_hubs, mode, iter, prevo_iter, Forces, kr, kr_prime, kg, ct, bodies, degrees) {
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

  let quad_params = {
    xmid: (maxx + minx) / 2,
    ymid: (maxy + miny) / 2,
    length: width,
    mass_center: ct,
    mass: size
  };
  let quad = new Quad(quad_params);
  let quad_tree = new QuadTree(quad);

  // build the tree, insert the nodes(quads) into the tree
  for (let i = 0; i < size; i += 1) {
    if (bodies[i].in(quad)) quad_tree.insert(bodies[i]);
  }
  // update the repulsive forces and the gravity.
  for (let i = 0; i < size; i += 1) {
    bodies[i].resetForce();
    quad_tree.updateForce(bodies[i]);
    Forces[2 * i] -= bodies[i].fx;
    Forces[2 * i + 1] -= bodies[i].fy;

    // gravity
    let dir = [ nodes[i].x - ct.x, nodes[i].y - ct.y ];
    let eucli_dis = Math.hypot(dir[0], dir[1]);
    eucli_dis = eucli_dis < 0.0001 ? 0.0001 : eucli_dis;
    dir[0] = dir[0] / eucli_dis;
    dir[1] = dir[1] / eucli_dis;
    let Fg = kg * (degrees[i] + 1);
    Forces[2 * i] -= Fg * dir[0];
    Forces[2 * i + 1] -= Fg * dir[1];

    eucli_dis = null;
    Fg = null;
    dir = null;
  }
  quad_params = null;
  quad = null;
  quad_tree = null;
  width = null;
  return Forces;
}

function updatePos(size, nodes, Forces, pre_Forces, SG, ks, ksmax, tao, degrees) {
  let swgns = [];
  let trans = [];
  // swg(G) and tra(G)
  let swgG = 0;
  let traG = 0;
  for (let i = 0; i < size; i += 1) {
    const minus = [ Forces[2 * i] - pre_Forces[2 * i],
      Forces[2 * i + 1] - pre_Forces[2 * i + 1]
    ];
    const minus_norm = Math.hypot(minus[0], minus[1]);
    const add = [ Forces[2 * i] + pre_Forces[2 * i],
      Forces[2 * i + 1] + pre_Forces[2 * i + 1]
    ];
    const add_norm = Math.hypot(add[0], add[1]);

    swgns[i] = minus_norm;
    trans[i] = add_norm / 2;

    swgG += (degrees[i] + 1) * swgns[i];
    traG += (degrees[i] + 1) * trans[i];
  }

  let pre_SG = SG;
  SG = tao * traG / swgG;
  if (pre_SG !== 0) {
    SG = SG > (1.5 * pre_SG) ? (1.5 * pre_SG) : SG;
  }
  // update the node positions
  for (let i = 0; i < size; i += 1) {
    let Sn = ks * SG / (1 + SG * Math.sqrt(swgns[i]));
    let absForce = Math.hypot(Forces[2 * i], Forces[2 * i + 1]);
    absForce = absForce < 0.0001 ? 0.0001 : absForce;
    const max = ksmax / absForce;
    Sn = Sn > max ? max : Sn;
    const Dn_x = Sn * Forces[2 * i];
    const Dn_y = Sn * Forces[2 * i + 1];
    nodes[i].x += Dn_x;
    nodes[i].y += Dn_y;
  }
  swgns = null;
  trans = null;
  pre_SG = null;
  return [ nodes, SG ];
}
