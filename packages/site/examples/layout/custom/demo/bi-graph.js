import { BaseLayout, ExtensionCategory, Graph, register } from '@antv/g6';

const data = {
  nodes: [
    { id: '0', data: { cluster: 'A' } },
    { id: '1', data: { cluster: 'A' } },
    { id: '2', data: { cluster: 'A' } },
    { id: '3', data: { cluster: 'A' } },
    { id: '4', data: { cluster: 'A' } },
    { id: '5', data: { cluster: 'A' } },
    { id: '6', data: { cluster: 'B' } },
    { id: '7', data: { cluster: 'B' } },
    { id: '8', data: { cluster: 'B' } },
    { id: '9', data: { cluster: 'B' } },
  ],
  edges: [
    { source: '0', target: '6' },
    { source: '0', target: '7' },
    { source: '0', target: '9' },
    { source: '1', target: '6' },
    { source: '1', target: '9' },
    { source: '1', target: '7' },
    { source: '2', target: '8' },
    { source: '2', target: '9' },
    { source: '2', target: '6' },
    { source: '3', target: '8' },
    { source: '4', target: '6' },
    { source: '4', target: '7' },
    { source: '5', target: '9' },
  ],
};

class BiLayout extends BaseLayout {
  id = 'bi-layout';

  async execute(data, options) {
    const { sep = 100, nodeSep = 20, nodeSize = 32 } = { ...this.options, ...options };

    const [A, B] = data.nodes.reduce(
      (acc, curr) => {
        acc[curr.data.cluster === 'A' ? 0 : 1].push(curr);
        return acc;
      },
      [[], []],
    );

    return {
      nodes: [
        ...A.map((node, i) => ({
          id: node.id,
          style: {
            x: i * (nodeSep + nodeSize),
            y: 0,
          },
        })),
        ...B.map((node, i) => ({
          id: node.id,
          style: {
            x: i * (nodeSep + nodeSize),
            y: sep,
          },
        })),
      ],
    };
  }
}

register(ExtensionCategory.LAYOUT, 'bi', BiLayout);

const graph = new Graph({
  container: 'container',
  data,
  animation: false,
  autoFit: 'center',
  node: {
    style: {
      labelFill: '#fff',
      labelPlacement: 'center',
      labelText: (d) => d.id,
    },
    palette: {
      type: 'group',
      field: 'cluster',
      color: ['#1783FF', '#D580FF']
    },
  },
  layout: {
    type: 'bi',
    sep: 300,
    nodeSep: 20,
    nodeSize: 32,
  },
  behaviors: ['drag-canvas', 'drag-element', 'zoom-canvas'],
});

graph.render();
