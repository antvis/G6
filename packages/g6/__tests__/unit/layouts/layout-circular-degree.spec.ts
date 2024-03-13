import type { Graph } from '@/src';
import { layoutCircularDegree } from '@@/demo/case';
import { createDemoGraph } from '@@/utils';

describe('layout circular degree', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(layoutCircularDegree);
  });

  afterAll(() => {
    graph.destroy();
  });

  it('render', async () => {
    await expect(graph).toMatchSnapshot(__filename, 'layout-circular-degree');
  });
});
