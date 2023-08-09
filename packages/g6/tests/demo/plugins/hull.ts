import G6, { stdLib } from '../../../src/index';
import { container, height, width } from '../../datasets/const';
export default () => {
  const hullPlugin1 = new stdLib.plugins.hull({
    key: 'hull-plugin1',
    style: { fill: 'red' },
  });
  const graph = new G6.Graph({
    container,
    width,
    height,
    type: 'graph',
    plugins: ['grid', hullPlugin1],
    layout: {
      type: 'grid',
    },
    data: {
      nodes: [
        { id: 'node1', data: {} },
        { id: 'node2', data: {} },
        { id: 'node3', data: {} },
        { id: 'node4', data: {} },
      ],
      edges: [{ id: 'edge1', source: 'node1', target: 'node2', data: {} }],
    },
    modes: {
      default: [
        'brush-select',
        { type: 'drag-node' }, // , enableTransient: false
        'drag-canvas',
        'zoom-canvas',
      ],
    },
  });
  graph.on('canvas:click', (e) => {
    // === create hull ===
    // hullPlugin1.create({ id: 'hull1', members: ['node1', 'node2'] });

    // === create with invalid members ===
    hullPlugin1.create({
      id: 'hull1',
      // members: ['node1', 'node2'],
      members: ['111'],
      style: {
        fill: 'green',
      },
    });
  });
  graph.on('node:click', (e) => {
    graph.removeData('node', e.itemId);
  });
  graph.on('canvas:contextmenu', (e) => {
    // hullPlugin1.update({ id: 'hull1', members: ['node1', 'node3'] });
    // hullPlugin1.remove('hull1');
    hullPlugin1.update({ id: 'hull1', style: { fill: 'black' } });
  });

  return graph;
};
