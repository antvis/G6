import { extend, Graph, Extensions } from '../../../src/index';
import { TestCaseContext } from '../interface';

export default (context: TestCaseContext, options) => {
  const createEdgeOptions = options || {
    trigger: 'click',
    edgeConfig: { keyShape: { stroke: '#f00' } },
    createVirtualEventName: 'begincreate',
    createActualEventName: 'aftercreate',
    cancelCreateEventName: 'cancelcreate',
  };
  const ExtGraph = extend(Graph, {
    behaviors: {
      'create-edge': Extensions.CreateEdge,
      'brush-select': Extensions.BrushSelect,
    },
  });
  const graph = new ExtGraph({
    ...context,
    layout: {
      type: 'grid',
    },
    node: {
      labelShape: {
        text: {
          fields: ['id'],
          formatter: (model) => model.id,
        },
      },
    },
    data: {
      nodes: [
        { id: 'node1', data: {} },
        { id: 'node2', data: {} },
        { id: 'node3', data: {} },
        { id: 'node4', data: {} },
        { id: 'node5', data: {} },
      ],
      edges: [
        { id: 'edge1', source: 'node1', target: 'node2', data: {} },
        { id: 'edge2', source: 'node1', target: 'node3', data: {} },
        { id: 'edge3', source: 'node1', target: 'node4', data: {} },
        { id: 'edge4', source: 'node2', target: 'node3', data: {} },
        { id: 'edge5', source: 'node3', target: 'node4', data: {} },
        { id: 'edge6', source: 'node4', target: 'node5', data: {} },
      ],
    },
    modes: {
      default: [
        {
          type: 'brush-select',
          eventName: 'afterbrush',
        },
        {
          type: 'create-edge',
          ...createEdgeOptions,
        },
      ],
    },
  });

  graph.on('begincreate', (e) => {
    graph.setCursor('crosshair');
  });
  graph.on('cancelcreate', (e) => {
    graph.setCursor('default');
  });
  graph.on('aftercreate', (e) => {
    const { edge } = e;
    graph.updateData('edge', {
      id: edge.id,
      data: {
        keyShape: {
          stroke: '#0f0',
        },
      },
    });
  });
  return graph;
};
