import { layoutConcentric } from '@@/demo/case';
import { createDemoGraph } from '@@/utils';

describe('layout concentric', () => {
  it('render', async () => {
    const graph = await createDemoGraph(layoutConcentric);
    await expect(graph).toMatchSnapshot(__filename, 'layout-concentric-basic');

    graph.destroy();
  });
});
