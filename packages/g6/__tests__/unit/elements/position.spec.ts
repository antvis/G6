import type { Graph } from '@/src';
import { elementPosition } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('element position', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(elementPosition, { animation: false });
  });

  afterAll(() => {
    graph.destroy();
  });

  it('default status', async () => {
    await expect(graph).toMatchSnapshot(__filename);
  });

  it('translateElementTo', async () => {
    await graph.translateElementTo({
      'node-1': [125, 100],
      'node-2': [125, 100],
      'node-3': [125, 100],
    });
    await expect(graph).toMatchSnapshot(__filename, 'translateElementTo');
  });

  it('translateElementBy', async () => {
    await graph.translateElementBy({
      'node-1': [-50, -50],
      'node-2': [+50, -50],
      'node-3': [0, +50],
    });
    await expect(graph).toMatchSnapshot(__filename, 'translateElementBy');
  });

  it('translateElementTo single api', async () => {
    graph.translateElementTo('node-1', [50, 50]);
    await expect(graph).toMatchSnapshot(__filename, 'translateElementTo-single');
  });

  it('translateElementBy single api', async () => {
    graph.translateElementBy('node-1', [50, 50]);
    await expect(graph).toMatchSnapshot(__filename, 'translateElementBy-single');
  });
});
