import type { Graph } from '@/src';
import { ComboEvent, NodeEvent } from '@/src';
import { elementZIndex } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('element zIndex', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(elementZIndex, { animation: false });
  });

  afterAll(() => {
    graph.destroy();
  });

  it('default status', async () => {
    await expect(graph).toMatchSnapshot(__filename);
  });

  it('drag overlap', async () => {
    graph.emit(NodeEvent.DRAG_START, { target: { id: 'node-1' }, targetType: 'node' });
    graph.emit(NodeEvent.DRAG, { dx: 140, dy: 0 });
    await expect(graph).toMatchSnapshot(__filename, 'drag-overlap-node-1');
    graph.emit(NodeEvent.DRAG_END);

    graph.emit(NodeEvent.DRAG_START, { target: { id: 'node-2' }, targetType: 'node' });
    graph.emit(NodeEvent.DRAG, { dx: -65, dy: 100 });
    await expect(graph).toMatchSnapshot(__filename, 'drag-overlap-node-2');
    graph.emit(NodeEvent.DRAG_END);

    graph.emit(NodeEvent.DRAG_START, { target: { id: 'node-3' }, targetType: 'node' });
    graph.emit(NodeEvent.DRAG, { dx: 75, dy: -100 });
    await expect(graph).toMatchSnapshot(__filename, 'drag-overlap-node-3');
    graph.emit(NodeEvent.DRAG_END);
  });

  it('combo overlap', async () => {
    graph.emit(ComboEvent.DRAG_START, { target: { id: 'combo-1' }, targetType: 'combo' });
    graph.emit(ComboEvent.DRAG, { dx: 20, dy: 0 });
    await expect(graph).toMatchSnapshot(__filename, 'drag-combo-1');
    graph.emit(ComboEvent.DRAG_END);

    graph.emit(ComboEvent.DRAG_START, { target: { id: 'combo-2' }, targetType: 'combo' });
    graph.emit(ComboEvent.DRAG, { dx: 20, dy: 0 });
    await expect(graph).toMatchSnapshot(__filename, 'drag-combo-2');
    graph.emit(ComboEvent.DRAG_END);

    graph.emit(ComboEvent.DRAG_START, { target: { id: 'combo-3' }, targetType: 'combo' });
    graph.emit(ComboEvent.DRAG, { dx: 20, dy: 0 });
    await expect(graph).toMatchSnapshot(__filename, 'drag-combo-3');
    graph.emit(ComboEvent.DRAG_END);

    graph.emit(ComboEvent.DRAG_START, { target: { id: 'combo-3' }, targetType: 'combo' });
    graph.emit(ComboEvent.DRAG, { dx: 20, dy: 0 });
    await expect(graph).toMatchSnapshot(__filename, 'drag-overlap-combo-3');
    graph.emit(ComboEvent.DRAG_END);

    graph.emit(ComboEvent.DRAG_START, { target: { id: 'combo-4' }, targetType: 'combo' });
    graph.emit(ComboEvent.DRAG, { dx: -20, dy: 0 });
    await expect(graph).toMatchSnapshot(__filename, 'drag-overlap-combo-4(1)');
    graph.emit(ComboEvent.DRAG_END);

    graph.emit(ComboEvent.DRAG_START, { target: { id: 'combo-4' }, targetType: 'combo' });
    graph.emit(ComboEvent.DRAG, { dx: -40, dy: 0 });
    await expect(graph).toMatchSnapshot(__filename, 'drag-overlap-combo-4(2)');
    graph.emit(ComboEvent.DRAG_END);

    graph.emit(ComboEvent.DRAG_START, { target: { id: 'combo-4' }, targetType: 'combo' });
    graph.emit(ComboEvent.DRAG, { dx: -40, dy: 0 });
    await expect(graph).toMatchSnapshot(__filename, 'drag-overlap-combo-4(3)');
    graph.emit(ComboEvent.DRAG_END);
  });
});
