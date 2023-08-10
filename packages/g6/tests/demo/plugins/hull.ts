import G6, { stdLib } from '../../../src/index';
import { container, height, width } from '../../datasets/const';
export default () => {
  const hullPlugin = new stdLib.plugins.hull({
    key: 'hull-plugin1',
    style: { fill: 'red' },
    hulls: [
      {
        id: 'h1',
        members: ['node1', 'node2', 'node4'],
        // type: 'smooth-convex',
        type: 'bubble',
        style: {
          fill: 'grey',
        },
        labelShape: {
          text: 'hull1-title',
          // position: 'outside-bottom',
          position: 'left',
          offsetY: -2,
        },
      },
      {
        id: 'h2',
        members: ['node3', 'node4'],
      },
    ],
  });
  const graph = new G6.Graph({
    container,
    width,
    height,
    type: 'graph',
    plugins: ['grid', hullPlugin],
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
        { type: 'drag-node', enableTransient: false }, //
        'drag-canvas',
        'zoom-canvas',
      ],
    },
  });
  graph.on('canvas:click', (e) => {
    // === create hull ===
    hullPlugin.addHull({ id: 'hull1', members: ['node1', 'node2'] });

    // === create with invalid members ===
    // hullPlugin.addHull({
    //   id: 'hull1',
    //   // members: ['node1', 'node2'],
    //   members: ['111'],
    //   style: {
    //     fill: 'green',
    //   },
    // });
  });
  graph.on('node:click', (e) => {
    graph.removeData('node', e.itemId);
  });
  graph.on('canvas:contextmenu', (e) => {
    // hullPlugin.updateHull({ id: 'hull1', members: ['node1', 'node3'] });
    // hullPlugin.removeHull('hull1');
    hullPlugin.updateHull({ id: 'hull1', style: { fill: 'black' } });
  });

  return graph;
};
