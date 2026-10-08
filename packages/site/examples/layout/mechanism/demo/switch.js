import GUI from 'lil-gui';

function addPanel(renderPanel) {
  const gui = new GUI({ container: document.body });
  gui.title('Control');
  Object.assign(gui.domElement.style, { position: 'absolute', top: '0', right: '0', zIndex: '10' });
  renderPanel(gui);
  addEventListener('pagehide', () => gui.destroy(), { once: true });
}

import { Graph } from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      layout: {
        type: 'circular',
      },
      behaviors: ['zoom-canvas', 'drag-canvas', 'drag-node'],
      data,
    });

    graph.render();

    addPanel((gui) => {
      gui
        .add({ layout: 'circular' }, 'layout', ['circular', 'grid', 'force', 'radial', 'concentric', 'mds'])
        .onChange((layout) => {
          const options = {
            circular: { type: 'circular' },
            grid: { type: 'grid' },
            force: { type: 'force', preventOverlap: true },
            radial: { type: 'radial', preventOverlap: true },
            concentric: { type: 'concentric' },
            mds: { type: 'mds', linkDistance: 100 },
          };
          graph.stopLayout();
          graph.layout(options[layout]);
        });
    });
  });
