import type { Graph } from '@/src';
import { layoutCompactBoxBasic } from '@@/demo/case';
import { createDemoGraph } from '@@/utils';

describe('compactBoxBasic', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(layoutCompactBoxBasic);
  });

  afterAll(() => {
    graph.destroy();
  });

  it('render with compact box layout', async () => {
    await expect(graph).toMatchSnapshot(__filename, 'compact-box-basic');
  });
});
