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
        zoomIn: () => {
          graph.zoomBy(1.2, animation);
        },
        zoomOut: () => {
          graph.zoomBy(0.8, animation);
        },
      };
      gui.add(config, 'zoomIn');
      gui.add(config, 'zoomOut');
    });
  });
