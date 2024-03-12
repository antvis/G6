import type { Graph } from '@/src';
import { layoutTopToBottomCompactBox } from '@@/demo/case';
import { createDemoGraph } from '@@/utils';

describe('topToBottomCompactBox', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(layoutTopToBottomCompactBox);
  });

  afterAll(() => {
    graph.destroy();
  });

  it('render with top to bottom compact box layout', async () => {
    await expect(graph).toMatchSnapshot(__filename, 'top_to_bottom_compact_box');
  });
});
