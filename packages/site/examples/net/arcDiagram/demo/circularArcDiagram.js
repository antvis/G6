import { Graph, Extensions, extend } from '@antv/g6';

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const edgeClusterTransform = (data = {}, options = {}, graphCore) => {
  const { dataAdded, dataUpdated, dataRemoved } = data;
  const handler = (data = {}, options = {}, core) => {
    const { nodes = [], edges = [] } = data;
    const nodeMap = new Map();
    nodes.forEach((node) => nodeMap.set(node.id, node));
    edges.forEach((edge) => {
      edge.data.cluster = nodeMap.get(edge.source).data.cluster;
    });
    return data;
  };
  return {
    dataAdded: handler(dataAdded, options, graphCore),
    dataUpdated: handler(dataUpdated, options, graphCore),
    dataRemoved: handler(dataRemoved, options, graphCore),
  };
};

const ExtGraph = extend(Graph, {
  transforms: {
    'edge-cluster': edgeClusterTransform,
    'transform-v4-data': Extensions.TransformV4Data,
    'map-node-size': Extensions.MapNodeSize,
  },
  edges: {
    'quadratic-edge': Extensions.QuadraticEdge,
  },
});

fetch('https://gw.alipayobjects.com/os/basement_prod/70cde3be-22e8-4291-98f1-4d5a5b75b62f.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new ExtGraph({
      container: 'container',
      width,
      height,
      transforms: [
        'transform-v4-data',
        {
          type: 'map-node-size',
          field: 'value',
        },
        'edge-cluster',
      ],
      plugins: [
        {
          type: 'lod-controller',
          disableLod: true,
        },
      ],
      layout: {
        type: 'circular',
      },
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
      node: (model) => {
        return {
          id: model.id,
          data: {
            ...model.data,
            labelShape: {
              position: 'right',
              textAlign: 'left',
              offsetX: 0,
              offsetY: 0,
              ...model.data.labelShape,
              text: model.data.name,
              maxWidth: 100,
            },
            animates: {
              update: [
                {
                  fields: ['opacity'],
                  shapeId: 'haloShape',
                },
                {
                  fields: ['lineWidth'],
                  shapeId: 'keyShape',
                },
              ],
            },
          },
        };
      },
      edge: {
        type: 'quadratic-edge',
        keyShape: {
          opacity: 0.4,
          controlPoints: [{ x: width / 2, y: height / 2 }],
        },
      },
      modes: {
        default: ['drag-node', 'click-select', 'zoom-canvas', 'drag-canvas'],
      },
      data,
    });
    graph.on('afterlayout', (e) => {
      const angleUpdates = graph.getAllNodesData().map((node) => {
        const { x, y } = node.data;
        const vecX = x - width / 2;
        const vecY = y - height / 2;
        const dist = Math.sqrt(vecX * vecX + vecY * vecY);
        let angle = Math.asin(vecY / dist);
        if (vecX < 0) angle = -angle;
        return {
          id: node.id,
          data: {
            labelShape: {
              position: vecX < 0 ? 'center' : 'right',
              textAlign: vecX < 0 ? 'right' : 'left',
              angle,
            },
          },
        };
      });
      graph.updateData('node', angleUpdates);
      graph.fitView();
    });
window.graph = graph;
  });
