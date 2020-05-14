import G6 from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'node1',
      x: 250,
      y: 150,
      comboId: 'combo'
    },
    {
      id: 'node2',
      x: 350,
      y: 150,
      comboId: 'combo'
    },
  ],
  combos: [{
    id: 'combo',
    label: 'Combo'
  }]
};

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  defaultCombo: {
    type: 'rect',
    size: [50, 50], // Combo 的最小大小
    style: {
      lineWidth: 1,
    },
    labelCfg: {
      refY: 10,
      position: 'top',
      style: {
        fontSize: 18,
      }
    }
  },
  modes: {
    default: ['drag-canvas', 'drag-node', 'drag-combo', 'collapse-expand-combo'],
  },
  comboStateStyles: {
    // 鼠标 hover 状态下 combo 样式
    hover: {
      lineWidth: 3
    },
  },
  nodeStateStyles: {
    // 鼠标 hover 状态下节点样式
    hover: {
      lineWidth: 3
    },
  },
});

graph.data(data);
graph.render();

graph.on('combo:mouseenter', evt => {
  const { item } = evt;
  graph.setItemState(item, 'hover', true);
});

graph.on('combo:mouseleave', evt => {
  const { item } = evt;
  graph.setItemState(item, 'hover', false);
});
