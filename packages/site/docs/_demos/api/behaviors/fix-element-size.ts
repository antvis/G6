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
        { id: 'node1', style: { x: 200, y: 100, labelText: 'node1' } },
        { id: 'node2', style: { x: 360, y: 100, labelText: 'node2' } },
        { id: 'node3', style: { x: 280, y: 220, labelText: 'node3' } },
      ],
      edges: [
        { source: 'node1', target: 'node2' },
        { source: 'node1', target: 'node3' },
        { source: 'node2', target: 'node3' },
      ],
    },
    node: {
      style: { label: true, labelFill: '#666', labelFontSize: 14, labelPlacement: 'bottom' },
      state: {
        custom: { fill: '#ffa940' },
      },
    },
    edge: {
      stroke: '#8b9baf',
      state: {
        custom: { stroke: '#ffa940' },
      },
    },
    behaviors: ['zoom-canvas', 'drag-canvas', { key: 'fix-element-size', type: 'fix-element-size' }],
    plugins: [{ type: 'grid-line', size: 30 }],
    animation: true,
  },
  { width: 800, height: 400 },
  (gui, graph) => {
    const options = {
      key: 'fix-element-size',
      type: 'fix-element-size',
      animation: true,
      enable: true,
      reset: true,
    };
    const optionFolder = gui.addFolder('CollapseExpand Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'animation');
    optionFolder.add(options, 'enable');
    optionFolder.add(options, 'reset');
    optionFolder.onChange(({ property, value }) => {
      graph.updateBehavior({
        key: 'fix-element-size',
        [property]: value,
      });
      graph.render();
    });
  },
);
