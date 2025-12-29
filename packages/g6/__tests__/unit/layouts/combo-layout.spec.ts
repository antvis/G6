import { layoutComboCombined } from '@@/demos';
import { createDemoGraph } from '@@/utils';
import { clear as clearMockRandom, mock as mockRandom } from 'jest-random-mock';

describe('combo layout', () => {
  beforeEach(() => {
    mockRandom();
  });

  afterEach(() => {
    clearMockRandom();
  });

  it('combined', async () => {
    const graph = await createDemoGraph(layoutComboCombined);
    await expect(graph).toMatchSnapshot(__filename, 'combined');
    graph.destroy();
  });
});
