import { ExtensionCategory, Graph, Line, register } from '@antv/g6';

class PathInLine extends Line {
  onCreate() {
    const shape = this.shapeMap.key;
    const length = shape.getTotalLength();
    shape.animate([{ lineDash: [0, length] }, { lineDash: [length, 0] }], {
      duration: 500,
      fill: 'both',
    });
  }
}

register(ExtensionCategory.EDGE, 'path-in-line', PathInLine);

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: 'node-0', style: { x: 50, y: 50 } },
      { id: 'node-1', style: { x: 200, y: 50 } },
    ],
  },
  edge: {
    type: 'path-in-line',
    animation: {
      // disable default enter and exit animation
      enter: false,
      exit: false,
    },
  },
});

graph.render();

window.addPanel((gui) => {
  const config = {
    connect: () => {
      const edge = graph.getEdgeData('edge-1');
      if (edge) {
        alert('The edge already exists.');
        return;
      }

      graph.addEdgeData([{ id: 'edge-1', source: 'node-0', target: 'node-1' }]);
      graph.draw();
    },
    disconnect: () => {
      const edge = graph.getEdgeData('edge-1');
      if (edge) {
        graph.removeEdgeData(['edge-1']);
        graph.draw();
      }
    },
  };
  gui.add(config, 'connect');
  gui.add(config, 'disconnect');
});
