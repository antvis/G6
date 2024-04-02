import { elementNodeImage } from '@/__tests__/demos';
import { createDemoGraph } from '@@/utils';

describe('element label oversized', () => {
  it('render', async () => {
    const graph = await createDemoGraph(elementNodeImage);
    await expect(graph).toMatchSnapshot(__filename);

    graph.destroy();
  });
});
