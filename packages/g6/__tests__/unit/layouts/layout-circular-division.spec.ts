import type { Graph } from '@/src';
import { layoutCircularDivision } from '@@/demo/case';
import { createDemoGraph } from '@@/utils';

describe('layout circular division', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(layoutCircularDivision);
  });

  afterAll(() => {
    graph.destroy();
  });

  it('render', async () => {
    await expect(graph).toMatchSnapshot(__filename, 'layout-circular-division');
  });
});
