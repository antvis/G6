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
    },
    {
      id: '5',
      label: '5',
    },
    {
      id: '6',
      label: '6',
    },
    {
      id: '7',
      label: '7',
    },
    {
      id: '8',
      label: '8',
    },
    {
      id: '9',
      label: '9',
    },
    {
      id: '10',
      label: '10',
    },
    {
      id: '11',
      label: '11',
    },
    {
      id: '12',
      label: '12',
    },
    {
      id: '13',
      label: '13',
    },
    {
      id: '14',
      label: '14',
    },
    {
      id: '15',
      label: '15',
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
      source: '0',
      target: '3',
    },
    {
      source: '0',
      target: '4',
    },
    {
      source: '0',
      target: '5',
    },
    {
      source: '0',
      target: '7',
    },
    {
      source: '0',
      target: '8',
    },
    {
      source: '0',
      target: '9',
    },
    {
      source: '0',
      target: '10',
    },
    {
      source: '0',
      target: '11',
    },
    {
      source: '0',
      target: '13',
    },
    {
      source: '0',
      target: '14',
    },
    {
      source: '0',
      target: '15',
    },
    {
      source: '2',
      target: '3',
    },
    {
      source: '4',
      target: '5',
    },
    {
      source: '4',
      target: '6',
    },
    {
      source: '5',
      target: '6',
    },
    {
      source: '7',
      target: '13',
    },
    {
      source: '8',
      target: '14',
    },
    {
      source: '9',
      target: '10',
    },
    {
      source: '10',
      target: '14',
    },
    {
      source: '10',
      target: '12',
    },
    {
      source: '11',
      target: '14',
    },
    {
      source: '12',
      target: '13',
    },
  ],
};

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 110;
const snapLine = new G6.SnapLine({
  line: {
    stroke: 'red',
    lineWidth: 3,
  },
  itemAlignType: true,
});

const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  linkCenter: true,
  defaultNode: {
    size: 30,
  },
  modes: {
    default: ['drag-canvas', 'zoom-canvas', 'drag-node'],
  },
  plugins: [snapLine],
});
graph.data(data);
graph.render();

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight - 110);
  };
