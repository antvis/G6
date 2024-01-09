import { Extensions, Graph, register } from '../../../src/index';
import { TestCaseContext } from '../interface';

register('behavior', 'shortcuts-call', Extensions.ShortcutsCall);

export default (context: TestCaseContext, options = {}) => {
  return new Graph({
    width: 500,
    height: 500,
    layout: {
      type: 'grid',
    },
    optimize: {
      tileFirstRender: false,
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
        // {
        //   type: 'shortcuts-call',
        //   ...options,
        // },
        {
          key: 'shortcuts-call-zoom-out',
          type: 'shortcuts-call',
          trigger: 'shift',
          combinedKey: '_',
          functionName: 'zoom',
          functionParams: [0.9],
        },
        {
          key: 'shortcuts-call-zoom-in',
          type: 'shortcuts-call',
          trigger: 'shift',
          combinedKey: '+',
          functionName: 'zoom',
          functionParams: [1.1],
        },
      ],
    },
    ...context,
  });
};
