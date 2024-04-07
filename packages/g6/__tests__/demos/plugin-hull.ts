import { Graph } from '@/src';

export const pluginHull: TestCase = async (context) => {
  const data = {
    nodes: [
      { id: 'node0', style: { size: 50 } },
      { id: 'node1', style: { size: 30 } },
      { id: 'node2', style: { size: 30 } },
      { id: 'node3', style: { size: 30 } },
      { id: 'node4', style: { size: 30 } },
      { id: 'node5', style: { size: 30 } },
      { id: 'node6', style: { size: 15 } },
      { id: 'node7', style: { size: 15 } },
      { id: 'node8', style: { size: 15 } },
      { id: 'node9', style: { size: 15 } },
      { id: 'node10', style: { size: 15 } },
      { id: 'node11', style: { size: 15 } },
      { id: 'node12', style: { size: 15 } },
      { id: 'node13', style: { size: 15 } },
      { id: 'node14', style: { size: 15 } },
      { id: 'node15', style: { size: 15 } },
      { id: 'node16', style: { size: 15 } },
    ],
    edges: [
      { id: 'edge1', source: 'node0', target: 'node1' },
      { id: 'edge2', source: 'node0', target: 'node2' },
      { id: 'edge3', source: 'node0', target: 'node3' },
      { id: 'edge4', source: 'node0', target: 'node4' },
      { id: 'edge5', source: 'node0', target: 'node5' },
      { id: 'edge6', source: 'node1', target: 'node6' },
      { id: 'edge7', source: 'node1', target: 'node7' },
      { id: 'edge8', source: 'node2', target: 'node8' },
      { id: 'edge9', source: 'node2', target: 'node9' },
      { id: 'edge10', source: 'node2', target: 'node10' },
      { id: 'edge11', source: 'node2', target: 'node11' },
      { id: 'edge12', source: 'node2', target: 'node12' },
      { id: 'edge13', source: 'node2', target: 'node13' },
      { id: 'edge14', source: 'node3', target: 'node14' },
      { id: 'edge15', source: 'node3', target: 'node15' },
      { id: 'edge16', source: 'node3', target: 'node16' },
    ],
  };

  const graph = new Graph({
    ...context,
    data,
    behaviors: ['drag-canvas', 'drag-element'],
    plugins: [{ key: 'hull', type: 'hull', members: ['node0', 'node2'] }],
    node: {
      style: {
        color: 'pink',
        opacity: 0.1,
      },
    },
    layout: {
      type: 'force',
      preventOverlap: true,
      linkDistance: (d: any) => {
        return d.source === 'node0' || d.target === 'node0' ? 200 : 80;
      },
    },
    autoFit: 'view',
  });

  await graph.render();

  return graph;
};
