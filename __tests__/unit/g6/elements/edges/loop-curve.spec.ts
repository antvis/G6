import { elementEdgeLoopCurve } from '@@/demos/g6';
import { createDemoGraph } from '@@/utils';

describe('element edge loop curve', () => {
  it('render', async () => {
    const graph = await createDemoGraph(elementEdgeLoopCurve);
    await expect(graph).toMatchSnapshot(__filename);

    graph.destroy();
  });
});
