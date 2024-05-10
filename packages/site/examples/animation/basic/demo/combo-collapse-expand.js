import { Graph } from '@antv/g6';

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: 'node-1', combo: 'combo-2', style: { x: 120, y: 100 } },
      { id: 'node-2', combo: 'combo-1', style: { x: 300, y: 200 } },
      { id: 'node-3', combo: 'combo-1', style: { x: 200, y: 300 } },
    ],
    edges: [
      { id: 'edge-1', source: 'node-1', target: 'node-2' },
      { id: 'edge-2', source: 'node-2', target: 'node-3' },
    ],
    combos: [
      {
        id: 'combo-1',
        type: 'rect',
        combo: 'combo-2',
        style: {
          collapsed: true,
        },
      },
      { id: 'combo-2' },
    ],
  },
  node: {
    style: {
      labelText: (d) => d.id,
    },
  },
  combo: {
    style: {
      labelText: (d) => d.id,
      lineDash: 0,
      collapsedLineDash: [5, 5],
    },
  },
  behaviors: [{ type: 'drag-element' }, 'collapse-expand'],
});

graph.render();

window.addPanel((gui) => {
  const config = {
    collapse: () => {
      graph.collapseElement('combo-1');
    },
    expand: () => {
      graph.expandElement('combo-1');
    },
  };
  gui.add(config, 'collapse');
  gui.add(config, 'expand');
});
