import { layoutCustomHorizontal } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('custom layout horizontal', () => {
  it('render', async () => {
    const graph = await createDemoGraph(layoutCustomHorizontal);
    await expect(graph).toMatchSnapshot(__filename);

    graph.destroy();
  });
});
