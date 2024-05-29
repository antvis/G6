import { behaviorCreateEdge } from '@@/demos/g6';
import { createDemoGraph } from '@@/utils';
import type { EdgeData, Graph } from '@antv/g6';
import { CommonEvent } from '@antv/g6';

describe('behavior create edge drag', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(behaviorCreateEdge, { animation: false });
  });

  it('drag create edge', async () => {
    await expect(graph).toMatchSnapshot(__filename);

    graph.emit(`node:${CommonEvent.DRAG_START}`, { target: { id: 'node1' }, targetType: 'node' });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 100, y: 100 } });

    await expect(graph).toMatchSnapshot(__filename, 'drag-edge1-move');

    graph.emit(CommonEvent.POINTER_UP, { target: { id: 'node2' }, targetType: 'node' });
    await expect(graph).toMatchSnapshot(__filename, 'drag-edge1');

    graph.emit(`node:${CommonEvent.DRAG_START}`, { target: { id: 'node1' }, targetType: 'node' });
    graph.emit(CommonEvent.POINTER_UP, { target: { id: 'node3' }, targetType: 'node' });
    await expect(graph).toMatchSnapshot(__filename, 'drag-edge2');

    graph.setBehaviors([{ type: 'create-edge', trigger: 'drag', style: { stroke: 'red', lineWidth: 2 } }]);

    graph.emit(`node:${CommonEvent.DRAG_START}`, { target: { id: 'node2' }, targetType: 'node' });
    graph.emit(CommonEvent.POINTER_UP, { target: { id: 'node3' }, targetType: 'node' });
    await expect(graph).toMatchSnapshot(__filename, 'drag-edge3');

    graph.emit(`combo:${CommonEvent.DRAG_START}`, { target: { id: 'combo1' }, targetType: 'combo' });
    graph.emit(CommonEvent.POINTER_UP, { target: { id: 'combo2' }, targetType: 'combo' });
    await expect(graph).toMatchSnapshot(__filename, 'drag-edge4-combo');

    graph.setBehaviors([
      {
        type: 'create-edge',
        trigger: 'drag',
        style: { stroke: 'red', lineWidth: 2 },
        onCreate: (edge: EdgeData) => {
          const { source, target, ...rest } = edge;
          return {
            target: source,
            source: target,
            ...rest,
          };
        },
      },
    ]);

    graph.emit(`node:${CommonEvent.DRAG_START}`, { target: { id: 'node2' }, targetType: 'node' });
    graph.emit(CommonEvent.POINTER_UP, { target: { id: 'node3' }, targetType: 'node' });
    await expect(graph).toMatchSnapshot(__filename, 'drag-custom-edge4');
  });

  afterAll(() => {
    graph.destroy();
  });
});
