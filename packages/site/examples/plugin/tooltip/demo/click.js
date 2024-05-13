import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: '0', data: { label: 'node-0', description: 'This is node-0.' } },
      { id: '1', data: { label: 'node-1', description: 'This is node-1.' } },
      { id: '2', data: { label: 'node-2', description: 'This is node-2.' } },
      { id: '3', data: { label: 'node-3', description: 'This is node-3.' } },
      { id: '4', data: { label: 'node-4', description: 'This is node-4.' } },
      { id: '5', data: { label: 'node-5', description: 'This is node-5.' } },
    ],
    edges: [
      { source: '0', target: '1', data: { description: 'This is edge from node 0 to node 1.' } },
      { source: '0', target: '2', data: { description: 'This is edge from node 0 to node 2.' } },
      { source: '0', target: '3', data: { description: 'This is edge from node 0 to node 3.' } },
      { source: '0', target: '4', data: { description: 'This is edge from node 0 to node 4.' } },
      { source: '0', target: '5', data: { description: 'This is edge from node 0 to node 5.' } },
    ],
  },
  layout: {
    type: 'grid',
  },
  plugins: [
    {
      type: 'tooltip',
      trigger: 'click',
      getContent: (e, items) => {
        let result = `<h4>Custom Content</h4>`;
        items.forEach((item) => {
          result += `<p>Type: ${item.data.description}</p>`;
        });
        return result;
      },
    },
  ],
  behaviors: ['drag-canvas', 'drag-element'],
});

graph.render();
