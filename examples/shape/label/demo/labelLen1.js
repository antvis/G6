import G6 from '@antv/g6';
/**
 * 该案例演示当label太长时候，如何换行显示。
 * by 镜曦。
 *
 */
const data = {
  nodes: [
    {
      x: 100,
      y: 100,
      label: '这个文案\n有点长',
      id: 'node1',
      labelCfg: {
        position: 'bottom',
      },
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
    },
    {
      x: 300,
      y: 100,
      label: '这个文案\n也有点长',
      id: 'node2',
      labelCfg: {
        position: 'bottom',
      },
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
      label: 'label上面这个文本太长了\n我需要换行',
      labelCfg: {
        refY: 20,
      },
      style: {
        endArrow: true,
      },
    },
  ],
};

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  defaultNode: {
    type: 'rect',
    style: {
      fill: '#DEE9FF',
      stroke: '#5B8FF9',
    },
  },
  defaultEdge: {
    color: '#F6BD16',
  },
});
graph.data(data);
graph.render();
