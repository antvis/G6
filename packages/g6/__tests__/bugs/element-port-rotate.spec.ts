import { createGraph } from '@@/utils';

describe('element port rotate', () => {
  it('default', async () => {
    const graph = createGraph({
      data: {
        nodes: [{ id: 'node-1', style: { x: 100, y: 100 } }],
      },
      node: {
        type: 'rect',
        style: {
          size: [50, 150],
          port: true,
          portR: 3,
          ports: [
            { key: 'port-1', placement: [0, 0.15] },
            { key: 'port-2', placement: 'left' },
            { key: 'port-3', placement: [0, 0.85] },
          ],
          transform: [['rotate', 45]],
        },
      },
    });

    await graph.draw();

    await expect(graph).toMatchSnapshot(__filename);
  });
});
