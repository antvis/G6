import { elementEdgePolyline } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('element edge polyline', () => {
  it('render', async () => {
    const graph = await createDemoGraph(elementEdgePolyline);
    await expect(graph).toMatchSnapshot(__filename);

    graph.destroy();
  });
});
