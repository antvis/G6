import { layoutD3Force } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('layout d3 force', () => {
  it('render', async () => {
    const graph = await createDemoGraph(layoutD3Force);
    await expect(graph).toMatchSnapshot(__filename);

    graph.destroy();
  });
});
