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
      combos: [
        { id: 'combo1', combo: 'combo2' },
        { id: 'combo2', style: {} },
      ],
    },
    node: { style: { fill: '#7e3feb' } },
    combo: {
      style: {
        labelText: (d) => d.id,
        labelPadding: [1, 10],
        labelFill: '#fff',
        labelBackground: true,
        labelBackgroundRadius: 4,
        labelBackgroundFill: '#7e3feb',
      },
    },
    behaviors: ['collapse-expand'],
    plugins: [{ type: 'grid-line', size: 30 }],
    animation: true,
  },
  { width: 600, height: 400 },
  (gui, graph) => {
    const options = {
      collapsed: false,
      collapsedSize: 32,
      collapsedMarker: true,
      collapsedMarkerFontSize: 12,
      collapsedMarkerType: 'child-count',
    };

    const optionFolder = gui.addFolder('combo2.style');

    optionFolder.add(options, 'collapsed');
    optionFolder.add(options, 'collapsedSize', 0, 100, 1);
    optionFolder.add(options, 'collapsedMarker');
    optionFolder.add(options, 'collapsedMarkerFontSize', 12, 20, 1);
    optionFolder.add(options, 'collapsedMarkerType', ['child-count', 'descendant-count', 'node-count']);

    optionFolder.onChange(({ property, value }) => {
      graph.updateComboData([{ id: 'combo2', style: { [property]: value } }]);
      graph.render();
    });
  },
);
