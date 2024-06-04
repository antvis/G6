import { behaviorHoverActivate } from '@/__tests__/demos';
import type { Graph } from '@/src';
import { EdgeEvent, NodeEvent } from '@/src';
import { createDemoGraph } from '@@/utils';

describe('behavior hover-activate element', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(behaviorHoverActivate, { animation: false });
  });

  afterAll(() => {
    graph.destroy();
  });

  it('default status', async () => {
    await expect(graph).toMatchSnapshot(__filename);

    graph.emit(NodeEvent.POINTER_OVER, { target: { id: '0' }, targetType: 'node' });

    await expect(graph).toMatchSnapshot(__filename, 'after-hover');

    graph.emit(NodeEvent.POINTER_OUT, { target: { id: '0' }, targetType: 'node' });

    await expect(graph).toMatchSnapshot(__filename, 'after-hover-out');
  });

  it('state and inactiveState', async () => {
    graph.setBehaviors([{ type: 'hover-activate', state: 'active', inactiveState: 'inactive' }]);

    graph.emit(NodeEvent.POINTER_OVER, { target: { id: '0' }, targetType: 'node' });

    await expect(graph).toMatchSnapshot(__filename, 'state');

    graph.emit(NodeEvent.POINTER_OUT, { target: { id: '0' }, targetType: 'node' });
  });

  it('1 degree', async () => {
    graph.setBehaviors([{ type: 'hover-activate', state: 'active', inactiveState: 'inactive', degree: 1 }]);

    graph.emit(NodeEvent.POINTER_OVER, { target: { id: '0' }, targetType: 'node' });

    await expect(graph).toMatchSnapshot(__filename, '1-degree-node');

    graph.emit(NodeEvent.POINTER_OUT, { target: { id: '0' }, targetType: 'node' });

    graph.emit(EdgeEvent.POINTER_OVER, { target: { id: '0-1' }, targetType: 'edge' });

    await expect(graph).toMatchSnapshot(__filename, '1-degree-edge');

    graph.emit(EdgeEvent.POINTER_OUT, { target: { id: '0-1' }, targetType: 'edge' });
  });

  it('2 degree', async () => {
    graph.setBehaviors([{ type: 'hover-activate', state: 'active', inactiveState: 'inactive', degree: 2 }]);

    graph.emit(NodeEvent.POINTER_OVER, { target: { id: '0' }, targetType: 'node' });

    await expect(graph).toMatchSnapshot(__filename, '2-degree-node');

    graph.emit(NodeEvent.POINTER_OUT, { target: { id: '0' }, targetType: 'node' });

    graph.emit(EdgeEvent.POINTER_OVER, { target: { id: '0-1' }, targetType: 'edge' });

    await expect(graph).toMatchSnapshot(__filename, '2-degree-edge');

    graph.emit(EdgeEvent.POINTER_OUT, { target: { id: '0-1' }, targetType: 'edge' });
  });
});
