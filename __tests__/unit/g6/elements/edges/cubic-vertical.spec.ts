import { elementEdgeCubicVertical } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('element edge cubic vertical', () => {
  it('render', async () => {
    const graph = await createDemoGraph(elementEdgeCubicVertical);
    await expect(graph).toMatchSnapshot(__filename);

    graph.destroy();
  });
});
