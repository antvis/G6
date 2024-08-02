import { elementEdgeCubicHorizontal } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('element edge cubic horizontal', () => {
  it('render', async () => {
    const graph = await createDemoGraph(elementEdgeCubicHorizontal);
    await expect(graph).toMatchSnapshot(__filename);

    graph.destroy();
  });
});
