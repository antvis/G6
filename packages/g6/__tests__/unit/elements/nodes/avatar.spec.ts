import { elementNodeAvatar } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('element label oversized', () => {
  it('render', async () => {
    const graph = await createDemoGraph(elementNodeAvatar);
    await expect(graph).toMatchSnapshot(__filename);

    graph.destroy();
  });
});
