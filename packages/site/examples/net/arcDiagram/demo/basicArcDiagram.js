import { Graph, Extensions, extend } from '@antv/g6';

const edgeClusterTransform = (data, options = {}, userGraphCore) => {
  const { nodes, edges } = data;
  const nodeMap = new Map();
  nodes.forEach((node) => nodeMap.set(node.id, node));
  edges.forEach((edge) => {
    edge.data.cluster = nodeMap.get(edge.source).data.cluster;
  });
  return data;
};

class LineLayout {
  //  implements Layout<{}>
  id = 'line-layout';

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
    const { height = 500 } = { ...this.options, ...options };

    const nodes = graph.getAllNodes();
    const edges = graph.getAllEdges();
    const layoutNodes = [];
    let x = 10;
    let lastNodeRadius = 0;
    nodes.forEach((node, i) => {
      const currentRadius = node.data.keyShape?.r || 16;
      if (i > 0) {
        x = layoutNodes[i - 1].data.x + lastNodeRadius + currentRadius + 4;
      }
      layoutNodes.push({
        id: node.id,
        data: {
          x,
          y: height * 0.7,
        },
      });
      lastNodeRadius = currentRadius;
    });
    const result = {
      nodes: layoutNodes,
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

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const ExtGraph = extend(Graph, {
  edges: {
    'quadratic-edge': Extensions.QuadraticEdge,
  },
  transforms: {
    'edge-cluster': edgeClusterTransform,
  },
  layouts: {
    'line-layout': LineLayout,
  },
});

fetch('https://gw.alipayobjects.com/os/basement_prod/70cde3be-22e8-4291-98f1-4d5a5b75b62f.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new ExtGraph({
      container: 'container',
      width,
      height,
      autoFit: 'view',
      transform: ['transform-v4-data', 'edge-cluster'],
      layout: { type: 'line-layout' },
      theme: {
        type: 'spec',
        specification: {
          node: {
            dataTypeField: 'cluster',
          },
          edge: {
            dataTypeField: 'cluster',
          },
        },
      },
      node: {
        keyShape: {
          r: 8,
        },
        labelShape: {
          text: {
            fields: ['name'],
            formatter: (model) => model.data.name,
          },
          angle: Math.PI / 2,
          textAlign: 'left',
          offsetX: 10,
          maxWidth: 100,
        },
        anchorPoints: [[0.5, 0]],
      },
      edge: {
        type: 'quadratic-edge',
        keyShape: {
          opacity: 0.4,
        },
      },
      modes: {
        default: ['click-select', 'drag-canvas', 'drag-node'],
      },
      data,
    });

    graph.on('afterlayout', (e) => {
      const edgeDatas = graph.getAllEdgesData().map((edge) => {
        const { id, source, target } = edge;
        const sourceData = graph.getNodeData(source);
        const targetData = graph.getNodeData(target);
        const [width, height] = graph.getSize();
        const xSep = (width - 20) / graph.getAllNodesData().length;
        const endsSepStep = (targetData.data.x - sourceData.data.x) / xSep;
        const sign = endsSepStep < 0 ? 1 : -1;
        return {
          id,
          data: {
            keyShape: {
              curveOffset: ((sign * width) / 55) * Math.ceil(Math.abs(endsSepStep)),
            },
          },
        };
      });
      graph.updateData('edge', edgeDatas);
    });

    if (typeof window !== 'undefined')
      window.onresize = () => {
        if (!graph || graph.destroyed) return;
        if (!container || !container.scrollWidth || !container.scrollHeight) return;
        graph.setSize([container.scrollWidth, container.scrollHeight]);
      };
  });
