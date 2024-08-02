import { layoutConcentric } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('layout concentric', () => {
  it('render', async () => {
    const graph = await createDemoGraph(layoutConcentric);
    await expect(graph).toMatchSnapshot(__filename);

    graph.destroy();
  });
});
