import { Graph } from '@/src';
import type { STDTestCase } from '../types';

export const behaviorDragNode: STDTestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: {
      nodes: [
        { id: 'node-1', style: { x: 100, y: 100 } },
        { id: 'node-2', style: { x: 200, y: 100, parentId: 'combo-1' } },
        { id: 'node-3', style: { x: 100, y: 200 } },
        { id: 'node-4', style: { x: 200, y: 200, parentId: 'combo-1' } },
      ],
      edges: [
        { source: 'node-1', target: 'node-2' },
        { source: 'node-2', target: 'node-4' },
        { source: 'node-1', target: 'node-3' },
        { source: 'node-3', target: 'node-4' },
      ],
      combos: [{ id: 'combo-1' }],
    },
    node: { style: { size: 20 } },
    edge: {
      style: { endArrow: true },
    },
    behaviors: [{ type: 'drag-node' }],
  });

  await graph.render();

  behaviorDragNode.form = (panel) => {
    const config = {
      enable: true,
      hideEdges: 'none',
      shadow: false,
    };
    const handleChange = () => {
      graph.setBehaviors([{ type: 'drag-node', ...config }]);
    };
    return [
      panel.add(config, 'enable').onChange(handleChange),
      panel.add(config, 'hideEdges', ['none', 'in', 'out', 'both']).onChange(handleChange),
      panel.add(config, 'shadow').onChange(handleChange),
    ];
  };

  return graph;
};
