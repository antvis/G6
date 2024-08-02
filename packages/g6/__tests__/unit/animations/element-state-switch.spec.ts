import { animationElementStateSwitch } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('animation element state switch', () => {
  it('animation element state switch', async () => {
    const graph = await createDemoGraph(animationElementStateSwitch, { animation: true });
    await expect(graph).toMatchAnimation(__filename, [0, 200, 1000], async () => {
      graph.updateData({
        nodes: [
          { id: 'node-1', states: [] },
          { id: 'node-2', states: ['active'] },
          { id: 'node-3', states: ['selected'] },
        ],
        edges: [
          { source: 'node-1', target: 'node-2', states: [] },
          { source: 'node-2', target: 'node-3', states: ['active'] },
        ],
      });
      await graph.draw();
    });
    graph.destroy();
  });
});
