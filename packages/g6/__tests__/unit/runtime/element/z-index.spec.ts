import type { Graph } from '@/src';
import { createGraph } from '@@/utils';

describe('element z-index', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = createGraph({
      data: {
        nodes: [
          { id: 'node-1', style: { x: 150, y: 150, fill: 'red' } },
          { id: 'node-2', style: { x: 175, y: 175, fill: 'green' } },
          { id: 'node-3', style: { x: 200, y: 200, fill: 'blue' } },
        ],
      },
      theme: 'light',
      node: {
        style: {
          size: 50,
        },
      },
    });

    await graph.render();
  });

  afterAll(() => {
    graph.destroy();
  });

  it('front', async () => {
    graph.frontElement('node-2');

    await expect(graph).toMatchSnapshot(__filename, 'front');
  });

  it('to', async () => {
    graph.setElementZIndex({ 'node-2': -1 });

    await expect(graph).toMatchSnapshot(__filename);
  });
});
