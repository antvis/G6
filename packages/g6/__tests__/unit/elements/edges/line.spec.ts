import { elementEdgeLine } from '@/__tests__/demos';
import { createDemoGraph } from '@@/utils';

describe('element edge line', () => {
  it('render', async () => {
    const graph = await createDemoGraph(elementEdgeLine);
    await expect(graph).toMatchSnapshot(__filename);

    graph.destroy();
  });
});
