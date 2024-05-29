import { elementEdgeQuadratic } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('element edge quadratic', () => {
  it('render', async () => {
    const graph = await createDemoGraph(elementEdgeQuadratic);
    await expect(graph).toMatchSnapshot(__filename);

    graph.destroy();
  });
});
