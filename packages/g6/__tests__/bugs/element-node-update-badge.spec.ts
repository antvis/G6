import { createGraph } from '@@/utils';

describe('bug: element-node-update-badge', () => {
  it('should update node badge', async () => {
    const graph = createGraph({
      animation: false,
      node: {
        style: {
          badge: true,
          badges: [{ text: '1' }],
          badgeFill: 'white',
          badgeBackgroundFill: 'red',
        },
      },
      data: {
        nodes: [{ id: 'node-0', style: { x: 100, y: 100 }, states: ['inactive'] }],
      },
    });

    await graph.render();

    await expect(graph).toMatchSnapshot(__filename);

    graph.setElementState('node-0', []);

    await graph.render();

    await expect(graph).toMatchSnapshot(__filename, 'update-node-badge');
  });
});
