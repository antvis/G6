import { createGraph } from '@@/utils';

describe('element states', () => {
  it('element state', async () => {
    const graph = createGraph({
      data: {
        nodes: [{ id: 'node-1' }, { id: 'node-2' }],
        edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2' }],
      },
    });

    await graph.draw();

    expect(graph.getElementState('node-1')).toEqual([]);

    graph.setElementState('node-1', 'selected');
    expect(graph.getElementState('node-1')).toEqual(['selected']);

    graph.setElementState('node-1', ['selected', 'hovered']);
    expect(graph.getElementState('node-1')).toEqual(['selected', 'hovered']);

    graph.setElementState('node-1', '');
    expect(graph.getElementState('node-1')).toEqual([]);

    graph.setElementState('node-1', 'selected');

    graph.setElementState('node-1', []);
    expect(graph.getElementState('node-1')).toEqual([]);

    graph.destroy();
  });
});
