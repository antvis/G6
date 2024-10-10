import { createDemoGraph } from '@@/utils';
import type { Graph } from '@antv/g6';
import { pluginEdgeBundling } from '../../demos';

describe('plugin edge bundling', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(pluginEdgeBundling, { animation: false });
  });

  afterAll(() => {
    graph.destroy();
  });

  it('default edge bundling', async () => {
    await expect(graph).toMatchSnapshot(__filename);
  });
});
