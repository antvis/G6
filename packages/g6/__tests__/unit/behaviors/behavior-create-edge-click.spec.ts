import type { EdgeData, Graph } from '@/src';
import { CommonEvent } from '@/src';
import { behaviorCreateEdge } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('behavior create edge click', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(behaviorCreateEdge, { animation: false });
  });

  it('click create edge', async () => {
    await expect(graph).toMatchSnapshot(__filename);

    graph.setBehaviors([{ type: 'create-edge', trigger: 'click' }]);
    graph.emit(`node:${CommonEvent.CLICK}`, { target: { id: 'node1' }, targetType: 'node' });
    graph.emit(CommonEvent.POINTER_MOVE, { canvas: { x: 100, y: 100 } });
    await expect(graph).toMatchSnapshot(__filename, 'click-edge1-move');

    graph.emit(`node:${CommonEvent.CLICK}`, { target: { id: 'node2' }, targetType: 'node' });
    await expect(graph).toMatchSnapshot(__filename, 'click-edge1');

    graph.emit(`node:${CommonEvent.CLICK}`, { target: { id: 'node1' }, targetType: 'node' });
    graph.emit(`node:${CommonEvent.CLICK}`, { target: { id: 'node3' }, targetType: 'node' });
    await expect(graph).toMatchSnapshot(__filename, 'click-edge2');

    graph.setBehaviors([{ type: 'create-edge', trigger: 'click', style: { stroke: 'red', lineWidth: 2 } }]);

    graph.emit(`node:${CommonEvent.CLICK}`, { target: { id: 'node2' }, targetType: 'node' });
    graph.emit(`node:${CommonEvent.CLICK}`, { target: { id: 'node3' }, targetType: 'node' });
    await expect(graph).toMatchSnapshot(__filename, 'click-edge3');

    graph.emit(`combo:${CommonEvent.CLICK}`, { target: { id: 'combo1' }, targetType: 'combo' });
    graph.emit(`combo:${CommonEvent.CLICK}`, { target: { id: 'combo2' }, targetType: 'combo' });
    await expect(graph).toMatchSnapshot(__filename, 'click-edge4-combo');

    graph.setBehaviors([
      {
        type: 'create-edge',
        trigger: 'click',
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

    graph.emit(`node:${CommonEvent.CLICK}`, { target: { id: 'node2' }, targetType: 'node' });
    graph.emit(`node:${CommonEvent.CLICK}`, { target: { id: 'node3' }, targetType: 'node' });
    await expect(graph).toMatchSnapshot(__filename, 'click-custom-edge4');
  });

  afterAll(() => {
    graph.destroy();
  });
});
