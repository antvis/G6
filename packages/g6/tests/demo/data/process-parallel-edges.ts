import { TestCaseContext } from '../interface';
import { Extensions, Graph, extend } from '../../../src/index';

const data = {
  nodes: [
    {
      id: 'node1',
      data: {
        x: 50,
        y: 350,
        label: 'A',
      },
    },
    {
      id: 'node2',
      data: {
        x: 250,
        y: 150,
        label: 'B',
      },
    },
    {
      id: 'node3',
      data: { x: 450, y: 350, label: 'C' },
    },
  ],
  edges: [
    {
      id: 'edge1',
      source: 'node1',
      target: 'node3',
      data: {
        label: `A -> C`,
      },
    },
    {
      id: 'edge2',
      source: 'node3',
      target: 'node1',
      data: {
        label: `C -> A`,
      },
    },
  ],
};

for (let i = 0; i < 10; i++) {
  data.edges.push({
    id: `edgeA-B${i}`,
    source: 'node1',
    target: 'node2',
    data: {
      label: `${i}th edge of A -> B`,
    },
  });
}
for (let i = 0; i < 5; i++) {
  data.edges.push({
    id: `edgeB-C${i}`,
    source: 'node2',
    target: 'node3',
    data: {
      label: `${i}th edge of B -> C`,
    },
  });
}

export default (context: TestCaseContext) => {
  const ExtGraph = extend(Graph, {
    transforms: {
      'process-parallel-edges': Extensions.ProcessParallelEdges,
    },
    edges: {
      'quadratic-edge': Extensions.QuadraticEdge,
      'loop-edge': Extensions.LoopEdge,
    },
  });

  const graph = new ExtGraph({
    ...context,
    data,
    transforms: [
      {
        type: 'process-parallel-edges',
        multiEdgeType: 'quadratic-edge',
        loopEdgeType: 'loop-edge',
      },
    ],
    modes: {
      default: ['drag-node'],
    },
    node: {
      labelShape: {
        text: {
          fields: ['label'],
          formatter: (model) => model.data.label,
        },
        position: 'center',
      },
    },
  });

  return graph;
};
