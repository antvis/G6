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
        label: `0th edge of A -> C`,
      },
    },
    {
      id: 'edge2',
      source: 'node3',
      target: 'node1',
      data: {
        label: `0th edge of C -> A`,
        keyShape: {
          stroke: '#0f0',
          lineWidth: 2,
        },
      },
    },
    {
      id: 'edge3',
      source: 'node3',
      target: 'node1',
      data: {
        label: `1th edge of C -> A`,
      },
    },
    {
      id: 'edge4',
      source: 'node3',
      target: 'node3',
      data: {},
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
        activeLifecycle: [
          'read',
          'changeData',
          'updateData',
          'addData',
          'removeData',
        ], // default: 'read'
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

  let currentAction = 'remove';
  const removeEdgeBtn = document.createElement('button');
  removeEdgeBtn.id = 'parallelEdges-removeEdge';
  removeEdgeBtn.textContent = '移除/增加边';
  removeEdgeBtn.addEventListener('click', (e) => {
    currentAction = currentAction === 'remove' ? 'add' : 'remove';
    if (currentAction === 'remove') {
      graph.removeData('edge', ['new-edge']);
    } else {
      graph.addData('edge', {
        id: 'new-edge',
        source: 'node1',
        target: 'node2',
        data: {
          label: 'new edge',
          keyShape: {
            stroke: '#0f0',
            lineWidth: 2,
          },
        },
      });
    }
  });
  document.body.appendChild(removeEdgeBtn);

  let updateIndex = 1;
  const updateEdgeBtn = document.createElement('button');
  updateEdgeBtn.textContent = '更新边';
  updateEdgeBtn.id = 'parallelEdges-updateData';
  updateEdgeBtn.addEventListener('click', (e) => {
    graph.updateData('edge', {
      id: 'edge2',
      source: 'node3',
      target: `node${updateIndex + 1}`,
      data: {
        label: 'update edge',
      },
    });
    updateIndex = (updateIndex + 1) % 3;
  });
  document.body.appendChild(updateEdgeBtn);

  return graph;
};
