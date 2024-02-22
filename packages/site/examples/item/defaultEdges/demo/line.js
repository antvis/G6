import { Graph } from '@antv/g6';

const data = {
  nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }, { id: 'node4' }, { id: 'node5' }, { id: 'node6' }],
  edges: [
    {
      id: 'line-default',
      source: 'node1',
      target: 'node2',
    },
    {
      id: 'line-active',
      source: 'node1',
      target: 'node3',
    },
    {
      id: 'line-selected',
      source: 'node1',
      target: 'node4',
    },
    {
      id: 'line-highlight',
      source: 'node1',
      target: 'node5',
    },
    {
      id: 'line-inactive',
      source: 'node1',
      target: 'node6',
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      type: 'circle', // 👈🏻 Node shape type.
      width: 40,
      height: 40,
      color: '#1783FF',
    },
  },
  edge: {
    style: {
      type: 'line', // 👈🏻 Edge shape type.
      color: 'rgb(153, 173, 209)',
      labelText: (d) => d.id,
      labelBackgroundPadding: 0,
      labelBackgroundFill: '#fff',
      labelBackgroundLineWidth: 0,
      labelBackgroundOpacity: 0.75,
      endArrow: true,
    },
    state: {
      active: {
        halo: true,
      },
      selected: {
        lineWidth: 2,
        labelFontWeight: 700,
        halo: true,
      },
      highlight: {
        halo: false,
        lineWidth: 2,
        labelFontWeight: 700,
      },
      inactive: {
        color: 'rgb(210, 218, 233)',
      },
    },
  },
  layout: {
    type: 'radial',
    unitRadius: 250,
    linkDistance: 250,
  },
  animation: false,
});

graph.render();

graph.on('afterrender', () => {
  graph.setElementState('line-active', 'active');
  graph.setElementState('line-selected', 'selected');
  graph.setElementState('line-highlight', 'highlight');
  graph.setElementState('line-inactive', 'inactive');
});
