import { elementNodeEllipse } from '@/__tests__/demos';
import { createDemoGraph } from '@@/utils';

describe('element label oversized', () => {
  it('render', async () => {
    const graph = await createDemoGraph(elementNodeEllipse);
    await expect(graph).toMatchSnapshot(__filename);

    graph.destroy();
  });
});
