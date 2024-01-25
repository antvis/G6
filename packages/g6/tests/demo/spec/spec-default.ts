import { Graph } from '../../../src';
import type { TestCaseContext } from '../interface';

export default async (context: TestCaseContext) => {
  const { container, width, height } = context;

  const data = {
    nodes: [
      {
        id: 'node-1',
        style: {
          x: 100,
          y: 100,
          keyShape: {
            fill: 'pink',
          },
          // parentId: 'combo-1',
        },
      },
      {
        id: 'node-2',
        style: {
          x: 200,
          y: 100,
          keyShape: {
            fill: 'blue',
          },
          // parentId: 'combo-1',
        },
      },
    ],
    edges: [
      {
        id: 'edge-1',
        source: 'node-1',
        target: 'node-2',
        style: {
          stroke: '#366ceb',
          lineWidth: 3,
        },
      },
    ],
    // combos: [{ id: 'combo-1', style: { padding: 10, fill: 'rgba(63, 132, 66, 0.3)' } }],
  };

  const graph = new Graph({
    container,
    width,
    height,
    data,
    behaviors: [{ type: 'drag-node', enableTransient: false }],
    node: {
      style: {
        // keyShape: {
        //   r: (d) => 1,
        // },
        // keyShapeR: (d) => 1,
      },
      state: {
        active: {
          lineWidth: 5,
          stroke: 'pink',
        },
      },
      animate: {
        enter: {
          type: 'fade-in',
        },
        update: {
          type: 'transient-to',
        },
        exit: {
          type: 'fade-out',
        },
      },
    },
    edge: {
      animate: {
        enter: {
          type: 'fade-in',
        },
        update: {
          type: 'transient-to',
        },
        exit: {
          type: 'fade-out',
        },
      },
    },
    combo: {
      animate: {
        update: {
          type: 'transient-to',
        },
      },
    },
  });

  const button = document.createElement('button');
  button.innerText = 'next step';
  document.body.appendChild(button);

  const steps = [
    () => {
      graph.addEdgeData([
        {
          id: 'edge-1',
          source: 'node-1',
          target: 'node-2',
          style: {
            stroke: '#366ceb',
            lineWidth: 3,
          },
        },
      ]);
    },
    () => {
      graph.addNodeData([{ id: 'my-node', style: {} }]);
      graph.updateNodeData([{ id: 'my-node', style: { x: 100 } }]);
      graph.updateNodeData([{ id: 'my-node', style: { y: 150 } }]);
    },
    () => {
      // graph.updateNodeData([{ id: 'my-node', style: { y: 200 } }]);
      graph.translateItemTo('my-node', [100, 200]);
    },
    // () => {
    //   graph.translateItemBy(['combo-1'], [10, 10], {});
    // },
    () => {
      graph.updateEdgeData([{ id: 'edge-1', source: 'my-node' }]);
    },
    () => {
      graph.updateNodeData([{ id: 'my-node', style: { x: 150 } }]);
    },
    () => {
      graph.removeNodeData(['my-node']);
    },
    () => {
      graph.updateNodeData([{ id: 'node-2', style: { y: 300 } }]);
    },
    () => {
      graph.removeNodeData((data) => data.map((d) => d.id));
    },
  ];

  await graph.render();

  let step = 0;

  button.addEventListener('click', async () => {
    const callback = steps[step];
    if (!callback) return;
    callback();
    await graph.render();
    step++;
  });

  return graph;
};
