import { Graph } from '@antv/g6';

function getData(size = 10) {
  const nodes = Array.from({ length: size * size }, (_, i) => ({ id: `${i}` }));
  const edges = [];
  for (let y = 0; y < size; ++y) {
    for (let x = 0; x < size; ++x) {
      if (y > 0) edges.push({ source: `${(y - 1) * size + x}`, target: `${y * size + x}` });
      if (x > 0) edges.push({ source: `${y * size + (x - 1)}`, target: `${y * size + x}` });
    }
  }
  return { nodes, edges };
}

const graph = new Graph({
  data: getData(),
  layout: {
    type: 'd3-force',
    manyBody: {
      strength: -30,
    },
    link: {
      strength: 1,
      distance: 20,
      iterations: 10,
    },
  },
  node: {
    style: {
      size: 10,
      fill: '#000',
    },
  },
  edge: {
    style: {
      stroke: '#000',
    },
  },
  behaviors: [{ type: 'drag-element-force' }, 'zoom-canvas'],
});

graph.render();

window.addPanel((gui) => {
  gui.add({ msg: 'Try to drag nodes' }, 'msg').name('Tips').disable();
});
