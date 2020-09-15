import G6 from '@antv/g6';

const data = {
  nodes: [
    { id: 'node1', x: 350, y: 200, comboId: 'combo1' },
    { id: 'node2', x: 350, y: 250, comboId: 'combo1' },
    { id: 'node3', x: 100, y: 200, comboId: 'combo3' },
  ],
  edges: [
    { source: 'node1', target: 'node2' },
    { source: 'node1', target: 'node3' },
    { source: 'combo1', target: 'node3' },
  ],
  combos: [
    { id: 'combo1', label: 'Combo 1', parentId: 'combo2' },
    { id: 'combo2', label: 'Combo 2' },
    { id: 'combo3', label: 'Combo 3' },
  ],
};
const descriptionDiv = document.createElement('div');
descriptionDiv.innerHTML =
  'Double click the combo to collapse/expand it. Drag the node or combo to change the hierarchy.';
const graphDiv = document.getElementById('container');
graphDiv.appendChild(descriptionDiv);

const width = document.getElementById('container').scrollWidth;
const height = (document.getElementById('container').scrollHeight || 500) - 20;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  // Set groupByTypes to false to get rendering result with reasonable visual zIndex for combos
  groupByTypes: false,
  defaultCombo: {
    type: 'rect',
    size: [40, 10], // The minimum size of the Combo
    padding: [30, 20, 10, 20],
    style: {
      lineWidth: 1,
    },
    labelCfg: {
      refY: 10,
      refX: 20,
      position: 'top',
    },
  },
  comboStateStyles: {
    dragenter: {
      lineWidth: 4,
      stroke: '#FE9797',
    },
  },
  modes: {
    default: ['drag-canvas', 'drag-node', 'drag-combo', 'collapse-expand-combo'],
  },
});

graph.data(data);
graph.render();

graph.on('combo:dragend', (e) => {
  graph.getCombos().forEach((combo) => {
    graph.setItemState(combo, 'dragenter', false);
  });
});
graph.on('node:dragend', (e) => {
  graph.getCombos().forEach((combo) => {
    graph.setItemState(combo, 'dragenter', false);
  });
});

graph.on('combo:dragenter', (e) => {
  graph.setItemState(e.item, 'dragenter', true);
});
graph.on('combo:dragleave', (e) => {
  graph.setItemState(e.item, 'dragenter', false);
});
