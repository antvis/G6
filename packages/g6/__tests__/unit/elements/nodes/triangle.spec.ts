import { elementNodeTriangle } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('element label oversized', () => {
  it('render', async () => {
    const graph = await createDemoGraph(elementNodeTriangle);
    await expect(graph).toMatchSnapshot(__filename);

    graph.destroy();
  });
});
