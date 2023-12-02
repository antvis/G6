import { Graph, extend, Extensions } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node1', data: { x: 150, y: 250 } },
    { id: 'node2', data: { x: 350, y: 250 } },
  ],
  edges: [
    {
      id: 'edge1',
      source: 'node1',
      target: 'node2',
    },
  ],
};

const container = document.getElementById('container');

const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 30;

const ExtGraph = extend(Graph, {
  behaviors: {
    'hover-activate': Extensions.HoverActivate,
  },
});

const modes = {};
const ALLOWED_TRIGGERS = ['shift', 'ctrl', 'alt', 'meta'];
ALLOWED_TRIGGERS.forEach((trigger) => {
  const defaultBehavior = ['drag-node', 'hover-activate'];
  if (trigger === 'shift') {
    modes.default = [...defaultBehavior, 'click-select'];
  } else {
    modes[`${trigger}Select`] = [
      ...defaultBehavior,
      {
        type: 'click-select',
        trigger: trigger,
      },
    ];
  }
});

const graph = new ExtGraph({
  container,
  width,
  height,
  autoFit: 'center',
  modes,
  data,
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
  const mode = value === 'shift' ? 'default' : `${value}Select`;
  // change the graph mode
  graph.setMode(mode);
});

window.graph = graph;