import { layoutGrid } from '@/__tests__/demos/layout-grid';
import type { Graph } from '@/src';
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
    await expect(graph).toMatchSnapshot(__filename, 'sortby-default');
  });

  it('sortBy id', async () => {
    graph.setLayout({ type: 'grid', sortBy: 'id' }), await graph.layout();
    await expect(graph).toMatchSnapshot(__filename, 'sortby-id');
  });
});
