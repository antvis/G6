import { animationElementPosition } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('animation element position', () => {
  it('animation element position', async () => {
    const graph = await createDemoGraph(animationElementPosition, { animation: true });
    await expect(graph).toMatchAnimation(__filename, [0, 200, 1000], () => {
      graph.translateElementTo(
        {
          'node-1': [250, 100],
          'node-2': [175, 200],
          'node-3': [325, 200],
          'node-4': [100, 300],
          'node-5': [250, 300],
          'node-6': [400, 300],
        },
        true,
      );
    });
    graph.destroy();
  });
});
