import { elementNodeHexagon } from '@@/demos/g6';
import { createDemoGraph } from '@@/utils';

describe('element label oversized', () => {
  it('render', async () => {
    const graph = await createDemoGraph(elementNodeHexagon);
    await expect(graph).toMatchSnapshot(__filename);

    graph.destroy();
  });
});
