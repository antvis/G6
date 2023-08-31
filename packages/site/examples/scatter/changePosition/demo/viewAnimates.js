import G6 from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'A',
      data: {
        x: 200,
        y: 100,
        cluster: '1',
      },
    },
    {
      id: 'B',
      data: {
        x: 100,
        y: 200,
        cluster: '2',
      },
    },
    {
      id: 'C',
      data: {
        x: 300,
        y: 200,
        cluster: '3',
      },
    },
  ],
  edges: [
    {
      id: 'a2b',
      source: 'A',
      target: 'B',
    },
    {
      id: 'a2c',
      source: 'A',
      target: 'C',
    },
  ],
};

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 50;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  theme: {
    type: 'spec',
    specification: {
      node: {
        dataTypeField: 'cluster',
      },
    },
  },
  modes: { default: ['drag-canvas', 'zoom-canvas'] },
  data,
});

const actions = {
  'Fit View': () => {
    graph.fitView({}, { duration: 500 });
  },
  'Fit Center': () => {
    graph.fitCenter({}, { duration: 500 });
  },
  'Zoom In': () => {
    const currentZoom = graph.getZoom();
    graph.zoomTo(currentZoom * 1.1, undefined, { duration: 500 });
  },
  'Zoom Out': () => {
    const currentZoom = graph.getZoom();
    graph.zoomTo((currentZoom * 1) / 1.1, undefined, { duration: 500 });
  },
  Translate: () => {
    graph.translate({ dx: Math.random() * 100 - 50, dy: Math.random() * 100 - 50 }, { duration: 500 });
  },
  '1:1': () => {
    graph.zoomTo(1, undefined, { duration: 500 });
  },
};

const btnContainer = document.createElement('div');
btnContainer.style.position = 'absolute';
container.appendChild(btnContainer);
const tip = document.createElement('span');
tip.innerHTML = '👉 Activate actions: ';
btnContainer.appendChild(tip);

Object.keys(actions).forEach((name, i) => {
  const btn = document.createElement('a');
  btn.innerHTML = name;
  btn.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
  btn.style.padding = '4px';
  btn.style.marginLeft = i > 0 ? '24px' : '8px';
  btnContainer.appendChild(btn);
  btn.addEventListener('click', () => {
    actions[name]();
  });
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight);
  };
