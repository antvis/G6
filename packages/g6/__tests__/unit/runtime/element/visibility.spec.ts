import type { Graph } from '@/src';
import { createGraph } from '@@/utils';

describe('element visibility', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = createGraph({
      data: {
        nodes: [
          { id: 'node-1', style: { x: 50, y: 50 } },
          { id: 'node-2', style: { x: 200, y: 50 } },
          { id: 'node-3', style: { x: 125, y: 150, opacity: 0.5 } },
        ],
        edges: [
          { source: 'node-1', target: 'node-2' },
          { source: 'node-2', target: 'node-3', style: { opacity: 0.5 } },
          { source: 'node-3', target: 'node-1' },
        ],
      },
      theme: 'light',
      node: {
        style: {
          size: 20,
        },
      },
    });

    await graph.render();
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
