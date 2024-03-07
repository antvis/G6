import { Graph } from '@antv/g6';

/**
 * Copy the string to clipboard
 * @param str - string
 */
function copy(str) {
  const input = document.createElement('textarea');
  input.value = str;
  document.body.appendChild(input);
  input.select();
  document.execCommand('Copy');
  document.body.removeChild(input);
  alert('Copy Success!');
}

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
      labelPosition: 'center',
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

  copy(label);
});

graph.on('node:pointerenter', (e) => {
  graph.setElementState(e.target.id, 'active');
});

graph.on('node:pointerout', (e) => {
  graph.setElementState(e.target.id, '');
});
