import G6 from '@antv/g6';
/**
 * 本示例演示以下功能：
 * 鼠标 hover 节点更新节点样式及其标签文本
 * 鼠标 hover 边更新边样式及其标签文本
 * by 十吾
 */

const data = {
  nodes: [
    {
      id: 'node1',
      x: 100,
      y: 100,
      label: 'label before\nbeen hovered',
    },
    {
      id: 'node2',
      x: 400,
      y: 100,
      label: 'label before\nbeen hovered',
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
      label: 'label before\nbeen hovered',
      labelCfg: {
        refY: 10,
      },
    },
  ],
};


const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  defaultEdge: {
    color: '#e2e2e2',
    lineAppendWidth: 3,
  },
});
graph.data(data);
graph.render();

graph.on('node:mouseenter', function (evt) {
  const node = evt.item;
  const model = node.getModel();
  model.oriLabel = model.label;
  graph.updateItem(node, {
    label: `after been hovered ${model.id}`,
    labelCfg: {
      style: {
        fill: '#003a8c',
      },
    },
  });
});

graph.on('node:mouseleave', function (evt) {
  const node = evt.item;
  const model = node.getModel();
  graph.updateItem(node, {
    label: model.oriLabel,
    labelCfg: {
      style: {
        fill: '#555',
      },
    },
  });
});

graph.on('edge:mouseenter', function (evt) {
  const edge = evt.item;
  const model = edge.getModel();
  model.oriLabel = model.label;
  graph.updateItem(edge, {
    label: 'after been hovered',
    labelCfg: {
      style: {
        fill: '#003a8c',
      },
    },
  });
});

graph.on('edge:mouseleave', function (evt) {
  const edge = evt.item;
  graph.setItemState(edge, 'hover', false);
  graph.updateItem(edge, {
    label: 'label before \n been hovered',
    labelCfg: {
      style: {
        fill: '#555',
      },
    },
  });
});

if (window && typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight);
  };