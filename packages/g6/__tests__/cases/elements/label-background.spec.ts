import { elementLabelBackground } from '@/__tests__/demos';
import { createDemoGraph } from '@@/utils';

describe('element label background', () => {
  it('render', async () => {
    const graph = await createDemoGraph(elementLabelBackground);
    await expect(graph).toMatchSnapshot(__filename);

    graph.destroy();
  });
});
