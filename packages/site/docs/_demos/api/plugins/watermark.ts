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
    node: { style: { fill: '#7e3feb' } },
    edge: { style: { stroke: '#8b9baf' } },
    layout: { type: 'force' },
    behaviors: ['drag-canvas'],
    plugins: [{ type: 'watermark', key: 'watermark', text: 'G6: Graph Visualization' }],
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    const options = {
      type: 'watermark',
      width: 200,
      height: 100,
      opacity: 0.2,
      rotate: Math.PI / 12,
      text: 'G6: Graph Visualization',
    };
    const optionFolder = gui.addFolder('Watermark Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'width', 1, 1280, 1);
    optionFolder.add(options, 'height', 1, 800, 1);
    optionFolder.add(options, 'opacity', 0, 1, 0.1);
    optionFolder.add(options, 'rotate', 0, 2 * Math.PI, Math.PI / 12);
    optionFolder.add(options, 'text');

    optionFolder.onChange(({ property, value }) => {
      graph.updatePlugin({
        key: 'watermark',
        [property]: value,
      });
      graph.render();
    });
  },
);
