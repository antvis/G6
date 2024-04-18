import type { NodeData } from '@/src';
import { Graph } from '@/src';

export const elementNodeHTML: TestCase = async (context) => {
  const data = {
    nodes: [
      { id: 'html-1', style: { x: 100, y: 100, color: 'orange' }, data: { content: 'HTML NODE 1' } },
      { id: 'html-2', style: { x: 100, y: 200, color: 'pink' }, data: { content: 'HTML NODE 2' } },
    ],
    edges: [{ source: 'html-1', target: 'html-2' }],
  };

  const graph = new Graph({
    ...context,
    data,
    node: {
      style: {
        type: 'html', // 👈🏻 Node shape type.
        size: [240, 80],
        innerHTML: (d: NodeData) => `
<div style="width: 100%; height: 100%; background: ${d.style!.color}; display: flex; justify-content: center; align-items: center;">
  <span style="color: #fff; font-size: 20px;">
    ${d.data!.content}
  </span>
</div>`,
      },
    },
    behaviors: ['drag-element'],
  });

  await graph.render();

  return graph;
};
