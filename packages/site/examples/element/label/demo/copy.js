import { Graph, NodeEvent } from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'node1',
      data: {
        label: 'Click to copy this label which is too long to be displayed',
      },
    },
  ],
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
      labelWordWrap: true,
      labelMaxWidth: '90%',
      labelBackground: true,
      labelBackgroundFill: '#eee',
      labelBackgroundFillOpacity: 0.5,
      labelBackgroundRadius: 4,
      labelPointerEvents: 'none',
      labelBackgroundPointerEvents: 'none',
    },
  },
  behaviors: ['drag-element'],
  plugins: [{
    type: 'tooltip',
    getContent: (e, items) => {
      let result = `<h4>Node Label:</h4>`;
      items.forEach((item) => {
        result += `<p>${item.data.label}</p>`;
      });
      return result;
    },
  }]
});

graph.render();

graph.on('node:click', (e) => {
  const node = graph.getNodeData(e.target.id);
  const label = node?.data?.label;

  navigator.clipboard.writeText(label);
  alert('copied to clipboard!');
});

graph.on(NodeEvent.POINTER_ENTER, (e) => {
  graph.setElementState({ [e.target.id]: 'active' });
});

graph.on(NodeEvent.POINTER_OUT, (e) => {
  graph.setElementState({ [e.target.id]: [] });
});
