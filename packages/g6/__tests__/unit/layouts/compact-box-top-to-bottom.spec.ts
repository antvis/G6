import type { Graph } from '@/src';
import { layoutCompactBoxTopToBottom } from '@@/demo/case';
import { createDemoGraph } from '@@/utils';

describe('compactBoxTopToBottom', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(layoutCompactBoxTopToBottom);
  });

  afterAll(() => {
    graph.destroy();
  });

  it('render with top to bottom compact box layout', async () => {
    await expect(graph).toMatchSnapshot(__filename, 'compact-box-top-to-bottom');
  });
});
