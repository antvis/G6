import type { Graph } from '@/src';
import { ComboEvent, CommonEvent, NodeEvent } from '@/src';
import { behaviorDragNode } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('behavior drag element', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(behaviorDragNode, { animation: false });
  });

  afterAll(() => {
    graph.destroy();
  });

  it('pointer cursor', () => {
    graph.emit(NodeEvent.POINTER_ENTER, {
      target: { id: 'node-4' },
      targetType: 'node',
      type: CommonEvent.POINTER_ENTER,
    });
    expect(graph.getCanvas().getConfig().cursor).toBe('grab');

    graph.emit(NodeEvent.POINTER_LEAVE, {
      target: { id: 'node-4' },
      targetType: 'node',
      type: CommonEvent.POINTER_LEAVE,
    });
    expect(graph.getCanvas().getConfig().cursor).toBe('default');
  });

  it('default status', async () => {
    await expect(graph).toMatchSnapshot(__filename);

    graph.emit(NodeEvent.DRAG_START, { target: { id: 'node-4' }, targetType: 'node' });
    graph.emit(NodeEvent.DRAG, { dx: 20, dy: 20 });
    expect(graph.getCanvas().getConfig().cursor).toBe('grabbing');
    graph.emit(NodeEvent.DRAG_END);

    await expect(graph).toMatchSnapshot(__filename, 'after-drag');
  });

  it('hide edges', async () => {
    graph.setBehaviors([{ type: 'drag-element', hideEdge: 'both' }]);
    graph.emit(NodeEvent.DRAG_START, { target: { id: 'node-4' }, targetType: 'node' });
    graph.emit(NodeEvent.DRAG, { dx: 20, dy: 20 });
    await expect(graph).toMatchSnapshot(__filename, 'hideEdge-both');
    graph.emit(NodeEvent.DRAG_END);

    graph.setBehaviors([{ type: 'drag-element', hideEdge: 'in' }]);
    graph.emit(NodeEvent.DRAG_START, { target: { id: 'node-3' }, targetType: 'node' });
    graph.emit(NodeEvent.DRAG, { dx: 0, dy: 20 });
    await expect(graph).toMatchSnapshot(__filename, 'hideEdge-in');
    graph.emit(NodeEvent.DRAG_END);

    graph.setBehaviors([{ type: 'drag-element', hideEdge: 'out' }]);
    graph.emit(NodeEvent.DRAG_START, { target: { id: 'node-3' }, targetType: 'node' });
    graph.emit(NodeEvent.DRAG, { dx: 0, dy: 20 });
    await expect(graph).toMatchSnapshot(__filename, 'hideEdge-out');
    graph.emit(NodeEvent.DRAG_END);
  });

  it('drag node shadow', async () => {
    graph.setBehaviors([{ type: 'drag-element', shadow: true, shadowStroke: 'red', shadowStrokeOpacity: 1 }]);
    graph.emit(NodeEvent.DRAG_START, { target: { id: 'node-4' }, targetType: 'node' });
    graph.emit(NodeEvent.DRAG, { dx: 20, dy: 20 });
    await expect(graph).toMatchSnapshot(__filename, 'shadow');
    graph.emit(NodeEvent.DRAG_END);
    await expect(graph).toMatchSnapshot(__filename, 'shadow-after-drag');
  });

  it('drag combo', async () => {
    graph.setBehaviors(['drag-element']);
    graph.emit(ComboEvent.DRAG_START, { target: { id: 'combo-1' }, targetType: 'combo' });
    graph.emit(ComboEvent.DRAG, { dx: 20, dy: 20 });
    graph.emit(ComboEvent.DRAG_END);
    await expect(graph).toMatchSnapshot(__filename, 'drag-combo');
  });

  it('drag combo shadow', async () => {
    graph.setBehaviors([{ type: 'drag-element', shadow: true, shadowStroke: 'red', shadowStrokeOpacity: 1 }]);
    graph.emit(ComboEvent.DRAG_START, { target: { id: 'combo-1' }, targetType: 'combo' });
    graph.emit(ComboEvent.DRAG, { dx: 20, dy: 20 });
    await expect(graph).toMatchSnapshot(__filename, 'drag-combo-shadow');
    graph.emit(ComboEvent.DRAG_END);
    await expect(graph).toMatchSnapshot(__filename, 'drag-combo-shadow-after-drag');
  });
});
