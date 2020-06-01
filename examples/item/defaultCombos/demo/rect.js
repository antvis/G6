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
  // translate the graph to align the canvas's center, support by v3.5.1
  fitCenter: true,
  // Set groupByTypes to false to get rendering result with reasonable visual zIndex for combos
  groupByTypes: false,
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
    // the style configurations for the hover state on the combo
    hover: {
      lineWidth: 3
    },
  },
  nodeStateStyles: {
    // the hover configurations for the hover state on the node
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
