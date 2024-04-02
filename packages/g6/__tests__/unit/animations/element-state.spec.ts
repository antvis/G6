import { animationElementState } from '@/__tests__/demos';
import { createDemoGraph } from '@@/utils';

describe('animation element state', () => {
  it('animation element state', async () => {
    const graph = await createDemoGraph(animationElementState, { animation: true });
    await expect(graph).toMatchAnimation(__filename, [0, 200, 1000], () => {
      graph.updateData({
        nodes: [
          { id: 'node-1', style: { states: [] } },
          { id: 'node-2', style: { states: ['active'] } },
          { id: 'node-3', style: { states: ['selected'] } },
        ],
        edges: [
          { source: 'node-1', target: 'node-2', style: { states: [] } },
          { source: 'node-2', target: 'node-3', style: { states: ['active'] } },
        ],
      });
      graph.draw();
    });
    graph.destroy();
  });
});
