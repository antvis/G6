// TODO: skip this demo temporary since pipes is not supported in beta yet.

import G6 from '@antv/g6';

const data = { nodes: [], edges: [] };
for (let i = 0; i < 32; i++) {
  data.nodes.push({
    id: `${i}`,
    label: i < 17 ? `employee-${i}` : `company-${i - 17}`,
    dataType: i < 17 ? 'employee' : 'company',
    style:
      i < 17
        ? { stroke: '#5D7092', fill: '#5D7092', fillOpacity: 0.5 }
        : { stroke: '#5B8FF9', fill: '#5B8FF9', fillOpacity: 0.5 },
  });
}
data.edges = [
  { source: '0', target: '1' },
  { source: '0', target: '2' },
  { source: '0', target: '3' },
  { source: '0', target: '4' },
  { source: '0', target: '5' },
  { source: '0', target: '6' },
  { source: '1', target: '2' },
  { source: '1', target: '3' },
  { source: '1', target: '4' },
  { source: '1', target: '5' },
  { source: '1', target: '6' },
  { source: '2', target: '3' },
  { source: '2', target: '4' },
  { source: '2', target: '5' },
  { source: '2', target: '6' },

  { source: '7', target: '8' },
  { source: '8', target: '9' },
  { source: '9', target: '10' },

  { source: '11', target: '12' },
  { source: '12', target: '13' },
  { source: '13', target: '14' },
  { source: '14', target: '15' },
  { source: '15', target: '16' },
  { source: '11', target: '14' },

  { source: '31', target: '11' },
  { source: '24', target: '4' },
  { source: '23', target: '7' },
];

const legendData = {
  nodes: [
    { id: 'employee', label: 'employee', style: { stroke: '#5D7092', fill: '#5D7092' } },
    { id: 'company', label: 'company', style: { stroke: '#5B8FF9', fill: '#5B8FF9' } },
  ],
  edges: [],
};

const legend = new G6.Legend({
  data: legendData,
  align: 'center',
  layout: 'horizontal', // vertical
  position: 'bottom-left',
  vertiSep: 12,
  horiSep: 24,
  offsetY: -24,
  padding: [4, 16, 8, 16],
  containerStyle: {
    fill: '#ccc',
    lineWidth: 1,
  },
  title: 'Legend',
  titleConfig: {
    position: 'left',
    offsetX: 0,
    offsetY: 12,
  },
  filter: {
    enable: true,
    multiple: true,
    trigger: 'click',
    graphActiveState: 'activeByLegend',
    graphInactiveState: 'inactiveByLegend',
    filterFunctions: {
      a: (d) => {
        if (d.cluster === 'a') return true;
        return false;
      },
      b: (d) => {
        if (d.cluster === 'b') return true;
        return false;
      },
      c: (d) => {
        if (d.cluster === 'c') return true;
        return false;
      },
      d: (d) => {
        if (d.cluster === 'd') return true;
        return false;
      },
    },
  },
});

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  modes: {
    default: ['zoom-canvas', 'drag-canvas', 'drag-node', 'click-select'],
  },
  plugins: [legend],
  animate: true,
  nodeStateStyles: {
    activeByLegend: {
      lineWidth: 5,
      strokeOpacity: 0.5,
      stroke: '#f00',
    },
    inactiveByLegend: {
      opacity: 0.5,
    },
  },
  layout: {
    pipes: [
      {
        type: 'circular',
        nodesFilter: (node) => +node.id <= 6,
        center: [(width / 5) * 4 - 30, height / 2],
        radius: width / 10,
      },
      {
        type: 'circular',
        nodesFilter: (node) => +node.id >= 7 && +node.id <= 10,
        center: [width / 20 + 30, (height / 3) * 2],
        radius: width / 20,
      },
      {
        type: 'circular',
        nodesFilter: (node) => +node.id >= 11 && +node.id <= 16,
        center: [width / 20 + 30, height / 3],
        radius: width / 20,
      },
      {
        type: 'grid',
        nodesFilter: (node) => +node.id > 16,
        begin: [width / 10 + 50, 20],
        width: (width / 5) * 3 - 100,
        height: height - 40,
      },
    ],
  },
});
graph.data(data);
graph.render();

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight);
  };
