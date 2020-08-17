import G6 from '@antv/g6';
const data = {
  nodes: [
    {
      id: '0',
      label: '0',
    },
    {
      id: '1',
      label: '1',
    },
    {
      id: '2',
      label: '2',
    },
    {
      id: '3',
      label: '3',
    },
    {
      id: '4',
      label: '4',
      comboId: 'A',
    },
    {
      id: '5',
      label: '5',
      comboId: 'B',
    },
    {
      id: '6',
      label: '6',
      comboId: 'A',
    },
    {
      id: '7',
      label: '7',
      comboId: 'C',
    },
    {
      id: '8',
      label: '8',
      comboId: 'C',
    },
    {
      id: '9',
      label: '9',
      comboId: 'A',
    },
    {
      id: '10',
      label: '10',
      comboId: 'B',
    },
    {
      id: '11',
      label: '11',
      comboId: 'B',
    },
  ],
  edges: [
    {
      source: '0',
      target: '1',
    },
    {
      source: '0',
      target: '2',
    },
    {
      source: '1',
      target: '4',
    },
    {
      source: '0',
      target: '3',
    },
    {
      source: '3',
      target: '4',
    },
    {
      source: '2',
      target: '5',
    },
    {
      source: '1',
      target: '6',
    },
    {
      source: '1',
      target: '7',
    },
    {
      source: '3',
      target: '8',
    },
    {
      source: '3',
      target: '9',
    },
    {
      source: '5',
      target: '10',
    },
    {
      source: '5',
      target: '11',
    },
  ],
  combos: [
    {
      id: 'A',
      label: 'combo A',
    },
    {
      id: 'B',
      label: 'combo B',
    },
    {
      id: 'C',
      label: 'combo C',
    },
  ],
};

let sortByCombo = false;
const descriptionDiv = document.createElement('button');
descriptionDiv.innerHTML = 'Enable sortByCombo';
const container = document.getElementById('container');
container.appendChild(descriptionDiv);

descriptionDiv.addEventListener('click', (e) => {
  sortByCombo = !sortByCombo;
  descriptionDiv.innerHTML = sortByCombo ? 'Disable sortByCombo' : 'Enable sortByCombo';
  graph.updateLayout({
    sortByCombo,
  });
});
const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height: height - 50,
  linkCenter: true,
  fitView: true,
  fitViewPadding: 30,
  animate: true,
  modes: {
    default: [
      'drag-combo',
      'drag-node',
      {
        type: 'collapse-expand-combo',
        relayout: false,
      },
    ],
  },
  layout: {
    type: 'dagre',
    sortByCombo: false,
  },
  defaultNode: {
    size: [30, 20],
    type: 'rect',
  },
  defaultEdge: {
    type: 'line',
  },
  defaultCombo: {
    type: 'rect',
  },
});
graph.data(data);
graph.render();
