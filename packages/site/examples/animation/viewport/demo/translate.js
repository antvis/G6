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

    window.addPanel((gui) => {
      const animation = {
        duration: 500,
        easing: 'linear',
      };
      const config = {
        Up: () => graph.translateBy([0, -50], animation),
        Down: () => graph.translateBy([0, 50], animation),
        Left: () => graph.translateBy([-50, 0], animation),
        Right: () => graph.translateBy([50, 0], animation),
      };
      gui.add(config, 'Up').name('⬆️ Up');
      gui.add(config, 'Down').name('⬇️ Down');
      gui.add(config, 'Left').name('⬅️ Left');
      gui.add(config, 'Right').name('➡️ Right');
    });
  });
