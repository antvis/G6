import { layoutIndented } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('layout d3 force', () => {
  it('render', async () => {
    const graph = await createDemoGraph(layoutIndented);
    await expect(graph).toMatchSnapshot(__filename);

    graph.destroy();
  });
});
