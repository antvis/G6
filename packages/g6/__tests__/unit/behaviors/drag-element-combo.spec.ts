import type { Graph } from '@/src';
import { CanvasEvent, ComboEvent, NodeEvent } from '@/src';
import { behaviorExpandCollapseCombo } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('behavior drag combo', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(behaviorExpandCollapseCombo, { animation: false });
  });

  afterAll(() => {
    graph.destroy();
  });

  it('default status', async () => {
    graph.setBehaviors([{ type: 'drag-element', dropEffect: 'link' }]);
    graph.expandElement('combo-1');
    await expect(graph).toMatchSnapshot(__filename);
  });

  it('drag node out', async () => {
    // drag node-2 to combo-2
    graph.emit(NodeEvent.DRAG_START, { target: { id: 'node-2' }, targetType: 'node' });
    graph.emit(NodeEvent.DRAG, { dx: 80, dy: 60 });
    await expect(graph).toMatchSnapshot(__filename, 'drag-node-2-before-drop-out');
    graph.emit(ComboEvent.DROP, { target: { id: 'combo-2' } });
    await expect(graph).toMatchSnapshot(__filename, 'drag-node-2-after-drop-out');

    // drag node-1 to canvas
    graph.emit(NodeEvent.DRAG_START, { target: { id: 'node-1' }, targetType: 'node' });
    graph.emit(NodeEvent.DRAG, { dx: -70, dy: -70 });
    await expect(graph).toMatchSnapshot(__filename, 'drag-node-1-before-drop-out');
    graph.emit(CanvasEvent.DROP, { target: {} });
    await expect(graph).toMatchSnapshot(__filename, 'drag-node-1-after-drop-out');
  });

  it('drag node into', async () => {
    graph.emit(NodeEvent.DRAG_START, { target: { id: 'node-1' }, targetType: 'node' });
    graph.emit(NodeEvent.DRAG, { dx: 250, dy: 250 });
    await expect(graph).toMatchSnapshot(__filename, 'drag-node-1-before-drop-into');
    graph.emit(ComboEvent.DROP, { target: { id: 'combo-2' } });
    await expect(graph).toMatchSnapshot(__filename, 'drag-node-1-after-drop-into');
  });

  it('drag node move', async () => {
    graph.emit(NodeEvent.DRAG_START, { target: { id: 'node-1' }, targetType: 'node' });
    graph.emit(NodeEvent.DRAG, { dx: 100, dy: 100 });
    await expect(graph).toMatchSnapshot(__filename, 'drag-node-1-before-drop-move');
    graph.emit(ComboEvent.DROP, { target: { id: 'combo-2' } });
    await expect(graph).toMatchSnapshot(__filename, 'drag-node-1-after-drop-move');
  });

  it('drag combo move', async () => {
    graph.emit(ComboEvent.DRAG_START, { target: { id: 'combo-1' }, targetType: 'combo' });
    graph.emit(ComboEvent.DRAG, { dx: 100, dy: 100 });
    await expect(graph).toMatchSnapshot(__filename, 'drag-combo-1-before-drop-move');
    graph.emit(ComboEvent.DROP, { target: { id: 'combo-2' } });
    await expect(graph).toMatchSnapshot(__filename, 'drag-combo-1-after-drop-move');
  });

  it('drag combo out', async () => {
    graph.emit(ComboEvent.DRAG_START, { target: { id: 'combo-1' }, targetType: 'combo' });
    graph.emit(ComboEvent.DRAG, { dx: -250, dy: -250 });
    await expect(graph).toMatchSnapshot(__filename, 'drag-combo-1-before-drop-out');
    graph.emit(CanvasEvent.DROP, { target: {} });
    await expect(graph).toMatchSnapshot(__filename, 'drag-combo-1-after-drop-out');
  });

  it('drag combo into', async () => {
    graph.emit(ComboEvent.DRAG_START, { target: { id: 'combo-2' }, targetType: 'combo' });
    graph.emit(ComboEvent.DRAG, { dx: -200, dy: -200 });
    await expect(graph).toMatchSnapshot(__filename, 'drag-combo-2-before-drop-into');
    graph.emit(ComboEvent.DROP, { target: { id: 'combo-1' } });
    await expect(graph).toMatchSnapshot(__filename, 'drag-combo-2-after-drop-into');
  });
});
