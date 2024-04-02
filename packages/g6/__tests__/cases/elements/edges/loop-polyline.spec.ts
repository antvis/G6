import { elementEdgeLoopPolyline } from '@/__tests__/demos';
import { createDemoGraph } from '@@/utils';

describe('element edge loop polyline', () => {
  it('render', async () => {
    const graph = await createDemoGraph(elementEdgeLoopPolyline);
    await expect(graph).toMatchSnapshot(__filename);

    graph.destroy();
  });
});
