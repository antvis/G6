import type { Graph } from '@/src';
import { controllerElementVisibility } from '@@/demo/static/controller-element-visibility';
import { createDemoGraph } from '@@/utils';

describe('element visibility', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(controllerElementVisibility);
  });

  afterAll(() => {
    graph.destroy();
  });

  it('hide', async () => {
    graph.hideElement(['node-3', 'node-2-node-3', 'node-3-node-1']);

    expect(graph.getElementVisibility('node-3')).toBe('hidden');
    expect(graph.getElementVisibility('node-2-node-3')).toBe('hidden');
    expect(graph.getElementVisibility('node-3-node-1')).toBe('hidden');

    await expect(graph).toMatchSnapshot(__filename, 'hidden');
  });

  it('show', async () => {
    graph.showElement(['node-3', 'node-2-node-3', 'node-3-node-1']);

    expect(graph.getElementVisibility('node-3')).toBe('visible');
    expect(graph.getElementVisibility('node-2-node-3')).toBe('visible');
    expect(graph.getElementVisibility('node-3-node-1')).toBe('visible');

    await expect(graph).toMatchSnapshot(__filename, 'visible');
  });
});
