import type { Graph } from '@/src';
import { layoutBasicCompactBox } from '@@/demo/case';
import { createDemoGraph } from '@@/utils';

describe('basicCompactBox', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(layoutBasicCompactBox);
  });

  afterAll(() => {
    graph.destroy();
  });

  it('render with compact box layout', async () => {
    await expect(graph).toMatchSnapshot(__filename, 'basic_compact_box');
  });
});
