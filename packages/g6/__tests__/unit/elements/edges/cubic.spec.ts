import { elementEdgeCubic } from '@/__tests__/demos';
import { createDemoGraph } from '@@/utils';

describe('element edge cubic', () => {
  it('render', async () => {
    const graph = await createDemoGraph(elementEdgeCubic);
    await expect(graph).toMatchSnapshot(__filename);

    graph.destroy();
  });
});
