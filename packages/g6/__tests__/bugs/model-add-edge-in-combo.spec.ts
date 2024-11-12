import { createGraph } from '@@/utils';

describe('add edge in combo', () => {
  it('add edge in combo without zIndex', async () => {
    const graph = createGraph({
      data: {
        nodes: [
          { id: 'node-1', combo: 'combo-1', style: { x: 100, y: 100 } },
          { id: 'node-2', combo: 'combo-1', style: { x: 200, y: 200 } },
        ],
        combos: [{ id: 'combo-1' }],
      },
    });

    await graph.draw();

    expect(graph.getComboData('combo-1').style?.zIndex).toBe(0);
    expect(graph.getNodeData('node-1').style?.zIndex).toBe(1);

    graph.addEdgeData([{ id: 'edge', source: 'node-1', target: 'node-2' }]);
    await graph.draw();

    expect(graph.getEdgeData('edge').style?.zIndex).toBe(0);
    // @ts-expect-error skip the type check
    expect(graph.context.element?.getElement('edge')?.style.zIndex).toBe(0);
  });

  it('add edge in combo with zIndex', async () => {
    const graph = createGraph({
      data: {
        nodes: [
          { id: 'node-1', combo: 'combo-1', style: { x: 100, y: 100 } },
          { id: 'node-2', combo: 'combo-1', style: { x: 200, y: 200 } },
          { id: 'node-3', style: { x: 300, y: 300, zIndex: 5 } },
        ],
        combos: [{ id: 'combo-1' }],
      },
    });

    await graph.draw();

    expect(graph.getComboData('combo-1').style?.zIndex).toBe(0);

    await graph.frontElement('combo-1');

    expect(graph.getComboData('combo-1').style?.zIndex).toBe(5 + 1);
    expect(graph.getNodeData('node-1').style?.zIndex).toBe(5 + 1 + 1);

    graph.addEdgeData([{ id: 'edge', source: 'node-1', target: 'node-2' }]);
    await graph.draw();

    expect(graph.getEdgeData('edge').style?.zIndex).toBe(5 + 1);
    // @ts-expect-error skip the type check
    expect(graph.context.element?.getElement('edge')?.style.zIndex).toBe(5 + 1);
  });
});
