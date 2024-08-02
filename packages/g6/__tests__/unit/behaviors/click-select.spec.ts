import type { Graph } from '@/src';
import { CanvasEvent, CommonEvent, EdgeEvent, NodeEvent } from '@/src';
import { behaviorClickSelect } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('behavior click-select element', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(behaviorClickSelect, { animation: false });
  });

  afterAll(() => {
    graph.destroy();
  });

  it('default status', async () => {
    await expect(graph).toMatchSnapshot(__filename);

    graph.emit(NodeEvent.CLICK, { target: { id: '0' }, targetType: 'node' });
    await expect(graph).toMatchSnapshot(__filename, 'after-select');

    graph.emit(NodeEvent.CLICK, { target: { id: '0' }, targetType: 'node' });
    await expect(graph).toMatchSnapshot(__filename, 'after-deselect');
  });

  it('state and unselectedState', async () => {
    graph.setBehaviors([{ type: 'click-select', state: 'active', unselectedState: 'inactive' }]);

    graph.emit(NodeEvent.CLICK, { target: { id: '0' }, targetType: 'node' });
    await expect(graph).toMatchSnapshot(__filename, 'custom-state');
    graph.emit(NodeEvent.CLICK, { target: { id: '0' }, targetType: 'node' });
  });

  it('state and neighborState', async () => {
    graph.setBehaviors([
      {
        type: 'click-select',
        state: 'selected',
        neighborState: 'active',
        unselectedState: 'inactive',
        degree: 1,
      },
    ]);

    graph.emit(NodeEvent.CLICK, { target: { id: '0' }, targetType: 'node' });
    await expect(graph).toMatchSnapshot(__filename, 'custom-neighborState');
    graph.emit(NodeEvent.CLICK, { target: { id: '0' }, targetType: 'node' });
  });

  it('1 degree', async () => {
    graph.setBehaviors([
      {
        type: 'click-select',
        degree: 1,
        state: 'selected',
        neighborState: 'selected',
        unselectedState: undefined,
      },
    ]);

    graph.emit(NodeEvent.CLICK, { target: { id: '0' }, targetType: 'node' });
    await expect(graph).toMatchSnapshot(__filename, 'node-1-degree');
    graph.emit(CanvasEvent.CLICK, { target: {}, targetType: 'canvas' });

    graph.emit(EdgeEvent.CLICK, { target: { id: '0-1' }, targetType: 'edge' });
    await expect(graph).toMatchSnapshot(__filename, 'edge-1-degree');
    graph.emit(CanvasEvent.CLICK, { target: {}, targetType: 'canvas' });
  });

  it('multiple', async () => {
    graph.setBehaviors([{ type: 'click-select', multiple: true, degree: 0 }]);

    graph.emit(CommonEvent.KEY_DOWN, { key: 'shift' });
    graph.emit(NodeEvent.CLICK, { target: { id: '0' }, targetType: 'node' });
    graph.emit(NodeEvent.CLICK, { target: { id: '1' }, targetType: 'node' });
    graph.emit(CommonEvent.KEY_UP, { key: 'shift' });

    await expect(graph).toMatchSnapshot(__filename, 'multiple-shift');

    graph.setBehaviors([{ type: 'click-select', multiple: true, trigger: ['meta'] }]);

    graph.emit(CommonEvent.KEY_DOWN, { key: 'meta' });
    graph.emit(NodeEvent.CLICK, { target: { id: '0' }, targetType: 'node' });
    graph.emit(NodeEvent.CLICK, { target: { id: '1' }, targetType: 'node' });
    graph.emit(CommonEvent.KEY_UP, { key: 'meta' });

    await expect(graph).toMatchSnapshot(__filename, 'multiple-meta');
  });
});
