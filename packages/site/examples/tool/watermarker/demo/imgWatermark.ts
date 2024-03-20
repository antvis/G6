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
      width: 200,
      height: 100,
      rotate: Math.PI / 12,
      imageURL: 'https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg',
    },
  ],
});

graph.render();
