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
    data: { nodes: [{ id: 'node-1' }] },
    layout: { type: 'force' },
    node: {
      style: {
        size: 60,
        labelText: 'Drag Me!',
        labelPlacement: 'middle',
        labelFill: '#fff',
        fill: '#7e3feb',
      },
    },
    edge: { style: { stroke: '#8b9baf' } },
    behaviors: ['drag-element'],
    plugins: ['grid-line', { type: 'history', key: 'history' }],
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    const options = {
      type: 'history',
      stackSize: 0,
    };
    const optionFolder = gui.addFolder('History Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'stackSize', 0, 10, 1);
    optionFolder.onChange(({ property, value }) => {
      graph.updatePlugin({
        key: 'history',
        [property]: value,
      });
      graph.render();
    });

    const apiFolder = gui.addFolder('History API');
    const instance = graph.getPluginInstance('history');
    apiFolder.add(instance, 'undo');
    apiFolder.add(instance, 'redo');
    apiFolder.add(instance, 'clear');
  },
);
