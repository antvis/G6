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
      update: [{ fields: ['x', 'y', 'size'] }, { fields: ['fill'], shape: 'key' }],
    },
  },
  edge: {
    animation: {
      update: [{ fields: ['sourceNode', 'targetNode'] }, { fields: ['stroke', 'lineWidth'], shape: 'key' }],
    },
  },
});

graph.render();

window.addPanel((gui) => {
  const colors = ['red', 'blue', 'green', 'yellow', 'black', 'purple', 'orange', 'gray'];
  let [nextOffsetY, nextSize, nextLineWidth] = [50, 50, 5];
  const config = {
    color: () => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      graph.updateData({
        nodes: [
          { id: 'node-0', style: { fill: color } },
          { id: 'node-1', style: { fill: color } },
        ],
        edges: [{ source: 'node-0', target: 'node-1', style: { stroke: color } }],
      });
      graph.draw();
    },
    position: () => {
      const offsetY = nextOffsetY;
      graph.translateElementBy({
        'node-0': [0, offsetY],
        'node-1': [0, offsetY],
      });
      nextOffsetY = -nextOffsetY;
    },
    size: () => {
      const size = nextSize;
      const lineWidth = nextLineWidth;
      graph.updateData({
        nodes: [
          { id: 'node-0', style: { size } },
          { id: 'node-1', style: { size } },
        ],
        edges: [{ source: 'node-0', target: 'node-1', style: { lineWidth } }],
      });
      graph.draw();
      [nextSize, nextLineWidth] = [nextSize === 50 ? 16 : 50, nextLineWidth === 5 ? 1 : 5];
    },
  };
  gui.add(config, 'color').name('fill & stroke');
  gui.add(config, 'position').name('position');
  gui.add(config, 'size').name('size & lineWidth');
});
