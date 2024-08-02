import type { Graph } from '@/src';
import { layoutMDS } from '@@/demos/layout-mds';
import { createDemoGraph } from '@@/utils';

describe('mds', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(layoutMDS);
  });

  afterAll(() => {
    graph.destroy();
  });

  it('mds linkDistance = 100', async () => {
    await expect(graph).toMatchSnapshot(__filename, 'ld100');
  });
});
