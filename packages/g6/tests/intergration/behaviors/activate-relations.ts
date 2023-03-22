import G6 from '../../../src/index';
import { container, height, width } from '../../datasets/const';
export default () => {
  return new G6.Graph({
    container,
    width,
    height,
    type: 'graph',
    layout: {
      type: 'grid',
    },
    data: {
      nodes: [
        { id: 'node1', data: { x: 100, y: 200 } },
        { id: 'node2', data: { x: 200, y: 250 } },
        { id: 'node3', data: { x: 200, y: 250 } },
      ],
      edges: [{ id: 'edge1', source: 'node1', target: 'node2', data: {} }],
    },
    modes: {
      default: ['click-select'],
    },
  });
};
