import { Graph } from '@antv/g6';

const startTime = new Date('2023-08-01').getTime();
const diff = 3600 * 24 * 1000;
const timebarData = [10, 2, 3, 4, 15, 10, 5, 0, 3, 1].map((value, index) => ({
  time: new Date(startTime + index * diff),
  value,
  label: new Date(startTime + index * diff).toLocaleString(),
}));
const graphData = {
  nodes: new Array(49).fill(0).map((_, index) => ({
    id: `node-${index}`,
    data: {
      timestamp: startTime + (index % 10) * diff,
      value: index % 20,
      label: new Date(startTime + (index % 10) * diff).toLocaleString(),
    },
  })),
  edges: new Array(49).fill(0).map((_, i) => ({
    id: `edge-${i}`,
    source: `node-${i % 30}`,
    target: `node-${(i % 20) + 29}`,
    data: {
      edgeType: 'e1',
    },
  })),
};

const graph = new Graph({
  container: 'container',
  data: graphData,
  behaviors: ['drag-canvas', 'drag-element', 'zoom-canvas'],
  layout: {
    type: 'grid',
    cols: 7,
  },
  plugins: [
    {
      type: 'timebar',
      key: 'timebar',
      data: timebarData,
      width: 450,
      height: 100,
      loop: true,
      timebarType: 'chart',
    },
  ],
  autoFit: 'view',
  padding: [10, 0, 160, 0],
});

graph.render();
