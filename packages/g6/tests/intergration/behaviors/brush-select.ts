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
        { id: 'node1', data: {} },
        { id: 'node2', data: {} },
        { id: 'node3', data: {} },
        { id: 'node4', data: {} },
      ],
      edges: [{ id: 'edge1', source: 'node1', target: 'node2', data: {} }],
    },
    modes: {
      default: ['brush-select'],
    },
  });
};
