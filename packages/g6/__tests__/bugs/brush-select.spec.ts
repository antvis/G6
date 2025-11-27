import { createGraph } from '@@/utils';

describe('BrushSelect clear states issue', () => {
  it('Should not clear states except selection state', async () => {
    const graph = createGraph({
      data: {
        nodes: [
          { id: 'node-1', style: { x: 250, y: 150 } },
          { id: 'node-3', style: { x: 250, y: 300 } },
        ],
        edges: [{ id: 'edge-1', source: 'node-1', target: 'node-3' }],
      },
      behaviors: ['brush-select'],
    });

    await graph.draw();
    graph.setElementState({ 'edge-1': ['selected', 'active', 'custom-state'] });

    const currentStates = graph.getElementState('edge-1');
    expect(currentStates).toEqual(['selected', 'active', 'custom-state']);

    await graph.emit('canvas:click');

    const newStates = graph.getElementState('edge-1');
    console.log(newStates);
    expect(newStates).toEqual(['active', 'custom-state']);
  });
});
