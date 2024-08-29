import { createGraph } from '@@/utils';

describe('api expand element z-index', () => {
  it('when expand element, the z-index of descendant elements should be updated', async () => {
    const graph = createGraph({
      animation: false,
      data: {
        nodes: [{ id: 'node-1' }, { id: 'node-2', combo: 'combo-2' }],
        combos: [
          { id: 'combo-1', style: { collapsed: true } },
          { id: 'combo-2', combo: 'combo-1', style: { collapsed: true } },
        ],
      },
    });

    await graph.draw();

    // @ts-expect-error context is private
    const context = graph.context;

    graph.frontElement('node-1');

    expect(context.element!.getElement('node-1')!.style.zIndex).toBe(1);

    graph.frontElement('combo-1');

    expect(context.element!.getElement('combo-1')!.style.zIndex).toBe(2);

    await graph.expandElement('combo-1', false);

    await graph.expandElement('combo-2', false);

    expect(context.element!.getElement('node-2')!.style.zIndex).toBe(2);
  });
});
