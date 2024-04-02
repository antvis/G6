import { elementEdgeCustomArrow } from '@/__tests__/demos';
import { createDemoGraph } from '@@/utils';

describe('element edge custom arrow', () => {
  it('render', async () => {
    const graph = await createDemoGraph(elementEdgeCustomArrow);
    await expect(graph).toMatchSnapshot(__filename);

    graph.destroy();
  });
});
