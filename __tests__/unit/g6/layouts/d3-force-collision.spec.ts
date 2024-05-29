import { layoutForceCollision } from '@@/demos';
import { createDemoGraph } from '@@/utils';
import { clear as clearMockRandom, mock as mockRandom } from 'jest-random-mock';

describe('layout d3 force collision', () => {
  beforeAll(() => {
    mockRandom();
  });

  afterAll(() => {
    clearMockRandom();
  });

  it('render', async () => {
    const graph = await createDemoGraph(layoutForceCollision);
    await expect(graph).toMatchSnapshot(__filename);

    graph.destroy();
  });
});
