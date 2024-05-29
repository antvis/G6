import { elementNodeStar } from '@@/demos/g6';
import { createDemoGraph } from '@@/utils';

describe('element label oversized', () => {
  it('render', async () => {
    const graph = await createDemoGraph(elementNodeStar);
    await expect(graph).toMatchSnapshot(__filename);

    graph.destroy();
  });
});
