import { elementNodeRect } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('element label oversized', () => {
  it('render', async () => {
    const graph = await createDemoGraph(elementNodeRect);
    await expect(graph).toMatchSnapshot(__filename);

    graph.destroy();
  });
});
