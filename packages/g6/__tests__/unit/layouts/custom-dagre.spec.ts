import { layoutCustomDagre } from '@/__tests__/demos';
import { createDemoGraph } from '@@/utils';

describe('custom dagre', () => {
  it('render', async () => {
    const graph = await createDemoGraph(layoutCustomDagre);
    await expect(graph).toMatchSnapshot(__filename);

    graph.destroy();
  });
});
