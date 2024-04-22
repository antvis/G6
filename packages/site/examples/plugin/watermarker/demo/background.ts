import { Graph } from '@antv/g6';

const data = {
  nodes: [{ id: 'node-0' }, { id: 'node-1' }, { id: 'node-2' }, { id: 'node-3' }, { id: 'node-4' }, { id: 'node-5' }],
  edges: [
    { source: 'node-0', target: 'node-1' },
    { source: 'node-0', target: 'node-2' },
    { source: 'node-0', target: 'node-3' },
    { source: 'node-0', target: 'node-4' },
    { source: 'node-1', target: 'node-0' },
    { source: 'node-2', target: 'node-0' },
    { source: 'node-3', target: 'node-0' },
    { source: 'node-4', target: 'node-0' },
    { source: 'node-5', target: 'node-0' },
  ],
};

const graph = new Graph({
  container: 'container',
  width: 800,
  height: 600,
  data,
  layout: {
    type: 'force',
  },
  behaviors: ['brush-select', 'zoom-canvas', 'activate-relations', 'drag-canvas', 'drag-element'],
  plugins: [
    {
      type: 'watermark',
      // 保持和下面图片大小一致，显示更清晰
      width: 1280,
      height: 830,
      rotate: 0,
      opacity: 0.7,
      imageURL: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*0Qq0ToQm1rEAAAAAAAAAAAAADmJ7AQ/original',
      backgroundSize: 'cover',
    },
  ],
});

graph.render();
