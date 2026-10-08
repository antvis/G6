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
    autoFit: 'center',
    data: {
      nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }, { id: 'node4' }, { id: 'node5' }],
      edges: [
        { source: 'node1', target: 'node2' },
        { source: 'node2', target: 'node3' },
        { source: 'node3', target: 'node4' },
        { source: 'node4', target: 'node5' },
        { source: 'node1', target: 'node4' },
        { source: 'node1', target: 'node3' },
      ],
    },
    node: {
      type: 'circle',
      style: {
        labelText: (d) => d.id + ' - ' + d.style.size[0].toFixed(0),
      },
    },
    layout: {
      type: 'circular',
      radius: 180,
    },
    behaviors: ['drag-canvas'],
    transforms: [
      {
        key: 'map-node-size',
        type: 'map-node-size',
        centrality: {
          type: 'pagerank',
        },
      },
    ],
  },
  { width: 600, height: 460 },
  (gui, graph) => {
    const options = {
      type: 'degree',
    };
    const optionFolder = gui.addFolder('Centrality Options');
    optionFolder.add(options, 'type', ['degree', 'betweenness', 'closeness', 'eigenvector', 'pagerank']);
    optionFolder.onChange(async ({ property, value }) => {
      graph.updateTransform({
        key: 'map-node-size',
        centrality: {
          [property]: value,
        },
      });
      graph.render();
    });
  },
);
