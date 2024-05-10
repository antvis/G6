import { ExtensionCategory, Graph, Line, register } from '@antv/g6';

class AntLine extends Line {
  onCreate() {
    const shape = this.shapeMap.key;
    shape.animate([{ lineDashOffset: -20 }, { lineDashOffset: 0 }], {
      duration: 500,
      iterations: Infinity,
    });
  }
}

register(ExtensionCategory.EDGE, 'ant-line', AntLine);

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: 'node-1', style: { x: 50, y: 50 } },
      { id: 'node-2', style: { x: 200, y: 50 } },
      { id: 'node-3', style: { x: 125, y: 150 } },
    ],
    edges: [
      { source: 'node-1', target: 'node-2' },
      { source: 'node-2', target: 'node-3' },
      { source: 'node-3', target: 'node-1' },
    ],
  },
  edge: {
    type: 'ant-line',
    style: {
      lineDash: [10, 10],
    },
  },
});

graph.render();

window.addPanel((gui) => {
  const config = {
    lineDash: 10,
  };
  gui.add(config, 'lineDash', 1, 20, 1).onChange((lineDash) => {
    graph.setEdge({
      type: 'ant-line',
      style: {
        lineDash: [lineDash, lineDash],
      },
    });
    graph.draw();
  });
});
