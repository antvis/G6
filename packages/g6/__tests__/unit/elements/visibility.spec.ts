import type { Graph } from '@/src';
import { elementVisibility } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('element visibility', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(elementVisibility, { animation: false });
  });

  afterAll(() => {
    graph.destroy();
  });

  it('default status', async () => {
    await expect(graph).toMatchSnapshot(__filename);
  });

  it('hide', async () => {
    await graph.hideElement(['node-1', 'node-2', 'node-3', 'edge-1', 'edge-2', 'edge-3']);

    await expect(graph).toMatchSnapshot(__filename, 'hide');
  });

  it('show', async () => {
    await graph.showElement(['node-1', 'node-2', 'edge-1']);

    await expect(graph).toMatchSnapshot(__filename, 'show');
  });

  it('show and hide', async () => {
    await graph.setElementVisibility({
      'node-1': 'hidden',
      'node-3': 'visible',
      'edge-1': 'hidden',
      'edge-2': 'visible',
    });

    await expect(graph).toMatchSnapshot(__filename, 'show-and-hide');
  });

  it('show and hide single api', async () => {
    graph.setElementVisibility('node-1', 'visible');
    await expect(graph).toMatchSnapshot(__filename, 'show-single');

    graph.setElementVisibility('node-1', 'hidden');
    await expect(graph).toMatchSnapshot(__filename, 'hide-single');
  });
});
