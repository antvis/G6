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

    const getZIndexOf = (id: string): number => {
      // @ts-expect-error context is private
      const context = graph.context;
      return context.element!.getElement(id)!.style.zIndex;
    };

    expect(getZIndexOf('combo-1')).toBe(0);
    expect(getZIndexOf('node-1')).toBe(0);
    expect(graph.getComboData('combo-2').style?.zIndex).toBe(1);
    expect(graph.getNodeData('node-2').style?.zIndex).toBe(2);

    graph.frontElement('node-1');

    expect(getZIndexOf('node-1')).toBe(3);

    graph.frontElement('combo-1');

    expect(getZIndexOf('combo-1')).toBe(4);

    await graph.expandElement('combo-1', false);
    await graph.expandElement('combo-2', false);

    expect(getZIndexOf('combo-1')).toBe(4);
    expect(getZIndexOf('combo-2')).toBe(5);
    expect(getZIndexOf('node-2')).toBe(6);
  });
});
