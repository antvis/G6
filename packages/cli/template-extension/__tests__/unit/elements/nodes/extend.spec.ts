import { elementNodeExtend } from '@@/demos';
import { createDemoGraph } from '@@/utils/index';
import type { Graph } from '@antv/g6';

describe('element node circle', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(elementNodeExtend);
  });

  afterAll(() => {
    graph.destroy();
  });

  it('should render an extended node', async () => {
    await expect(graph).toMatchSnapshot(__filename);
  });
});
