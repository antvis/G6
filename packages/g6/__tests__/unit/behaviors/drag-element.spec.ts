import { behaviorDragNode } from '@/__tests__/demos';
import type { Graph } from '@/src';
import { CommonEvent } from '@/src';
import { createDemoGraph } from '@@/utils';

describe('behavior drag element', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(behaviorDragNode, { animation: false });
  });

  afterAll(() => {
    graph.destroy();
  });

  it('default status', async () => {
    await expect(graph).toMatchSnapshot(__filename);

    graph.emit(`node:${CommonEvent.DRAG_START}`, { target: { id: 'node-4' }, targetType: 'node' });
    graph.emit(`node:${CommonEvent.DRAG}`, { dx: 20, dy: 20 });
    graph.emit(`node:${CommonEvent.DRAG_END}`);

    await expect(graph).toMatchSnapshot(__filename, 'after-drag');
  });

  it('hide edges', async () => {
    graph.setBehaviors([{ type: 'drag-element', hideEdge: 'both' }]);
    graph.emit(`node:${CommonEvent.DRAG_START}`, { target: { id: 'node-4' }, targetType: 'node' });
    graph.emit(`node:${CommonEvent.DRAG}`, { dx: 20, dy: 20 });
    await expect(graph).toMatchSnapshot(__filename, 'hideEdge-both');
    graph.emit(`node:${CommonEvent.DRAG_END}`);

    graph.setBehaviors([{ type: 'drag-element', hideEdge: 'in' }]);
    graph.emit(`node:${CommonEvent.DRAG_START}`, { target: { id: 'node-3' }, targetType: 'node' });
    graph.emit(`node:${CommonEvent.DRAG}`, { dx: 0, dy: 20 });
    await expect(graph).toMatchSnapshot(__filename, 'hideEdge-in');
    graph.emit(`node:${CommonEvent.DRAG_END}`);

    graph.setBehaviors([{ type: 'drag-element', hideEdge: 'out' }]);
    graph.emit(`node:${CommonEvent.DRAG_START}`, { target: { id: 'node-3' }, targetType: 'node' });
    graph.emit(`node:${CommonEvent.DRAG}`, { dx: 0, dy: 20 });
    await expect(graph).toMatchSnapshot(__filename, 'hideEdge-out');
    graph.emit(`node:${CommonEvent.DRAG_END}`);
  });

  it('drag node shadow', async () => {
    graph.setBehaviors([{ type: 'drag-element', shadow: true, shadowStroke: 'red', shadowStrokeOpacity: 1 }]);
    graph.emit(`node:${CommonEvent.DRAG_START}`, { target: { id: 'node-4' }, targetType: 'node' });
    graph.emit(`node:${CommonEvent.DRAG}`, { dx: 20, dy: 20 });
    await expect(graph).toMatchSnapshot(__filename, 'shadow');
    graph.emit(`node:${CommonEvent.DRAG_END}`);
    await expect(graph).toMatchSnapshot(__filename, 'shadow-after-drag');
  });

  it('drag combo', async () => {
    graph.setBehaviors(['drag-element']);
    graph.emit(`combo:${CommonEvent.DRAG_START}`, { target: { id: 'combo-1' }, targetType: 'combo' });
    graph.emit(`combo:${CommonEvent.DRAG}`, { dx: 20, dy: 20 });
    graph.emit(`combo:${CommonEvent.DRAG_END}`);
    await expect(graph).toMatchSnapshot(__filename, 'drag-combo');
  });

  it('drag combo shadow', async () => {
    graph.setBehaviors([{ type: 'drag-element', shadow: true, shadowStroke: 'red', shadowStrokeOpacity: 1 }]);
    graph.emit(`combo:${CommonEvent.DRAG_START}`, { target: { id: 'combo-1' }, targetType: 'combo' });
    graph.emit(`combo:${CommonEvent.DRAG}`, { dx: 20, dy: 20 });
    await expect(graph).toMatchSnapshot(__filename, 'drag-combo-shadow');
    graph.emit(`combo:${CommonEvent.DRAG_END}`);
    await expect(graph).toMatchSnapshot(__filename, 'drag-combo-shadow-after-drag');
  });
});
