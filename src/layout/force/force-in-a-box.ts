import * as d3Force from 'd3-force';

// https://github.com/john-guerra/forceInABox/blob/master/src/forceInABox.js
export default function forceInABox() {
  function constant(_: any): () => any {
    return () => _;
  }

  var nodes = [],
    nodesMap = {},
    links = [], //needed for the force version
    centerX = 100,
    centerY = 100,
    forceNodeSize: (() => number) | ((d: any) => number) = constant(1), // The expected node size used for computing the cluster node
    forceCharge: (() => number) | ((d: any) => number) = constant(-1),
    forceLinkDistance: (() => number) | ((d: any) => number) = constant(100),
    forceLinkStrength: (() => number) | ((d: any) => number) = constant(0.1),
    foci = { none: { x: 0, y: 0 } },
    templateNodes = [],
    offset = [0, 0],
    templateForce,
    groupBy = function groupBy(d) {
      return d.cluster;
    },
    template = 'force',
    enableGrouping = true,
    strength = 0.1;

  function force(alpha) {
    if (!enableGrouping) {
      return force;
    }
    templateForce.tick();
    getFocisFromTemplate();

    for (var i = 0, n = nodes.length, node, k = alpha * strength; i < n; ++i) {
      node = nodes[i];
      node.vx += (foci[groupBy(node)].x - node.x) * k;
      node.vy += (foci[groupBy(node)].y - node.y) * k;
    }
  }

  function initialize() {
    if (!nodes) return;
    initializeWithForce();
  }

  function initializeWithForce() {
    var net;

    if (!nodes || !nodes.length) {
      return;
    }

    if (nodes && nodes.length > 0) {
      if (groupBy(nodes[0]) === undefined) {
        throw Error(
          "Couldnt find the grouping attribute for the nodes. Make sure to set it up with forceInABox.groupBy('clusterAttr') before calling .links()",
        );
      }
    }

    // checkLinksAsObjects();

    net = getGroupsGraph();
    templateForce = d3Force
      .forceSimulation(net.nodes)
      .force('x', d3Force.forceX(centerX).strength(0.1))
      .force('y', d3Force.forceY(centerY).strength(0.1))
      .force(
        'collide',
        d3Force
          .forceCollide(function (d: { r: any }) {
            return d.r;
          })
          .iterations(4),
      )
      .force('charge', d3Force.forceManyBody().strength(forceCharge))
      .force(
        'links',
        d3Force
          .forceLink(net.nodes.length ? net.links : [])
          .distance(forceLinkDistance)
          .strength(forceLinkStrength),
      );

    templateNodes = templateForce.nodes();

    getFocisFromTemplate();
  }

  function checkLinksAsObjects() {
    // Check if links come in the format of indexes instead of objects
    var linkCount = 0;
    if (nodes.length === 0) return;

    links.forEach(function (link) {
      var source, target;
      if (!nodes) return;
      source = link.source;
      target = link.target;
      if (typeof link.source !== 'object') source = nodes[link.source];
      if (typeof link.target !== 'object') target = nodes[link.target];
      if (source === undefined || target === undefined) {
        // console.error(link);
        throw Error('Error setting links, couldnt find nodes for a link (see it on the console)');
      }
      link.source = source;
      link.target = target;
      link.index = linkCount++;
    });
  }

  function getGroupsGraph() {
    let gnodes = [],
      glinks = [],
      dNodes = {},
      clustersList = [],
      // c,
      // i,
      // cc,
      clustersCounts = {},
      clustersLinks = [];

    clustersCounts = computeClustersNodeCounts(nodes);
    clustersLinks = computeClustersLinkCounts(links);

    clustersList = Object.keys(clustersCounts);
    for (let i = 0; i < clustersList.length; i += 1) {
      const key = clustersList[i];
      const val = clustersCounts[key];
      gnodes.push({
        id: key,
        size: val.count,
        r: Math.sqrt(val.sumforceNodeSize / Math.PI),
      }); // Uses approx meta-node size
      dNodes[key] = i;
    }

    clustersLinks.forEach(function (l) {
      var source = dNodes[l.source],
        target = dNodes[l.target];
      if (source !== undefined && target !== undefined) {
        glinks.push({
          source: source,
          target: target,
          count: l.count,
        });
      }
    });

    return { nodes: gnodes, links: glinks };
  }

  function computeClustersNodeCounts(nodes) {
    const clustersCounts = {};

    nodes.forEach(function (d) {
      const key = groupBy(d);
      if (!clustersCounts[key]) {
        clustersCounts[key] = { count: 0, sumforceNodeSize: 0 };
      }
    });
    nodes.forEach(function (d: any) {
      const key = groupBy(d);
      const nodeSize = forceNodeSize(d);
      const tmpCount = clustersCounts[key];
      tmpCount.count = tmpCount.count + 1;
      tmpCount.sumforceNodeSize = tmpCount.sumforceNodeSize + Math.PI * (nodeSize * nodeSize) * 1.3;
      clustersCounts[key] = tmpCount;
    });

    return clustersCounts;
  }

  //Returns
  function computeClustersLinkCounts(links) {
    const dClusterLinks = {};
    const clusterLinks = [];
    links.forEach(function (l) {
      const key = getLinkKey(l);
      let count = 0;
      if (dClusterLinks[key] !== undefined) {
        count = dClusterLinks[key];
      }
      count += 1;
      dClusterLinks[key] = count;
    });

    const entries = Object.entries(dClusterLinks);

    entries.forEach(([key, count]) => {
      const source = key.split('~')[0];
      const target = key.split('~')[1];
      if (source !== undefined && target !== undefined) {
        clusterLinks.push({
          source: source,
          target: target,
          count: count,
        });
      }
    });

    return clusterLinks;
  }

  function getFocisFromTemplate() {
    //compute foci
    foci.none = { x: 0, y: 0 };
    templateNodes.forEach(function (d) {
      foci[d.id] = {
        x: d.x - offset[0],
        y: d.y - offset[1],
      };
    });
    return foci;
  }

  function getLinkKey(l) {
    const sourceID = groupBy(nodesMap[l.source]);
    const targetID = groupBy(nodesMap[l.target]);

    return sourceID <= targetID ? sourceID + '~' + targetID : targetID + '~' + sourceID;
  }

  function genNodesMap(nodes) {
    nodes.forEach((node) => {
      nodesMap[node.id] = node;
    });
  }

  force.initialize = function (_) {
    nodes = _;
    initialize();
  };

  force.template = function (x) {
    if (!arguments.length) return template;
    template = x;
    initialize();
    return force;
  };

  force.groupBy = function (x) {
    if (!arguments.length) return groupBy;
    if (typeof x === 'string') {
      groupBy = function (d) {
        return d[x];
      };
      return force;
    }
    groupBy = x;
    return force;
  };

  force.enableGrouping = function (x) {
    if (!arguments.length) return enableGrouping;
    enableGrouping = x;
    // update();
    return force;
  };

  force.strength = function (x) {
    if (!arguments.length) return strength;
    strength = x;
    return force;
  };

  force.centerX = function (_) {
    return arguments.length ? ((centerX = _), force) : centerX;
  };

  force.centerY = function (_) {
    return arguments.length ? ((centerY = _), force) : centerY;
  };

  force.nodes = function (_) {
    arguments.length && genNodesMap(_);
    return arguments.length ? ((nodes = _), force) : nodes;
  };

  force.links = function (_) {
    if (!arguments.length) return links;
    if (_ === null) links = [];
    else links = _;
    initialize();
    return force;
  };

  force.forceNodeSize = function (_) {
    return arguments.length
      ? ((forceNodeSize = typeof _ === 'function' ? _ : constant(+_)), initialize(), force)
      : forceNodeSize;
  };

  // Legacy support
  force.nodeSize = force.forceNodeSize;

  force.forceCharge = function (_) {
    return arguments.length
      ? ((forceCharge = typeof _ === 'function' ? _ : constant(+_)), initialize(), force)
      : forceCharge;
  };

  force.forceLinkDistance = function (_) {
    return arguments.length
      ? ((forceLinkDistance = typeof _ === 'function' ? _ : constant(+_)), initialize(), force)
      : forceLinkDistance;
  };

  force.forceLinkStrength = function (_) {
    return arguments.length
      ? ((forceLinkStrength = typeof _ === 'function' ? _ : constant(+_)), initialize(), force)
      : forceLinkStrength;
  };

  force.offset = function (_) {
    return arguments.length
      ? ((offset = typeof _ === 'function' ? _ : constant(+_)), force)
      : offset;
  };

  force.getFocis = getFocisFromTemplate;

  return force;
}
