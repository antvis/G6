import { Graph } from '@antv/g6';

const ALLOWED_TRIGGERS = ['shift', 'alt', 'ctrl', 'drag', 'meta'];

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: 'node1', style: { x: 150, y: 250, lineWidth: 0 } },
      { id: 'node2', style: { x: 250, y: 200, lineWidth: 0 } },
    ],
    edges: [
      {
        id: 'edge1',
        source: 'node1',
        target: 'node2',
      },
    ],
  },
  behaviors: [
    {
      type: 'brush-select',
      selectSetMode: 'diff',
      trigger: 'shift',
      brushStyle: {
        color: '#00f',
        fillOpacity: 0.2,
        stroke: '#0ff',
      },
    },
  ],
});

const switchDiv = document.createElement('div');
switchDiv.innerHTML = `👉 Trigger：`;
switchDiv.style.position = 'absolute';
switchDiv.style.zIndex = 10;
container.appendChild(switchDiv);
const selector = document.createElement('select');
selector.id = 'selector';
ALLOWED_TRIGGERS.forEach((trigger, index) => {
  const option = document.createElement('option');
  option.value = trigger;
  option.innerHTML = `${trigger}`;
  selector.appendChild(option);
});
switchDiv.appendChild(selector);

// Listen to the selector, change the graph mode when the selector is changed
selector.addEventListener('change', (e) => {
  const value = e.target.value;
  // change the graph mode
  graph.setBehaviors([
    {
      type: 'brush-select',
      trigger: value,
    },
  ]);
});

graph.render();
