import { createGraph } from '@@/utils';

describe('bug: utils-set-visibility', () => {
  it('should set correct', async () => {
    const graph = createGraph({
      animation: true,
      data: {
        nodes: [
          {
            id: 'node-0',
            style: {
              x: 100,
              y: 100,
              labelText: 'label',
              iconText: 'icon',
              badges: [{ text: 'b1', placement: 'right-top' }],
            },
          },
        ],
      },
    });

    await graph.render();

    await expect(graph).toMatchSnapshot(__filename);

    await graph.hideElement('node-0');

    await expect(graph).toMatchSnapshot(__filename, 'hidden');

    await graph.showElement('node-0');

    await expect(graph).toMatchSnapshot(__filename, 'visible');
  });
});
