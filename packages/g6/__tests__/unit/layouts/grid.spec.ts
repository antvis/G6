import type { Graph } from '@/src';
import { layoutGrid } from '@@/demo/case/layout-grid';
import { createDemoGraph } from '@@/utils';

describe('grid', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(layoutGrid);
  });

  afterAll(() => {
    graph.destroy();
  });

  it('sortBy default', async () => {
    await expect(graph).toMatchSnapshot(__filename, 'sortby_default');
  });

  it('sortBy id', async () => {
    graph.setLayout({ type: 'grid', sortBy: 'id' }), await graph.layout();
    await expect(graph).toMatchSnapshot(__filename, 'sortby_id');
  });
});
