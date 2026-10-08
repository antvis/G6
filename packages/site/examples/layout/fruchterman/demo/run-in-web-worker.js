import GUI from 'lil-gui';

function addPanel(renderPanel) {
  const gui = new GUI({ container: document.body });
  gui.title('Control');
  Object.assign(gui.domElement.style, { position: 'absolute', top: '0', right: '0', zIndex: '10' });
  renderPanel(gui);
  addEventListener('pagehide', () => gui.destroy(), { once: true });
}

import { Graph, GraphEvent } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/cluster.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      layout: {
        type: 'fruchterman',
        speed: 20,
        gravity: 10,
        maxIteration: 10000,
        workerEnabled: true,
      },
      node: {
        style: {
          size: 20,
          labelText: (d) => d.id,
          labelPlacement: 'center',
        },
        palette: {
          type: 'group',
          field: 'cluster',
        },
      },
      edge: {
        style: {
          stroke: '#ddd',
        },
      },
      behaviors: ['drag-canvas', 'drag-element'],
    });

    graph.render();

    addPanel((gui) => {
      const msg = gui.add({ msg: 'Running...' }, 'msg').name('Tips').disable();
      graph.on(GraphEvent.AFTER_LAYOUT, () => {
        msg.setValue('Layout Done!');
      });
    });
  });
