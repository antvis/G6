import { createGraph, sleep } from '@@/utils';

describe('bug: plugin-minimap-combo-collapsed', () => {
  it('should be collapsed', async () => {
    const graph = createGraph({
      animation: false,
      data: {
        nodes: [{ id: 'node1', combo: 'combo1' }, { id: 'node2' }],
        edges: [{ source: 'node1', target: 'node2' }],
        combos: [{ id: 'combo1' }],
      },
      layout: {
        type: 'grid',
      },
      plugins: [
        {
          key: 'minimap',
          type: 'minimap',
          size: [240, 160],
        },
      ],
    });

    await graph.render();

    await expect(graph).toMatchSnapshot(__filename);

    await sleep(1000);
    graph.collapseElement('combo1');
    graph.translateElementBy('combo1', [100, 100]);

    await graph.render();

    await expect(graph).toMatchSnapshot(__filename, 'update-collapsed-combo');
  });
});
