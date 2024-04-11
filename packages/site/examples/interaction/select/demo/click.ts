import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node1', style: { x: 150, y: 250 } },
    { id: 'node2', style: { x: 350, y: 250 } },
  ],
  edges: [
    {
      id: 'edge1',
      source: 'node1',
      target: 'node2',
    },
  ],
};

const graph = new Graph({
  data,
  behaviors: [{ type: 'click-element', multiple: true, trigger: ['shift'] }],
  autoFit: 'center',
});

const prompt = document.createElement('div');
prompt.innerHTML = `👉 Press SHIFT to apply multiple selection with mouse click`;
prompt.style.position = 'absolute';
const container = document.getElementById('container');
container.appendChild(prompt);

graph.render();
