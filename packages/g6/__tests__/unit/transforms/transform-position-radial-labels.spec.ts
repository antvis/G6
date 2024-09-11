import { transformPlaceRadialLabels } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('transform position radial labels', () => {
  it('render', async () => {
    const graph = await createDemoGraph(transformPlaceRadialLabels);
    await expect(graph).toMatchSnapshot(__filename);

    graph.destroy();
  });
});
