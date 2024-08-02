import { NodeEvent } from '@/src';
import { createGraph } from '@@/utils';

describe('bugs:element-combo-drag', () => {
  it('drag combo', async () => {
    const graph = createGraph({
      animation: false,
      data: {
        nodes: [
          { id: 'node-0', combo: 'combo-0', style: { x: 100, y: 100 } },
          { id: 'node-1', combo: 'combo-0', style: { x: 150, y: 100 } },
          { id: 'node-2', style: { x: 250, y: 100 } },
        ],
        edges: [{ source: 'node-1', target: 'node-2' }],
        combos: [{ id: 'combo-0' }],
      },
      behaviors: ['drag-element'],
    });

    await graph.render();

    await expect(graph).toMatchSnapshot(__filename);

    await graph.collapseElement('combo-0');

    await expect(graph).toMatchSnapshot(__filename, 'collapse-combo-0');

    graph.emit(NodeEvent.DRAG_START, { target: { id: 'node-2' }, targetType: 'node' });
    graph.emit(NodeEvent.DRAG, { dx: 50, dy: 50 });
    graph.emit(NodeEvent.DRAG_END, { target: { id: 'node-2' }, targetType: 'node' });
    await expect(graph).toMatchSnapshot(__filename, 'drag-node-2');

    graph.emit(NodeEvent.DRAG_START, { target: { id: 'combo-0' }, targetType: 'combo' });
    graph.emit(NodeEvent.DRAG, { dx: 50, dy: 50 });
    graph.emit(NodeEvent.DRAG_END, { target: { id: 'combo-0' }, targetType: 'combo' });
    await expect(graph).toMatchSnapshot(__filename, 'drag-combo-0');
  });
});
