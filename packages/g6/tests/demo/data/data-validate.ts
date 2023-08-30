import { Graph } from '../../../src/index';
import { TestCaseContext } from '../interface';

const dataWithDuplicateNodeId = {
  nodes: [
    {
      id: 'node1',
      data: {},
    },
    {
      id: 'node1',
      data: {},
    },
  ],
  edges: [
    {
      id: 'edge1',
      source: 'node1',
      target: 'node2',
    },
  ],
};
const dataWithoutNodeData = {
  nodes: [
    {
      id: 'node1',
    },
    {
      id: 'node2',
    },
  ],
  edges: [
    {
      id: 'edge1',
      source: 'node1',
      target: 'node2',
    },
  ],
};
const dataWithDuplicateNodeEdgeId = {
  nodes: [
    {
      id: '1',
      data: {},
    },
    {
      id: 'node2',
      data: {},
    },
  ],
  edges: [
    {
      id: '1',
      source: '1',
      target: 'node2',
    },
  ],
};
const dataWithoutNodeId = {
  nodes: [
    {
      data: {},
    },
    {
      id: 'node2',
      data: {},
    },
  ],
  edges: [
    {
      id: 'edge1',
      source: 'node1',
      target: 'node2',
    },
  ],
};
const dataWithoutEdgeId = {
  nodes: [
    {
      id: 'node1',
      data: {},
    },
    {
      id: 'node2',
      data: {},
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
  ],
};
const dataEdgeSourceNotExist = {
  nodes: [
    {
      id: 'node1',
      data: {},
    },
    {
      id: 'node2',
      data: {},
    },
  ],
  edges: [
    {
      data: 'edge1',
      source: '1',
      target: 'node2',
    },
  ],
};
const dataEdgeNoSource = {
  nodes: [
    {
      id: 'node1',
      data: {},
    },
    {
      id: 'node2',
      data: {},
    },
  ],
  edges: [
    {
      data: 'edge1',
      target: 'node2',
    },
  ],
};
const dataParentNotExist = {
  nodes: [
    {
      id: 'node1',
      data: { parentId: 'some-combo' },
    },
    {
      id: 'node2',
      data: {},
    },
  ],
  edges: [
    {
      id: 'edge1',
      source: 'node1',
      target: 'node2',
    },
  ],
};
const dataWithoutComboId = {
  nodes: [
    {
      id: 'node1',
      data: {},
    },
    {
      id: 'node2',
      data: {},
    },
  ],
  edges: [
    {
      id: 'edge1',
      source: 'node1',
      target: 'node2',
    },
  ],
  combos: [
    {
      data: {},
    },
  ],
};
const invalidDatas = {
  DUPLICATE_NODE_ID: dataWithDuplicateNodeId,
  DUPLICATE_NODE_EDGE_ID: dataWithDuplicateNodeEdgeId,
  NODE_NO_DATA: dataWithoutNodeData,
  NODE_NO_ID: dataWithoutNodeId,
  NODE_PARENT_NOT_EXIST: dataParentNotExist,
  EDGE_NO_ID: dataWithoutEdgeId,
  EDGE_SOURCE_NOT_EXIST: dataEdgeSourceNotExist,
  EDGE_NO_SOURCE: dataEdgeNoSource,
  COMBO_NO_ID: dataWithoutComboId,
};

export default (
  context: TestCaseContext,
  options?: {
    errorType:
      | 'DUPLICATE_NODE_ID'
      | 'DUPLICATE_NODE_EDGE_ID'
      | 'NODE_NO_DATA'
      | 'NODE_NO_ID'
      | 'NODE_PARENT_NOT_EXIST'
      | 'EDGE_NO_ID'
      | 'EDGE_SOURCE_NOT_EXIST'
      | 'EDGE_NO_SOURCE'
      | 'COMBO_NO_ID';
  },
) => {
  const { errorType = 'DUPLICATE_NODE_ID' } = options || {};
  const graph = new Graph({
    ...context,
    layout: {
      type: 'grid',
    },
    data: invalidDatas[errorType],
    node: {
      labelShape: {
        text: {
          fields: ['id'],
          formatter: (model) => model.id,
        },
      },
    },
    modes: {
      default: ['click-select', 'drag-canvas'],
    },
  });
  return graph;
};
