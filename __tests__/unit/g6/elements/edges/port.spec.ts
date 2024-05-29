import { elementEdgePort } from '@@/demos/g6';
import { createDemoGraph } from '@@/utils';

describe('element edge port', () => {
  it('render', async () => {
    const graph = await createDemoGraph(elementEdgePort);
    await expect(graph).toMatchSnapshot(__filename);

    graph.destroy();
  });
});
