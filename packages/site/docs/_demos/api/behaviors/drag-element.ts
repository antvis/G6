import GUI from 'lil-gui';

function addPanel(renderPanel) {
  const gui = new GUI({ container: document.body });
  gui.title('Control');
  Object.assign(gui.domElement.style, { position: 'absolute', top: '0', right: '0', zIndex: '10' });
  renderPanel(gui);
  addEventListener('pagehide', () => gui.destroy(), { once: true });
}

import { Graph as DemoGraph } from '@antv/g6';

async function createGraph(options, size = {}, renderPanel) {
  const container = document.createElement('div');
  Object.assign(container.style, {
    width: '100%', maxWidth: `${size.width || 600}px`, height: `${size.height || 400}px`,
  });
  document.getElementById('container').append(container);
  const graph = new DemoGraph({ ...size, ...options, width: container.clientWidth, container, autoResize: true });
  addEventListener('pagehide', () => graph.destroy(), { once: true });
  await graph.render();
  if (renderPanel) addPanel((gui) => renderPanel(gui, graph));
  return container;
}

createGraph(
  {
    data: {
      nodes: [
        { id: 'node1', combo: 'combo1', style: { x: 250, y: 150 } },
        { id: 'node2', combo: 'combo1', style: { x: 350, y: 150 } },
        { id: 'node3', combo: 'combo2', style: { x: 250, y: 300 } },
      ],
      edges: [],
      combos: [
        { id: 'combo1', combo: 'combo2' },
        { id: 'combo2', style: {} },
      ],
    },
    node: { style: { fill: '#873bf4' } },
    edge: { style: { stroke: '#8b9baf' } },
    behaviors: [
      {
        type: 'drag-element',
        key: 'drag-element',
      },
    ],
    plugins: [{ type: 'grid-line', size: 30 }],
    animation: true,
  },
  { width: 600, height: 400 },
  (gui, graph) => {
    const options = {
      key: 'drag-element',
      type: 'drag-element',
      animation: true,
      enable: 'node,combo',
      dropEffect: 'move',
      state: 'selected',
      hideEdge: 'none',
      shadow: false,
    };
    const optionFolder = gui.addFolder('DragElement Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'animation');
    optionFolder.add(options, 'enable', {
      'node,combo': (event) => ['node', 'combo'].includes(event.targetType),
      node: (event) => ['node'].includes(event.targetType),
      combo: (event) => ['combo'].includes(event.targetType),
      none: false,
    });
    optionFolder.add(options, 'dropEffect', ['link', 'move', 'none']);
    optionFolder.add(options, 'hideEdge', ['none', 'all', 'in', 'out', 'both']);
    optionFolder.add(options, 'shadow');

    optionFolder.onChange(({ property, value }) => {
      graph.updateBehavior({
        key: 'drag-element',
        [property]: value,
      });
      graph.render();
    });
  },
);
