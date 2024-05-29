import { layoutForceLattice } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('layout d3 force lattice', () => {
  it('render', async () => {
    const graph = await createDemoGraph(layoutForceLattice);
    await expect(graph).toMatchSnapshot(__filename);

    // drag

    graph.destroy();
  });
});
