import type { Graph } from '@/src';
import { compactBoxLeftAlign } from '@@/demo/case';
import { createDemoGraph } from '@@/utils';

describe('compactBoxLeftAlign', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(compactBoxLeftAlign);
  });

  afterAll(() => {
    graph.destroy();
  });

  it('render with compact box left align layout', async () => {
    await expect(graph).toMatchSnapshot(__filename, 'compact_box_left_align');
  });
});
