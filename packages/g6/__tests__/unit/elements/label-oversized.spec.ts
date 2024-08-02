import { elementLabelOversized } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('element label oversized', () => {
  it('render', async () => {
    const graph = await createDemoGraph(elementLabelOversized);
    await expect(graph).toMatchSnapshot(__filename);

    graph.destroy();
  });
});
