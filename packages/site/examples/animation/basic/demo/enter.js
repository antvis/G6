import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: 'node-0', style: { x: 50, y: 50 } },
      { id: 'node-1', style: { x: 200, y: 50 } },
    ],
    edges: [{ source: 'node-0', target: 'node-1' }],
  },
  node: {
    animation: {
      enter: [
        {
          fields: ['opacity'],
          duration: 1000,
          easing: 'linear',
        },
      ],
    },
  },
  edge: {
    animation: {
      enter: [
        {
          fields: ['opacity'],
          duration: 1000,
          easing: 'linear',
        },
      ],
    },
  },
});

graph.render();

window.addPanel((gui) => {
  const config = {
    index: 2,
    duration: 1000,
    easing: 'linear',
    add: () => {
      const { index } = config;
      const y = 50 + 25 * index;
      graph.addData({
        nodes: [
          { id: `node-${index + 1}`, style: { x: 50, y } },
          { id: `node-${index + 2}`, style: { x: 200, y } },
        ],
        edges: [{ source: `node-${index + 1}`, target: `node-${index + 2}` }],
      });
      graph.draw();
      config.index += 2;
    },
  };

  const updateMapper = (key, value) => {
    const { node, edge } = graph.getOptions();
    node.animation.enter[0][key] = value;
    edge.animation.enter[0][key] = value;
    graph.setNode(node);
    graph.setEdge(edge);
  };

  gui.add(config, 'duration', 500, 5000, 100).onChange((duration) => {
    updateMapper('duration', duration);
  });
  // see: https://g.antv.antgroup.com/en/api/animation/waapi#easing-1
  gui.add(config, 'easing', ['linear', 'ease-in-sine', 'ease-in-cubic']).onChange((easing) => {
    updateMapper('easing', easing);
  });
  gui.add(config, 'add').name('Add Element');
});
