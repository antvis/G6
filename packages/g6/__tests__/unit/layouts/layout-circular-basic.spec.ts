import type { Graph } from '@/src';
import { layoutCircularBasic } from '@@/demo/case';
import { createDemoGraph } from '@@/utils';

describe('layout circular basic', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(layoutCircularBasic);
  });

  afterAll(() => {
    graph.destroy();
  });

  it('render', async () => {
    await expect(graph).toMatchSnapshot(__filename, 'layout-circular-basic');
  });
});
