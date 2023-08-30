import { Graph, Extensions, extend } from '../../../src/index';

import { TestCaseContext } from '../interface';

export default (context: TestCaseContext) => {
  const data = {
    nodes: [
      {
        id: '1',
        data: {
          name: 'alps_file1',
        },
      },
      {
        id: '2',
        data: {
          name: 'alps_file2',
        },
      },
      {
        id: '3',
        data: {
          name: 'alps_file3',
        },
      },
      {
        id: '4',
        data: {
          name: 'sql_file1',
        },
      },
      {
        id: '5',
        data: {
          name: 'sql_file2',
        },
      },
      {
        id: '6',
        data: {
          name: 'feature_etl_1',
        },
      },
      {
        id: '7',
        data: {
          name: 'feature_etl_1',
        },
      },
      {
        id: '8',
        data: {
          name: 'feature_extractor',
        },
      },
    ],
    edges: [
      {
        id: 'e1',
        data: {},
        source: '1',
        target: '2',
      },
      {
        id: 'e2',
        data: {},
        source: '1',
        target: '3',
      },
      {
        id: 'e3',
        data: {},
        source: '2',
        target: '4',
      },
      {
        id: 'e4',
        data: {},
        source: '3',
        target: '4',
      },
      {
        id: 'e5',
        data: {},
        source: '4',
        target: '5',
      },
      {
        id: 'e6',
        data: {},
        source: '5',
        target: '6',
      },
      {
        id: 'e7',
        data: {},
        source: '6',
        target: '7',
      },
      {
        id: 'e8',
        data: {},
        source: '6',
        target: '8',
      },
    ],
  };

  const data2 = {
    nodes: [
      {
        id: '0',
        data: {
          label: '0',
        },
      },
      {
        id: '1',
        data: {
          label: '1',
        },
      },
      {
        id: '2',
        data: {
          label: '2',
        },
      },
      {
        id: '3',
        data: {
          label: '3',
        },
      },
      {
        id: '4',
        data: {
          label: '4',
        },
      },
      {
        id: '5',
        data: {
          label: '5',
        },
      },
      {
        id: '6',
        data: {
          label: '6',
        },
      },
      {
        id: '7',
        data: {
          label: '7',
        },
      },
      {
        id: '8',
        data: {
          label: '8',
        },
      },
      {
        id: '9',
        data: {
          label: '9',
        },
      },
    ],
    edges: [
      {
        id: 'edge-395',
        source: '0',
        target: '1',
        data: {},
      },
      {
        id: 'edge-973',
        source: '0',
        target: '2',
        data: {},
      },
      {
        id: 'edge-80',
        source: '1',
        target: '4',
        data: {},
      },
      {
        id: 'edge-125',
        source: '0',
        target: '3',
        data: {},
      },
      {
        id: 'edge-44',
        source: '3',
        target: '4',
        data: {},
      },
      {
        id: 'edge-700',
        source: '4',
        target: '5',
        data: {},
      },
      {
        id: 'edge-475',
        source: '4',
        target: '6',
        data: {},
      },
      {
        id: 'edge-990',
        source: '5',
        target: '7',
        data: {},
      },
      {
        id: 'edge-770',
        source: '5',
        target: '8',
        data: {},
      },
      {
        id: 'edge-228',
        source: '8',
        target: '9',
        data: {},
      },
      {
        id: 'edge-563',
        source: '2',
        target: '9',
        data: {},
      },
      {
        id: 'edge-893',
        source: '3',
        target: '9',
        data: {},
      },
    ],
  };
  const ExtGraph = extend(Graph, {
    layouts: {
      'dagre': Extensions.DagreLayout
    },
    edges:{
      'polyline-edge':Extensions.PolylineEdge
    }
  });
  const graph = new ExtGraph({
    ...context,
    data: JSON.parse(JSON.stringify(data2)),
    layout: {
      type: 'dagre',
      nodeSize: 10,
      ranksep: 20,
      controlPoints: true,
      begin: [20, 20],
      // align: 'UR',
    },
    edge: (model) => {
      const { id, source, target, data } = model;
      return {
        id,
        source,
        target,
        data: {
          type: 'polyline-edge',
          ...data,
          keyShape: {
            ...data?.keyShape,
            endArrow: true,
          },
        },
      };
    },
    autoFit: 'view',
    modes: { default: ['drag-canvas'] },
  });
  graph.on('click', (e) => {
    console.log('canvas', e.canvas);
    console.log('graph', graph);
  });
  return graph;
};
