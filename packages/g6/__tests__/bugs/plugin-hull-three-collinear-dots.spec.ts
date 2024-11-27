import { createGraph } from '@@/utils';

describe('bug: plugin-hull-three-collinear-dots', () => {
  it('fully enclosed', async () => {
    const graph = createGraph({
      animation: false,
      data: {
        nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }],
      },
      layout: {
        type: 'grid',
        rows: 3,
        cols: 1,
      },
      plugins: [
        {
          key: 'hull',
          type: 'hull',
          members: ['node1', 'node2', 'node3'],
        },
      ],
    });

    await graph.render();

    await expect(graph).toMatchSnapshot(__filename);
  });
});
