import { createGraph } from '@@/utils';

describe('bug: element-edge-update-arrow', () => {
  it('should update edge arrow', async () => {
    const graph = createGraph({
      animation: false,
      data: {
        nodes: [
          { id: 'node-0', style: { x: 100, y: 100 } },
          { id: 'node-1', style: { x: 200, y: 100 } },
        ],
        edges: [
          {
            source: 'node-0',
            target: 'node-1',
            style: { startArrow: true, startArrowFill: 'red', endArrow: true, endArrowFill: 'green' },
          },
        ],
      },
    });

    await graph.render();

    await expect(graph).toMatchSnapshot(__filename);

    graph.updateEdgeData([
      {
        source: 'node-0',
        target: 'node-1',
        style: { startArrowFill: 'purple', startArrowStroke: 'blue', endArrowFill: 'pink', endArrowStroke: 'yellow' },
      },
    ]);

    await graph.render();

    await expect(graph).toMatchSnapshot(__filename, 'update-arrow');
  });
});
