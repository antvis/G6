import { elementChangeType } from '@@/demos/g6';
import { createDemoGraph } from '@@/utils';
import type { Graph } from '@antv/g6';

describe('element change type', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(elementChangeType, { animation: false });
  });

  afterAll(() => {
    graph.destroy();
  });

  it('default status', async () => {
    await expect(graph).toMatchSnapshot(__filename);
  });

  it('change type', async () => {
    graph.updateNodeData([
      { id: 'node-1', type: 'circle' },
      { id: 'node-2', type: 'diamond' },
    ]);

    await graph.draw();

    await expect(graph).toMatchSnapshot(__filename, 'change-type');
  });
});
