import G6 from '@antv/g6';

const data = {
  nodes: [{
    id: '0',
    label: '0'
  },
  {
    id: '1',
    label: '1'
  },
  {
    id: '2',
    label: '2'
  },
  {
    id: '3',
    label: '3'
  },
  {
    id: '4',
    label: '4'
  },
  {
    id: '5',
    label: '5'
  },
  {
    id: '6',
    label: '6'
  },
  {
    id: '7',
    label: '7'
  },
  {
    id: '8',
    label: '8'
  },
  {
    id: '9',
    label: '9'
  },
  {
    id: '10',
    label: '10'
  },
  {
    id: '11',
    label: '11'
  },
  {
    id: '12',
    label: '12'
  },
  {
    id: '13',
    label: '13'
  },
  {
    id: '14',
    label: '14'
  },
  {
    id: '15',
    label: '15'
  }],
  edges: [{
    source: '0',
    target: '1'
  },
  {
    source: '0',
    target: '2'
  },
  {
    source: '0',
    target: '3'
  },
  {
    source: '0',
    target: '4'
  },
  {
    source: '0',
    target: '5'
  },
  {
    source: '0',
    target: '7'
  },
  {
    source: '0',
    target: '8'
  },
  {
    source: '0',
    target: '9'
  },
  {
    source: '0',
    target: '10'
  },
  {
    source: '0',
    target: '11'
  },
  {
    source: '0',
    target: '13'
  },
  {
    source: '0',
    target: '14'
  },
  {
    source: '0',
    target: '15'
  },
  {
    source: '2',
    target: '3'
  },
  {
    source: '4',
    target: '5'
  },
  {
    source: '4',
    target: '6'
  },
  {
    source: '5',
    target: '6'
  },
  {
    source: '7',
    target: '13'
  },
  {
    source: '8',
    target: '14'
  },
  {
    source: '9',
    target: '10'
  },
  {
    source: '10',
    target: '14'
  },
  {
    source: '10',
    target: '12'
  },
  {
    source: '11',
    target: '14'
  },
  {
    source: '12',
    target: '13'
  }]
};
const descriptionDiv = document.createElement('div');
descriptionDiv.innerHTML = 'Dagre 布局，层级间距：1，同层节点间距：1，布局方向：Top->Bottom，节点对齐方式：DL';
const container = document.getElementById('container');
container.appendChild(descriptionDiv);
const width = container.scrollWidth;
const height = container.scrollHeight - 30;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  fitView: true,
  modes: {
    default: [ 'drag-canvas', 'drag-node' ]
  },
  layout: {
    type: 'dagre',
    nodeSize: [ 40, 20 ],
    nodesep: 1,
    ranksep: 1
  },
  animate: true,
  defaultNode: {
    size: [ 40, 20 ],
    shape: 'rect',
    style: {
      lineWidth: 2,
      stroke: '#5B8FF9',
      fill: '#C6E5FF'
    }
  },
  defaultEdge: {
    size: 1,
    color: '#e2e2e2',
    style: {
      endArrow: {
        path: 'M 4,0 L -4,-4 L -4,4 Z',
        d: 4
      }
    }
  }
});
graph.data(data);
graph.render();

layoutConfigTranslation();

function layoutConfigTranslation() {
  setTimeout(function() {
    descriptionDiv.innerHTML = 'Dagre 布局，层级间距：10，同层节点间距：1，布局方向：Top->Bottom，节点对齐方式：DL';
    graph.updateLayout({
      ranksep: 10
    });
  }, 1000);

  setTimeout(function() {
    descriptionDiv.innerHTML = 'Dagre 布局，层级间距：10，同层节点间距：5，布局方向：Left->Right，节点对齐方式：DL';
    graph.updateLayout({
      nodesep: 5
    });
  }, 2500);

  setTimeout(function() {
    descriptionDiv.innerHTML = 'Dagre 布局，层级间距：10，同层节点间距：5，布局方向：Left->Right，节点对齐方式：UL';
    graph.updateLayout({
      align: 'UL'
    });
  }, 4000);

  setTimeout(function() {
    descriptionDiv.innerHTML = 'Dagre 布局，层级间距：10，同层节点间距：5，布局方向：Left->Right，节点对齐方式：UR';
    graph.updateLayout({
      align: 'UR'
    });
  }, 5500);

  setTimeout(function() {
    descriptionDiv.innerHTML = 'Dagre 布局，层级间距：10，同层节点间距：5，布局方向：Left->Right，节点对齐方式：Down Right，节点对齐方式：DL';
    graph.updateLayout({
      rankdir: 'LR',
      align: 'DL'
    });
  }, 7000);

  setTimeout(function() {
    descriptionDiv.innerHTML = 'Dagre 布局，层级间距：30，同层节点间距：5，布局方向：Left->Right，节点对齐方式：Down Right，节点对齐方式：DL';
    graph.updateLayout({
      ranksep: 30
    });
  }, 8500);
}
