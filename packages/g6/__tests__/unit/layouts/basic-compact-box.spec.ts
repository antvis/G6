import type { Graph } from '@/src';
import { basicCompactBox } from '@@/demo/case';
import { createDemoGraph } from '@@/utils';

describe('basicCompactBox', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(basicCompactBox);
  });

  afterAll(() => {
    graph.destroy();
  });

  it('render with compact box layout', async () => {
    await expect(graph).toMatchSnapshot(__filename, 'basic_compact_box');
  });
});
