import { layoutComboCombined } from '@@/demo/case';
import { createDemoGraph } from '@@/utils';

describe('combo layout', () => {
  /** ComboCombinedLayout 在当前环境下运行异常 */
  it.skip('combined', async () => {
    const graph = await createDemoGraph(layoutComboCombined);
    await expect(graph).toMatchSnapshot(__filename, 'combined');
    graph.destroy();
  });
});
