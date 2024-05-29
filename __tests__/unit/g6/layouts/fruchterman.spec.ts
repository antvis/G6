import { layoutFruchtermanBasic, layoutFruchtermanCluster } from '@@/demos';
import { createDemoGraph } from '@@/utils';
import { clear as clearMockRandom, mock as mockRandom } from 'jest-random-mock';

describe('layout fruchterman', () => {
  beforeAll(() => {
    mockRandom();
  });

  afterAll(() => {
    clearMockRandom();
  });

  it('basic', async () => {
    const graph = await createDemoGraph(layoutFruchtermanBasic);
    await expect(graph).toMatchSnapshot(__filename, 'basic');

    graph.destroy();
  });

  it('cluster', async () => {
    const graph = await createDemoGraph(layoutFruchtermanCluster);
    await expect(graph).toMatchSnapshot(__filename, 'cluster');
    graph.destroy();
  });
});
