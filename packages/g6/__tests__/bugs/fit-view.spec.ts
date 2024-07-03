import { createGraph } from '@@/utils';

describe('fit view', () => {
  it('suite 1', async () => {
    // https://github.com/antvis/G6/issues/5943
    const graph = createGraph({
      data: {
        nodes: [
          { id: 'node-1', style: { x: 250, y: 150 } },
          { id: 'node-2', style: { x: 350, y: 150 } },
          { id: 'node-3', style: { x: 250, y: 300 } },
        ],
      },
      behaviors: ['zoom-canvas'],
    });

    await graph.draw();

    await expect(graph).toMatchSnapshot(__filename);

    // wheel
    graph.emit('wheel', { deltaY: 5 });
    graph.emit('wheel', { deltaY: 5 });

    await expect(graph).toMatchSnapshot(__filename, 'after-wheel');

    // fit center
    await graph.fitCenter();
    await graph.fitCenter();
    await expect(graph).toMatchSnapshot(__filename, 'after-fit-center');

    // fit view
    await graph.fitView();
    await expect(graph).toMatchSnapshot(__filename, 'after-fit-view');

    // fit center again
    await graph.fitCenter();
    await expect(graph).toMatchSnapshot(__filename, 'after-fit-center-again');
  });
});
