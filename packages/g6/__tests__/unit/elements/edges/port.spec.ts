import { elementEdgePort } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('element edge port', () => {
  it('render', async () => {
    const graph = await createDemoGraph(elementEdgePort);
    await expect(graph).toMatchSnapshot(__filename);

    graph.destroy();
  });
});
