import G6, { extend } from '@antv/g6';

const data = {
  nodes: [
    {
      id: '0',
      data: {
        label: 'A',
        cluster: 'part1',
      },
    },
    {
      id: '1',
      data: {
        label: 'B',
        cluster: 'part1',
      },
    },
    {
      id: '2',
      data: {
        label: 'C',
        cluster: 'part1',
      },
    },
    {
      id: '3',
      data: {
        label: 'D',
        cluster: 'part1',
      },
    },
    {
      id: '4',
      data: {
        label: 'E',
        cluster: 'part1',
      },
    },
    {
      id: '5',
      data: {
        label: 'F',
        cluster: 'part1',
      },
    },
    {
      id: '6',
      data: {
        label: 'a',
        cluster: 'part2',
      },
    },
    {
      id: '7',
      data: {
        label: 'b',
        cluster: 'part2',
      },
    },
    {
      id: '8',
      data: {
        label: 'c',
        cluster: 'part2',
      },
    },
    {
      id: '9',
      data: {
        label: 'd',
        cluster: 'part2',
      },
    },
  ],
  edges: [
    {
      id: 'edge-270',
      source: '0',
      target: '6',
    },
    {
      id: 'edge-483',
      source: '0',
      target: '7',
    },
    {
      id: 'edge-942',
      source: '0',
      target: '9',
    },
    {
      id: 'edge-569',
      source: '1',
      target: '6',
    },
    {
      id: 'edge-152',
      source: '1',
      target: '9',
    },
    {
      id: 'edge-540',
      source: '1',
      target: '7',
    },
    {
      id: 'edge-754',
      source: '2',
      target: '8',
    },
    {
      id: 'edge-78',
      source: '2',
      target: '9',
    },
    {
      id: 'edge-824',
      source: '2',
      target: '6',
    },
    {
      id: 'edge-308',
      source: '3',
      target: '8',
    },
    {
      id: 'edge-254',
      source: '4',
      target: '6',
    },
    {
      id: 'edge-283',
      source: '4',
      target: '7',
    },
    {
      id: 'edge-360',
      source: '5',
      target: '9',
    },
  ],
};

class BiLayout {
  //  implements Layout<{}>
  id = 'bi-layout';

  constructor(options = {}) {
    this.options = options;
  }
  /**
   * Return the positions of nodes and edges(if needed).
   */
  async execute(graph, options = {}) {
    return this.genericLineLayout(false, graph, options);
  }
  /**
   * To directly assign the positions to the nodes.
   */
  async assign(graph, options = {}) {
    this.genericLineLayout(true, graph, options);
  }

  async genericLineLayout(assign, graph, options = {}) {
    const {
      center = [0, 0],
      biSep = 100,
      nodeSep = 20,
      nodeSize = 32,
      direction = 'horizontal',
    } = { ...this.options, ...options };
    let part1Pos = 0;
    let part2Pos = 0;
    if (direction === 'horizontal') {
      part1Pos = center[0] - biSep / 2;
      part2Pos = center[0] + biSep / 2;
    }
    const nodes = graph.getAllNodes();
    const edges = graph.getAllEdges();

    const part1Nodes = [];
    const part2Nodes = [];
    const part1NodeMap = new Map();
    const part2NodeMap = new Map();
    // separate the nodes and init the positions
    nodes.forEach(function (node, i) {
      if (node.data.cluster === 'part1') {
        part1Nodes.push(node);
        part1NodeMap.set(node.id, i);
      } else {
        part2Nodes.push(node);
        part2NodeMap.set(node.id, i);
      }
    });

    // order the part1 node
    const indexMap = {};
    part1Nodes.forEach(function (p1n) {
      let index = 0;
      let adjCount = 0;
      edges.forEach(function (edge) {
        const sourceId = edge.source;
        const targetId = edge.target;
        if (sourceId === p1n.id) {
          index += part2NodeMap.get(targetId);
          adjCount += 1;
        } else if (targetId === p1n.id) {
          index += part2NodeMap.get(sourceId);
          adjCount += 1;
        }
      });
      index /= adjCount;
      indexMap[p1n.id] = index;
    });
    part1Nodes.sort(function (a, b) {
      return indexMap[a.id] - indexMap[b.id];
    });
    part2Nodes.forEach(function (p2n) {
      let index = 0;
      let adjCount = 0;
      edges.forEach(function (edge) {
        const sourceId = edge.source;
        const targetId = edge.target;
        if (sourceId === p2n.id) {
          index += part1NodeMap.get(targetId);
          adjCount += 1;
        } else if (targetId === p2n.id) {
          index += part1NodeMap.get(sourceId);
          adjCount += 1;
        }
      });
      index /= adjCount;
      indexMap[p2n.id] = index;
    });
    part2Nodes.sort(function (a, b) {
      return indexMap[a.id] - indexMap[b.id];
    });

    // place the nodes
    const hLength = part1Nodes.length > part2Nodes.length ? part1Nodes.length : part2Nodes.length;
    const height = hLength * (nodeSep + nodeSize);
    let begin = center[1] - height / 2;
    if (direction === 'vertical') {
      begin = center[0] - height / 2;
    }
    part1Nodes.forEach(function (p1n, i) {
      if (direction === 'horizontal') {
        p1n.data.x = part1Pos;
        p1n.data.y = begin + i * (nodeSep + nodeSize);
      } else {
        p1n.data.x = begin + i * (nodeSep + nodeSize);
        p1n.data.y = part1Pos;
      }
    });
    part2Nodes.forEach(function (p2n, i) {
      if (direction === 'horizontal') {
        p2n.data.x = part2Pos;
        p2n.data.y = begin + i * (nodeSep + nodeSize);
      } else {
        p2n.data.x = begin + i * (nodeSep + nodeSize);
        p2n.data.y = part2Pos;
      }
    });

    const result = {
      nodes: part1Nodes.concat(part2Nodes).map((node) => ({ id: node.id, data: { x: node.data.x, y: node.data.y } })),
      edges,
    };

    if (assign) {
      layoutNodes.forEach((node) => {
        graph.mergeNodeData(node.id, {
          x: node.data.x,
          y: node.data.y,
        });
      });
    }
    return result;
  }
}

const CustomGraph = extend(G6.Graph, {
  layouts: {
    'bi-layout': BiLayout,
  },
});

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;
const graph = new CustomGraph({
  container: 'container',
  width,
  height,
  layout: {
    type: 'bi-layout',
    biSep: 300,
    nodeSep: 20,
    nodeSize: 32,
  },
  theme: {
    type: 'spec',
    specification: {
      node: {
        dataTypeField: 'cluster',
      },
    },
  },
  modes: {
    default: ['drag-canvas', 'drag-node', 'zoom-canvas', 'click-select'],
  },
  data,
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };
