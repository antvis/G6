import G6 from '../../../src/index';
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

  return new G6.Graph({
    ...context,
    type: 'graph',
    data: JSON.parse(JSON.stringify(data)),
    layout: {
      type: 'dagre',
      nodeSize: 10,
      ranksep: 20,
      controlPoints: true,
      begin: [20, 20],
      align: 'UR',
    },
  });
};
