import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node1', style: { x: 150, y: 250 } },
    { id: 'node2', style: { x: 350, y: 250 } },
  ],
  edges: [{ source: 'node1', target: 'node2' }],
};

const graph = new Graph({
  data,
  behaviors: [{ type: 'click-select', multiple: true, trigger: ['shift'] }, 'drag-element'],
  autoFit: 'center',
});

graph.render();

const prompt = document.createElement('div');
prompt.innerHTML = `👉 Press SHIFT to enable multiple selection`;
prompt.style.position = 'absolute';
const container = document.getElementById('container');
container.appendChild(prompt);
