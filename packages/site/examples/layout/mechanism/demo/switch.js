import { Graph } from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      layout: {
        type: 'circular',
      },
      behaviors: ['zoom-canvas', 'drag-canvas', 'drag-node'],
      data,
    });

    graph.render();

    window.addPanel((gui) => {
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
          graph.setLayout(options[layout]);
          graph.layout();
        });
    });
  });
