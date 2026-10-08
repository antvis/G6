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
    behaviors: [
      {
        type: 'zoom-canvas',
        key: 'zoom-canvas',
      },
    ],
    node: { style: { fill: '#873bf4' } },
    edge: { style: { stroke: '#8b9baf' } },
    plugins: [{ type: 'grid-line', size: 30 }],
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    const options = {
      key: 'zoom-canvas',
      type: 'zoom-canvas',
      animation: true,
      enable: true,
      sensitivity: 1,
      trigger: 'Use wheel by default',
    };
    const optionFolder = gui.addFolder('ZoomCanvas Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'animation');
    optionFolder.add(options, 'enable');
    optionFolder.add(options, 'sensitivity', 0, 10, 1);
    optionFolder.add(options, 'trigger', {
      'Use wheel by default': [],
      'Control+Wheel': ['Control'],
      'zoomIn:Ctrl+1 zoomOut:Ctrl+2 reset:Ctrl+0': {
        zoomIn: ['Control', '1'],
        zoomOut: ['Control', '2'],
        reset: ['Control', '0'],
      },
    });
    optionFolder.onChange(({ property, value }) => {
      graph.updateBehavior({
        key: 'zoom-canvas',
        [property]: value,
      });
      graph.render();
    });
  },
);
