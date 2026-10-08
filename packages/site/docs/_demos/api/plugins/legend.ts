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
        {
          id: 'node-1',
          type: 'circle',
          data: { cluster: 'node-type1' },
        },
        {
          id: 'node-2',
          type: 'rect',
          data: { cluster: 'node-type2' },
        },
        {
          id: 'node-3',
          type: 'triangle',
          data: { cluster: 'node-type3' },
        },
        {
          id: 'node-4',
          type: 'diamond',
          data: { cluster: 'node-type4' },
        },
      ],
      edges: [
        {
          source: 'node-1',
          target: 'node-2',
          data: { cluster: 'edge-type1' },
        },
        {
          source: 'node-1',
          target: 'node-4',
          data: { cluster: 'edge-type2' },
        },
        {
          source: 'node-3',
          target: 'node-4',
        },
        {
          source: 'node-2',
          target: 'node-4',
          data: { cluster: 'edge-type3' },
        },
      ],
    },
    layout: { type: 'grid', cols: 2 },
    node: {
      style: { size: 24 },
      palette: {
        field: 'cluster',
      },
    },
    behaviors: ['drag-canvas'],
    plugins: [
      'grid-line',
      {
        type: 'legend',
        key: 'legend',
        nodeField: 'cluster',
        edgeField: 'cluster',
        itemLabelFontSize: 12,
      },
    ],
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    const options = {
      type: 'legend',
      trigger: 'hover',
      position: 'bottom',
      itemSpacing: 4,
      rowPadding: 10,
      colPadding: 10,
      itemMarkerSize: 16,
      itemLabelFontSize: 12,
    };
    const optionFolder = gui.addFolder('Legend Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'trigger', ['hover', 'click']);
    optionFolder.add(options, 'position', ['left', 'right', 'top', 'bottom']);
    optionFolder.add(options, 'itemSpacing', 0, 20, 1);
    optionFolder.add(options, 'colPadding', 0, 20, 1);
    optionFolder.add(options, 'rowPadding', 0, 20, 1);
    optionFolder.add(options, 'itemMarkerSize', 12, 20, 1);
    optionFolder.add(options, 'itemLabelFontSize', 12, 20, 1);

    optionFolder.onChange(({ property, value }) => {
      graph.updatePlugin({
        key: 'legend',
        [property]: value,
      });
      graph.render();
    });
  },
);
