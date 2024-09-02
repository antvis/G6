import { elementEdgeCubicRadial } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('element edge cubic radial', () => {
  it('render', async () => {
    const graph = await createDemoGraph(elementEdgeCubicRadial);
    await expect(graph).toMatchSnapshot(__filename);

    graph.destroy();
  });
});
