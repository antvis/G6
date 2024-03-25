import type { Graph } from '@/src';
import { elementChangeType } from '@@/demo/case';
import { createDemoGraph } from '@@/utils';

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
      { id: 'node-1', style: { type: 'circle' } },
      { id: 'node-2', style: { type: 'diamond' } },
    ]);

    await graph.draw();

    await expect(graph).toMatchSnapshot(__filename, 'change_type');
  });
});
