import { createGraph } from '@@/utils';

describe('element orth router', () => {
  it('test polyline orth', async () => {
    const graph = createGraph({
      animation: true,
      data: {
        nodes: [
          {
            id: 'node-1',
            style: { x: 310, y: 280, size: 80 },
          },
          {
            id: 'node-2',
            style: { x: 300, y: 175 },
          },
        ],
        edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2' }],
      },
      edge: {
        type: 'polyline',
        style: {
          router: { type: 'orth' },
        },
      },
    });

    await graph.draw();

    await expect(graph).toMatchSnapshot(__filename);
  });
});
