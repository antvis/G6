import { animationElementStylePosition } from '@/__tests__/demos';
import { createDemoGraph } from '@@/utils';

describe('animation element style and position', () => {
  it('animation element style and position', async () => {
    const graph = await createDemoGraph(animationElementStylePosition, { animation: true });
    await expect(graph).toMatchAnimation(__filename, [0, 200, 1000], () => {
      graph.addNodeData([
        { id: 'node-4', style: { x: 50, y: 200, color: 'orange' } },
        { id: 'node-5', style: { x: 75, y: 150, color: 'purple' } },
        { id: 'node-6', style: { x: 200, y: 100, color: 'cyan' } },
      ]);
      graph.removeNodeData(['node-1']);
      graph.updateNodeData([{ id: 'node-2', style: { x: 200, y: 200, stroke: 'green' } }]);
      graph.draw();
    });
    graph.destroy();
  });
});
