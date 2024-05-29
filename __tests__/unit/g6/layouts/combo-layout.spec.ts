import { layoutComboCombined } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('combo layout', () => {
  it('combined', async () => {
    const graph = await createDemoGraph(layoutComboCombined);
    await expect(graph).toMatchSnapshot(__filename, 'combined');
    graph.destroy();
  });
});
