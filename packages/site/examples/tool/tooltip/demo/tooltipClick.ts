import { Graph } from '@antv/g6';

const data = {
  nodes: [
    {
      id: '0',
      style: {
        label: 'node-0',
        x: 100,
        y: 100,
        description: 'This is node-0.',
      },
    },
    {
      id: '1',
      style: {
        label: 'node-1',
        description: 'This is node-1.',
      },
    },
    {
      id: '2',
      style: {
        label: 'node-2',
        description: 'This is node-2.',
      },
    },
    {
      id: '3',
      style: {
        label: 'node-3',
        description: 'This is node-3.',
      },
    },
    {
      id: '4',
      style: {
        label: 'node-4',
        description: 'This is node-4.',
      },
    },
    {
      id: '5',
      style: {
        label: 'node-5',
        description: 'This is node-5.',
      },
    },
  ],
  edges: [
    {
      id: 'e0',
      source: '0',
      target: '1',
      style: {
        description: 'This is edge from node 0 to node 1.',
      },
    },
    {
      id: 'e1',
      source: '0',
      target: '2',
      style: {
        description: 'This is edge from node 0 to node 2.',
      },
    },
    {
      id: 'e2',
      source: '0',
      target: '3',
      style: {
        description: 'This is edge from node 0 to node 3.',
      },
    },
    {
      id: 'e3',
      source: '0',
      target: '4',
      style: {
        description: 'This is edge from node 0 to node 4.',
      },
    },
    {
      id: 'e4',
      source: '0',
      target: '5',
      style: {
        description: 'This is edge from node 0 to node 5.',
      },
    },
  ],
};

const tooltip = {
  type: 'tooltip',
  trigger: 'click',
  itemTypes: ['node'],
  getContent: (e) => {
    const {
      target: { id },
    } = e;
    const items = graph.getNodeData([id]);
    let result = `<h4>Custom Content</h4>`;
    items.forEach((item) => {
      result += `<p>Type: ${item.style.description}</p>`;
    });
    return result;
  },
};

const graph = new Graph({
  container: 'container',
  data,
  layout: {
    type: 'grid',
  },
  plugins: [tooltip],
  behaviors: ['drag-canvas', 'drag-element'],
});

graph.render();
