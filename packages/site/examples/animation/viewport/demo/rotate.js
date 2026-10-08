import GUI from 'lil-gui';

function addPanel(renderPanel) {
  const gui = new GUI({ container: document.body });
  gui.title('Control');
  Object.assign(gui.domElement.style, { position: 'absolute', top: '0', right: '0', zIndex: '10' });
  renderPanel(gui);
  addEventListener('pagehide', () => gui.destroy(), { once: true });
}

import { Graph } from '@antv/g6';

fetch('https://assets.antv.antgroup.com/g6/force.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      layout: {
        type: 'force',
      },
    });

    graph.render();

    addPanel((gui) => {
      const animation = {
        duration: 500,
        easing: 'linear',
      };
      const config = {
        clockwise: () => graph.rotateBy(-10, animation),
        anticlockwise: () => graph.rotateBy(10, animation),
      };
      gui.add(config, 'clockwise').name('🔁 Clockwise');
      gui.add(config, 'anticlockwise').name('🔄 Anti-clockwise');
    });
  });
