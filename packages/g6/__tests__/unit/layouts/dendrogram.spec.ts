import { layoutDendrogramBasic, layoutDendrogramTb } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('dendrogram', () => {
  it('basic', async () => {
    const graph = await createDemoGraph(layoutDendrogramBasic);
    await expect(graph).toMatchSnapshot(__filename, 'basic');
    graph.destroy();
  });

  it('tb', async () => {
    const graph = await createDemoGraph(layoutDendrogramTb);
    await expect(graph).toMatchSnapshot(__filename, 'tb');
    graph.destroy();
  });
});
