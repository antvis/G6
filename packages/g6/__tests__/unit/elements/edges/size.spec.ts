import { elementEdgeSize } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('element edge line size', () => {
  it('render', async () => {
    const graph = await createDemoGraph(elementEdgeSize);
    await expect(graph).toMatchSnapshot(__filename);

    graph.destroy();
  });
});
