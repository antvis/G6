import { createGraph } from '@@/utils';

describe('bugs:element-node-collapse', () => {
  it('collapse or expand a node should not throw error', async () => {
    const graph = createGraph({
      data: {
        nodes: [
          { id: 'node1', combo: 'combo1', style: { x: 250, y: 150 } },
          { id: 'node2', combo: 'combo1', style: { x: 350, y: 150 } },
          { id: 'node3', combo: 'combo2', style: { x: 250, y: 300 } },
        ],
        combos: [
          { id: 'combo1', combo: 'combo2' },
          { id: 'combo2', style: {} },
        ],
      },
      combo: {
        style: {
          labelText: (d) => d.id,
          labelPadding: [1, 5],
          labelFill: '#fff',
          labelBackground: true,
          labelBackgroundRadius: 10,
          labelBackgroundFill: '#7863FF',
        },
      },
    });

    await graph.render();

    const fn = async () => {
      await graph.collapseElement('node1', false);
      await graph.expandElement('node2', false);
    };

    expect(fn).not.toThrow();
  });
});
