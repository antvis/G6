import { Graph } from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'node1',
      data: {
        label: 'Click to copy this label which is too long to be displayed',
      },
    },
  ],
  edges: [],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      x: 200,
      y: 200,
      size: 150,
      labelPlacement: 'center',
      labelText: (d) => d.data.label,
      labelMaxWidth: '90%',
      labelBackgroundFill: '#eee',
      labelBackgroundFillOpacity: 0.5,
      labelBackgroundRadius: 4,
      labelPointerEvents: 'none',
      labelBackgroundPointerEvents: 'none',
    },
  },
  behaviors: ['drag-node'],
});

graph.render();

graph.on('node:click', (e) => {
  const id = e.target.id;
  const node = graph.getNodeData(id);
  const label = node?.data?.label;

  navigator.clipboard.writeText(label as string);
  alert('copied to clipboard!');
});

graph.on('node:pointerenter', (e) => {
  graph.setElementState({ [e.target.id]: 'active' });
});

graph.on('node:pointerout', (e) => {
  graph.setElementState({ [e.target.id]: [] });
});
