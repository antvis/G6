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
        { id: 'node-0' },
        { id: 'node-1' },
        { id: 'node-2' },
        { id: 'node-3' },
        { id: 'node-4' },
        { id: 'node-5' },
      ],
      edges: [
        { source: 'node-0', target: 'node-1' },
        { source: 'node-0', target: 'node-2' },
        { source: 'node-0', target: 'node-3' },
        { source: 'node-0', target: 'node-4' },
        { source: 'node-1', target: 'node-0' },
        { source: 'node-2', target: 'node-0' },
        { source: 'node-3', target: 'node-0' },
        { source: 'node-4', target: 'node-0' },
        { source: 'node-5', target: 'node-0' },
      ],
    },
    node: { style: { fill: '#7e3feb' } },
    layout: { type: 'grid' },
    behaviors: ['drag-canvas'],
    plugins: ['grid-line', { type: 'contextmenu', key: 'contextmenu' }],
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    const options = {
      type: 'contextmenu',
      trigger: 'contextmenu',
      offsetX: 4,
      offsetY: 4,
      enable: 'always',
    };
    const optionFolder = gui.addFolder('Contextmenu Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'trigger', ['click', 'contextmenu']);
    optionFolder.add(options, 'offsetX', 0, 10, 1);
    optionFolder.add(options, 'offsetY', 0, 10, 1);
    optionFolder.add(options, 'enable', ['always', 'node', 'edge']);

    optionFolder.onChange((e) => {
      const { offsetX, offsetY, enable, ...rest } = e.object;
      let enableFn = () => true;
      if ((enable === 'node') | (enable === 'edge')) {
        enableFn = (e) => e.targetType === enable;
      }
      graph.updatePlugin({
        key: 'contextmenu',
        offset: [offsetX, offsetY],
        enable: enableFn,
        ...rest,
      });
      graph.render();
    });

    const apiFolder = gui.addFolder('Contextmenu API');
    const instance = graph.getPluginInstance('contextmenu');
    apiFolder.add(instance, 'hide');
  },
);
