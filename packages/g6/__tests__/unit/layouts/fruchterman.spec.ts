import { layoutFruchtermanBasic, layoutFruchtermanCluster } from '@@/demo/case';
import { createDemoGraph } from '@@/utils';
import { clear, mock } from 'jest-random-mock';

describe('layout fruchterman', () => {
  beforeAll(() => {
    mock();
  });

  afterAll(() => {
    clear();
  });

  it('basic', async () => {
    const graph = await createDemoGraph(layoutFruchtermanBasic);
    await expect(graph).toMatchSnapshot(__filename, 'layout-fruchterman-basic');

    graph.destroy();
  });

  it('cluster', async () => {
    const graph = await createDemoGraph(layoutFruchtermanCluster);
    await expect(graph).toMatchSnapshot(__filename, 'layout-fruchterman-cluster');
    graph.destroy();
  });
});
