import type { Graph } from '@/src';
import { layoutCircularSpiral } from '@@/demo/case';
import { createDemoGraph } from '@@/utils';

describe('layout circular spiral', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(layoutCircularSpiral);
  });

  afterAll(() => {
    graph.destroy();
  });

  it('render', async () => {
    await expect(graph).toMatchSnapshot(__filename, 'layout-circular-spiral');
  });
});
