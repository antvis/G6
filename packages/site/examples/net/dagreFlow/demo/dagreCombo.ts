import { Graph } from '@antv/g6';

const data = {
  nodes: [
    {
      id: '0',
    },
    {
      id: '1',
    },
    {
      id: '2',
    },
    {
      id: '3',
    },
    {
      id: '4',
      style: {
        parentId: 'A',
      },
    },
    {
      id: '5',
      style: {
        parentId: 'B',
      },
    },
    {
      id: '6',
      style: {
        parentId: 'A',
      },
    },
    {
      id: '7',
      style: {
        parentId: 'C',
      },
    },
    {
      id: '8',
      style: {
        parentId: 'C',
      },
    },
    {
      id: '9',
      style: {
        parentId: 'A',
      },
    },
    {
      id: '10',
      style: {
        parentId: 'B',
      },
    },
    {
      id: '11',
      style: {
        parentId: 'B',
      },
    },
  ],
  edges: [
    {
      id: 'edge-102',
      source: '0',
      target: '1',
    },
    {
      id: 'edge-161',
      source: '0',
      target: '2',
    },
    {
      id: 'edge-237',
      source: '1',
      target: '4',
    },
    {
      id: 'edge-253',
      source: '0',
      target: '3',
    },
    {
      id: 'edge-133',
      source: '3',
      target: '4',
    },
    {
      id: 'edge-320',
      source: '2',
      target: '5',
    },
    {
      id: 'edge-355',
      source: '1',
      target: '6',
    },
    {
      id: 'edge-823',
      source: '1',
      target: '7',
    },
    {
      id: 'edge-665',
      source: '3',
      target: '8',
    },
    {
      id: 'edge-884',
      source: '3',
      target: '9',
    },
    {
      id: 'edge-536',
      source: '5',
      target: '10',
    },
    {
      id: 'edge-401',
      source: '5',
      target: '11',
    },
  ],
  combos: [
    {
      id: 'A',
      style: {
        type: 'rect',
      },
    },
    {
      id: 'B',
      style: {
        type: 'rect',
      },
    },
    {
      id: 'C',
      style: {
        type: 'rect',
      },
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  layout: {
    type: 'dagre',
    ranksep: 50,
    nodesep: 5,
  },
  node: {
    style: {
      type: 'rect',
      size: [60, 30],
      radius: 8,
      labelPlacement: 'center',
      labelText: (d) => d.id,
      fill: (item) => {
        const styles = {
          A: '#F09056',
          B: '#D580FF',
          C: '#01C9C9',
        };
        return styles[item.style?.parentId] || '#1883FF';
      },
    },
  },
  edge: {
    style: {
      type: 'polyline',
      endArrow: true,
      lineWidth: 2,
      stroke: '#C2C8D5',
    },
  },
  combo: {
    style: {
      labelText: (d) => d.id,
      lineDash: 0,
      collapsedLineDash: [5, 5],
    },
  },
  autoFit: 'view',
  behaviors: ['drag-combo', 'drag-node', 'drag-canvas', 'zoom-canvas'],
});
graph.render();
