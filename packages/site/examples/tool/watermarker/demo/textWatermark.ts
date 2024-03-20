import { Graph, Utils } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: Utils.mock(6).circle(),
  layout: {
    type: 'force',
  },
  behaviors: ['brush-select', 'zoom-canvas', 'activate-relations', 'drag-canvas', 'drag-element'],
  plugins: [
    {
      type: 'watermark',
      text: 'G6: Graph Visualization',
      textFontSize: 14,
      textFontFamily: 'Microsoft YaHei',
      fill: 'rgba(0, 0, 0, 0.1)',
      rotate: Math.PI / 12,
    },
  ],
});

graph.render();
